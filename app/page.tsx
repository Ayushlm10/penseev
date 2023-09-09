import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  console.log(userId);
  let href = userId ? "/journal" : "/new-user";

  return (
    <div className="bg-black text-gray-200 w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-[500px] mx-auto">
        <h1 className="text-6xl mb-4">
          <span className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600">
            Penseev.
          </span>
          The best Journal app.
        </h1>
        <p className="text-2xl text-gray-200/60 mb-8">
          Track your mood. <br />
          Marauders map for your thoughts.
        </p>
        <div>
          <Link href={href}>
            <button className="px-4 py-1 rounded bg-teal-600 text-white cursor-pointer hover:bg-teal-800">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
