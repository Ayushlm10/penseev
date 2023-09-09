import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/history", label: "History" },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen relative bg-black text-white">
      <aside className="absolute w-[200px] top-0 left-0 h-screen border-r border-gray/60">
        <div className="text-xl px-3 py-4 space-y-16">
          <Link
            href="/"
            className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600 mb-8"
          >
            Penseev
          </Link>
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-gray/10">
          <div className="h-full w-full px-6 flex justify-end items-center">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
