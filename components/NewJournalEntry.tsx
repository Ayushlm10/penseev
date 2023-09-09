"use client";

import { newEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

function NewJournalEntry() {
  const router = useRouter();
  async function handleOnClick() {
    const entry = await newEntry();
    router.push(`/journal/${entry.id}`);
  }
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-slate-700 shadow">
      <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
        <span className="text-2xl">New Entry</span>
      </div>
    </div>
  );
}

export default NewJournalEntry;
