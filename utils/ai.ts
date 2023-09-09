import { OpenAI } from "langchain/llms/openai";
import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { Document } from "langchain/document";
import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    sentimentScore: z
      .number()
      .describe(
        "sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."
      ),

    subject: z
      .string()
      .describe("What is a possible subject for this journal entry?"),

    summary: z
      .string()
      .describe(
        "Summarize the journal entry written by the user in under 5 to 6 words"
      ),

    mood: z
      .string()
      .describe(
        "What is the mood of the user based on the journal that they have written?"
      ),

    color: z
      .string()
      .describe(
        "Color that reprsents the mood of the entry. Example: #0101fe for blue representing happiness."
      ),

    negative: z
      .boolean()
      .describe(
        "Based on the entry , is the user feeling negative? (Are they feeling any negative emotions?"
      ),
  })
);

const format_instructions = parser.getFormatInstructions();

const getPrompt = async (entry: string) => {
  const promptTemplate = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n Here is the journal entry: {entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const promptInput = await promptTemplate.format({
    entry: entry,
  });
  return promptInput;
};

export const analyze = async (entry: string) => {
  //form the prompt
  const formattedPromptInput = await getPrompt(entry);

  const llm = new OpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
  });

  const result = await llm.call(formattedPromptInput);
  try {
    return parser.parse(result);
  } catch (e) {
    console.log(e);
  }
};

export const qa = async (question: string, entries) => {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: { source: entry.id, date: entry.createdAt },
      })
  );
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const chain = loadQARefineChain(model);
  const embeddings = new OpenAIEmbeddings();
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const relevantDocs = await store.similaritySearch(question);
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  });

  return res.output_text;
};
