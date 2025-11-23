import { createResponse } from "@/lib/api-type/server";
import { HttpStatus, ResponseTitle } from "@/lib/api-type/types";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db/prisma";
import { headers } from "next/headers";

export async function GET(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return Response.json(
      createResponse(false, ResponseTitle.UNAUTHORIZED, "Not authorized"),
      { status: HttpStatus.UNAUTHORIZED }
    );
  }

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? "1");
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        post: {
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
          select: {
            id: true,
            content: true,
            image: true,
            createdAt: true,
            _count: {
              select: {
                comments: true,
                reactions: true,
              },
            },
          },
        },
        _count: {
          select: {
            post: true,
            comments: true,
            reactions: true,
          },
        },
      },
    });

    if (!user) {
      return Response.json(
        createResponse(false, ResponseTitle.NOT_FOUND, "User not found"),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    return Response.json(
      createResponse(
        true,
        ResponseTitle.SUCCESS,
        "User data fetched successfully",
        user
      ),
      { status: HttpStatus.OK }
    );
  } catch (error) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.INTERNAL_SERVER_ERROR,
        "Something went wrong",
        { message: error instanceof Error ? error.message : "Unknown error" }
      ),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
