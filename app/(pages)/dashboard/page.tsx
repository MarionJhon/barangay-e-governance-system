import AppSidebar from "@/components/Sidebar";

const DashboardPage = () => {
  return (
    <div className="min-h-screen">
      <AppSidebar currentPath="/dashboard"/>
      <main className="ml-80 p-5">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1>Manage Resident</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
