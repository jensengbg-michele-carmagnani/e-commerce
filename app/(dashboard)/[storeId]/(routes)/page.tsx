import prismadb from "@/lib/prismadb";
import React from "react";
interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
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

export default DashboardPage;
