import AppSidebar from "@/components/Sidebar";
import React from "react";

const ResidentPage = () => {
  return (
    <div className="min-h-screen bg-primary">
      <AppSidebar currentPath="/custodian-of-record"/>
      <main></main>
    </div>
  );
};

export default ResidentPage;
