import { getDbUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

async function getData() {
  const user = await getDbUserByClerkId();
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    select: {
      sentimentScore: true,
    },
  });
  const sum = analyses.reduce(
    (all, current) => all + current.sentimentScore,
    0
  );
  const avg = Math.round(sum / analyses.length);
  return { analyses, avg };
}

async function History() {
  const { analyses, avg } = await getData();
  return <div>History : {avg}</div>;
}

export default History;
