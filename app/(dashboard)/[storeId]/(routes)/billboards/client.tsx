"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";

const Client = () => {
  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title="Billboard 0 "
          description="manage billboard for your store"
        />
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default Client;
