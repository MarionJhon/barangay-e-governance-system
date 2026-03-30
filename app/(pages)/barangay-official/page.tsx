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
          <div className="flex-1 rounded-xl md:min-h-min">
            <div className="flex justify-end">
              <AddOfficialModal />
            </div>
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50 shadow-md py-2">
              <div className="flex flex-col items-center justify-center mb-3">
                <h1 className="text-lg font-semibold">Barangay Council</h1>
                <p className="text-sm text-muted-foreground">
                  List of{" "}
                  <span className="font-semibold">Barangay Council</span>{" "}
                  members and their respective positions.
                </p>
              </div>
              <div className="px-5 bg-muted/50 rounded-xl">
                <div className="rounded-sm shadow-sm overflow-hidden border border-border">
                  <Suspense fallback={<SkeletonTable columns={2} rows={7} />}>
                    <OfficialList />
                  </Suspense>
                </div>
              </div>
            </div>
            <div className="aspect-video rounded-xl bg-muted/50 shadow-md py-2">
              <div className="flex flex-col items-center justify-center mb-3">
                <h1 className="text-lg font-semibold">Sangguniang Kabataan</h1>
                <p className="text-sm text-muted-foreground">
                  List of <span className="font-semibold">SK</span> officials
                  and their positions.
                </p>
              </div>
              <div className="px-5 bg-muted/50 rounded-xl">
                <div className="rounded-sm shadow-sm overflow-hidden border border-border">
                  <Suspense fallback={<SkeletonTable columns={2} rows={7} />}>
                    <SKList />
                  </Suspense>
                </div>
              </div>
            </div>
            <div className="aspect-video rounded-xl bg-muted/50 shadow-md py-2">
              {" "}
              <div className="flex flex-col items-center justify-center mb-3">
                <h1 className="text-lg font-semibold">
                  Barangay Health Worker
                </h1>
                <p className="text-sm text-muted-foreground">
                  List of <span className="font-semibold">BHW</span> and their
                  assigned roles.
                </p>
              </div>
              <div className="px-5 bg-muted/50 rounded-xl">
                <div className="rounded-sm shadow-sm overflow-hidden border border-border">
                  <Suspense fallback={<SkeletonTable columns={2} rows={7} />}>
                    <BHWList />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
              <div className="h-[38.3rem] w-[33.7rem] aspect-video rounded-xl bg-muted/50 shadow-md py-2">
                <div className="flex flex-col items-center justify-center mb-3">
                  <h1 className="text-lg font-semibold">Barangay Tanod</h1>
                  <p className="text-sm text-muted-foreground">List of Barangay Tanod maintaining peace and security.</p>
                </div>
                <div className="px-5 bg-muted/50 rounded-xl">
                <div className="rounded-sm shadow-sm overflow-hidden border border-border">
                  <Suspense fallback={<SkeletonTable columns={2} rows={10} />}>
                    <TanodList />
                  </Suspense>
                </div>
              </div>
              </div>
              <div className="h-[38.3rem] w-[33.7rem] aspect-video rounded-xl bg-muted/50 shadow-md py-2">
                <div className="flex flex-col items-center justify-center mb-3">
                  <h1 className="text-lg font-semibold">Barangay Lupon</h1>
                  <p className="text-sm text-muted-foreground">List of the Lupon Tagapamayapa responsible for community dispute mediation.</p>
                </div>
                <div className="px-5 bg-muted/50 rounded-xl">
                <div className="rounded-sm shadow-sm overflow-hidden border border-border">
                  <Suspense fallback={<SkeletonTable columns={2} rows={10} />}>
                    <LuponList />
                  </Suspense>
                </div>
              </div>
              </div>
            </div>
            <div className=" aspect-video rounded-xl bg-muted/50 shadow-md"></div>
          </div>
          <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
        </main>
      </SidebarInset>
    </div>
  );
};

export default BarangayOfficialPage;
