import AppSidebar from "@/components/layout/Sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import Header from "@/components/layout/Header";
import AddOfficialModal from "./add-official";
import { Suspense } from "react";
import {
  BHWList,
  LuponList,
  OfficialList,
  SKList,
  TanodList,
} from "@/components/barangay-official/official-list";
import SkeletonTable from "@/components/layout/Skeleton/SkeletonTable";

const BarangayOfficialPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex justify-end">
            <AddOfficialModal />
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <div className="h-102 rounded-xl bg-muted/50 shadow-md py-2">
              <div className="flex flex-col mb-3 px-2 text-center">
                <h1 className="text-lg font-semibold">Barangay Council</h1>
                <p className="flex pl-3 text-xs text-muted-foreground">
                  List of Barangay Council
                </p>
              </div>
              <div className="px-5">
                <div className="rounded-sm shadow-sm overflow-hidden border border-border">
                  <Suspense fallback={<SkeletonTable columns={2} rows={7} />}>
                    <OfficialList />
                  </Suspense>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-muted/50 shadow-md py-2">
              <div className="flex flex-col mb-3 px-2 text-center">
                <h1 className="text-lg font-semibold">Sangguniang Kabataan</h1>
                <p className="flex pl-3 text-xs text-muted-foreground">
                  List of SK officials
                </p>
              </div>
              <div className="px-5">
                <div className="rounded-sm shadow-sm overflow-hidden border border-border">
                  <Suspense fallback={<SkeletonTable columns={2} rows={7} />}>
                    <SKList />
                  </Suspense>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-muted/50 shadow-md py-2">
              {" "}
              <div className="flex flex-col mb-3 px-2 text-center">
                <h1 className="text-lg font-semibold">
                  Barangay Health Worker
                </h1>
                <p className="flex pl-3 text-xs text-muted-foreground">
                  List of BHW
                </p>
              </div>
              <div className="px-5">
                <div className="rounded-sm shadow-sm overflow-hidden border border-border">
                  <Suspense fallback={<SkeletonTable columns={2} rows={7} />}>
                    <BHWList />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <div className="h-[33.3rem] rounded-xl bg-muted/50 shadow-md py-2">
              <div className="flex flex-col mb-3 px-2 text-center">
                <h1 className="text-lg font-semibold">Barangay Tanod</h1>
                <p className="flex pl-3 text-xs text-muted-foreground">
                  List of Barangay Tanod
                </p>
              </div>
              <div className="px-5">
                <div className="rounded-sm shadow-sm overflow-hidden border border-border">
                  <Suspense fallback={<SkeletonTable columns={2} rows={10} />}>
                    <TanodList />
                  </Suspense>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-muted/50 shadow-md py-2">
              <div className="flex flex-col mb-3 px-2 text-center">
                <h1 className="text-lg font-semibold">Barangay Lupon</h1>
                <p className="flex pl-3 text-xs text-muted-foreground">
                  List of the Lupon Tagapamayapa
                </p>
              </div>
              <div className="px-5">
                <div className="rounded-sm shadow-sm overflow-hidden border border-border">
                  <Suspense fallback={<SkeletonTable columns={2} rows={10} />}>
                    <LuponList />
                  </Suspense>
                </div>
              </div>
            </div>
            <div className="hidden xl:block rounded-xl bg-muted/50 shadow-md"></div>
          </div>
          {/* <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min"></div> */}
        </main>
      </SidebarInset>
    </div>
  );
};

export default BarangayOfficialPage;
