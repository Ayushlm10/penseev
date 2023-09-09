"use client";

import Spinner from "@/components/Spinner";
import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

function Editor({ entry }) {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.Analysis);
  const { mood, summary, color, subject, negative } = analysis;
  //generate an object with 4 key value pairs
  const analysisData = [
    { name: "Mood", value: mood },
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Negative", value: negative ? "true" : "false" },
  ];
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const analysisData = await updateEntry(entry.id, _value);
      setAnalysis(analysisData.analysis);
      setIsLoading(false);
    },
  });
  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        )}
        <textarea
          className="h-full w-full p-8 outline-none bg-slate-700/30"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="border-l border-gray-500">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex items-center px-2 py-4 border-t border-gray-500 justify-between"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Editor;
