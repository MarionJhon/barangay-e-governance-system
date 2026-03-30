import DataTable from "@/components/DataTable";
import Header from "@/components/layout/Header";
import AppSidebar from "@/components/layout/Sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { columns } from "@/components/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { fetchResident } from "@/lib/action/resident";
import { Suspense } from "react";
import SkeletonTable from "@/components/layout/Skeleton/SkeletonTable";

async function ResidentTable() {
  const resident = await fetchResident();
  return <DataTable columns={columns} data={resident} />;
}

const ResidentPage = async () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-400">
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50"></div>
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="flex justify-end">
            <Button className="text-gray-700 bg-primary">
              <Link
                href="resident/add-resident"
                className="flex items-center justify-center"
              >
                <Plus />
                <span>Add Resident</span>
              </Link>
            </Button>
          </div>
          <div className="flex-1 rounded-xl md:min-h-min">
            <Suspense fallback={<SkeletonTable rows={5} columns={5} />}>
              <ResidentTable />
            </Suspense>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
};

export default ResidentPage;
