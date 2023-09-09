"use client";

import Spinner from "@/components/Spinner";
import { askQuestion } from "@/utils/api";
import { useState } from "react";

function Question() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState();
  const [loading, setLoading] = useState(false);
  function onChange(e) {
    setQuestion(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    //do the similarity search for this question
    const aiAnswer = await askQuestion(question);
    setAnswer(aiAnswer);
    setQuestion("");
    setLoading(false);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-8">
          <input
            value={question}
            disabled={loading}
            placeholder="Search entries..."
            onChange={onChange}
            type="text"
            className="bg-black flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className=" inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-teal-500 text-primary-foreground hover:bg-teal-500/90 h-10 px-4 py-2"
          >
            Ask
          </button>
        </div>
      </form>

      {loading && <Spinner />}
      {answer && <div className="text-gray-200">{answer}</div>}
    </div>
  );
}

export default Question;
