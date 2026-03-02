import AppSidebar from "@/components/Sidebar";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-primary">
      <AppSidebar currentPath="/dashboard"/>
      <main></main>
    </div>
  );
};

export default DashboardPage;
