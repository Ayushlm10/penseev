import EntryCard from "@/components/EntryCard";
import NewJournalEntry from "@/components/NewJournalEntry";
import Question from "@/components/Question";
import { getDbUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import Link from "next/link";

async function getJournalEntries() {
  const user = await getDbUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return entries;
}

async function JournalPage() {
  const entries = await getJournalEntries();
  return (
    <div className="p-10 bg-slate-700/30 h-full">
      <h1 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600 mb-8">
        Journal page
      </h1>
      <div className="my-10">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <NewJournalEntry />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard key={entry.id} entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default JournalPage;
