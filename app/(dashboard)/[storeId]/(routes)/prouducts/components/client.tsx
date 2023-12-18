"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { Separator } from "@/components/ui/separator";

interface ProductClientProps {
  data: ProductColumn[];
}
const BillboardClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title={`Products ${data.length}`}
          description="manage products for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} filterKey="label" />
      <Heading title="API" description="API call product" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default BillboardClient;
