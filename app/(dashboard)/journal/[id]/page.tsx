import Editor from "@/components/Editor";
import { getDbUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id) => {
  const user = await getDbUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      Analysis: true,
    },
  });
  return entry;
};

async function EntryPage({ params }) {
  const entry = await getEntry(params.id);
  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  );
}

export default EntryPage;
