import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import React from "react";
import SettingForm from "./SettingForm";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}
const SettingsPage: React.FC<SettingsPageProps> = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const { userId } = auth();

  if (!userId) redirect("/sing-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-1 p-8 pt-7">
        <SettingForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
