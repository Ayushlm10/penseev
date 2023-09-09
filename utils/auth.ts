import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs";

export async function getDbUserByClerkId() {
  const { userId } = await auth();

  //if for some very weird reason the clerk user does not exist in db but still passes the new-user check
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  });
  return user;
}
