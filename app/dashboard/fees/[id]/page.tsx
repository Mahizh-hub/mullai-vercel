import FeeDetails from "@/components/dashboard/fees/FeeDetails";
import DynamicBreadcrumb from "@/components/layout/DynamicBreadcrumb";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FeeDetailsPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="space-y-4 p-4">
      {/* Header + Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-semibold">Fees</h3>
        <DynamicBreadcrumb />
      </div>

      <FeeDetails feeId={Number(id)} />
    </div>
  );
}
