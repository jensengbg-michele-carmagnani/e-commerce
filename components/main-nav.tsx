"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}`,
      lable: "Home",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      lable: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      lable: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      lable: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      lable: "Colors",
      active: pathname === `/${params.storeId}/corors`,
    },
    {
      href: `/${params.storeId}/settings`,
      lable: "Setting",
      active: pathname === `/${params.storeId}/setting`,
    },
  ];

  return (
    <div
      className={cn(
        "w-full flex items-center space-x-4 lg:space-x-6",
        className
      )}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm transition-colors hover:text-primary text-muted-foreground",
            {
              "text-black dark:text-white": route.active,
            }
          )}
        >
          {route.lable}
        </Link>
      ))}
    </div>
  );
}
