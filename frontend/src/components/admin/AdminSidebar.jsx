"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Globe,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin/blogs",
    icon: LayoutDashboard,
  },
  {
    name: "Create Blog",
    href: "/admin/blogs/create",
    icon: PlusCircle,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 bg-gray-950 p-5 text-white md:block">
      <h2 className="mb-10 text-2xl font-bold">
        Blog CMS
      </h2>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            item.name === "Dashboard"
              ? pathname === "/admin/blogs"
              : pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={19} />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-5">
        <Link
          href="/blog"
          target="_blank"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
        >
          <Globe size={18} />
          View Website
        </Link>
      </div>
    </aside>
  );
}