import { UserCircle } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="font-semibold text-gray-800">
        Administration
      </h2>

      <div className="flex items-center gap-2">
        <UserCircle size={28} className="text-gray-600" />

        <span className="text-sm font-medium text-gray-700">
          Admin
        </span>
      </div>
    </header>
  );
}