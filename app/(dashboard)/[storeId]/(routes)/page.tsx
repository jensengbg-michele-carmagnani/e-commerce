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
  return <div>DashboardPage {store?.name}</div>;
};

export default DashboardPage;
