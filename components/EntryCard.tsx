function EntryCard({ entry }) {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <div className="bg-teal-600 shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-gray-200">
        <p className="text-gray-600 text-sm font-medium">{date}</p>
      </div>

      <div className="px-6 py-4">
        <p className="text-base"></p>
        Summary
      </div>

      <div className="px-6 py-2">Mood</div>
    </div>
  );
}

export default EntryCard;
