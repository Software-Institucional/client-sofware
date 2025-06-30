import { TabsSkeleton } from "@/components/skeletons/institutions/tabs-skeleton";
import { PageHeaderSkeleton } from "@/components/skeletons/common/page-header-skeleton";

export default function InstitutionDetailsSkeleton() {
  return (
    <div className="hidden lg:block flex-1 h-full space-y-6 overflow-y-auto p-5">
      <PageHeaderSkeleton />
      <TabsSkeleton />
    </div>
  );
}
