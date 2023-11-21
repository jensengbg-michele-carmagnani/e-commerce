import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { name } = await req.json();
    const { userId } = auth();

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId: userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Internal error server", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!params.storeId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Internal error server", { status: 500 });
  }
}
