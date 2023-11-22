import { Label } from "@/components/ui/label";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { name } = body;
    if (!name) return new NextResponse("Name is required");

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_POST]", error);
    return new NextResponse("Internal error server", { status: 500 });
  }
}
