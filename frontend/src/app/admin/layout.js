import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="md:ml-64">
        <AdminHeader />

        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}