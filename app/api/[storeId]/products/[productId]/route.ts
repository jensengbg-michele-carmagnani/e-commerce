import { Billboard } from "@prisma/client";
import { Image } from "next/image";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,

  { params }: { params: { storeId: string; billboardtId: string } }
) {
  const body = await req.json();
  const {
    name,
    price,
    categoryId,
    sizeId,
    colorId,
    images,
    isFeatured,
    isArchived,
  } = body;

  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 400 });
    }
    if (!userId) return new NextResponse("Unauthenticated", { status: 403 });

    if (!price) return new NextResponse("Price is required", { status: 400 });

    if (!categoryId)
      return new NextResponse("Category is required", { status: 400 });

    if (!colorId) return new NextResponse("Color is required", { status: 400 });

    if (!sizeId) return new NextResponse("Size is required", { status: 400 });

    if (!images || !images.length)
      return new NextResponse("Images  are required", { status: 400 });

    if (!name) return new NextResponse("Name is required", { status: 400 });

    if (!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 401 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.productId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILBOARD_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
