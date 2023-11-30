import prismadb from "@/lib/prismadb";
import React from "react";
interface SizesPageProps {
  params: {
    storeId: string;
  };
}

const SizesPage: React.FC<SizesPageProps> = async ({
  params: { storeId },
}) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
    },
  });
  return (
    <div className="h-full flex items-center justify-center text-5xl">
      {store?.name}
    </div>
  );
};

export default SizesPage;
