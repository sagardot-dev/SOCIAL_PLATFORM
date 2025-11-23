import { createResponse } from "@/lib/api-type/server";
import { HttpStatus, ResponseTitle } from "@/lib/api-type/types";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db/prisma";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();

    if (!postId) {
      return Response.json(
        createResponse(
          false,
          ResponseTitle.INVALID_INPUT,
          "postId is required"
        ),
        {
          status: HttpStatus.BAD_REQUEST,
        }
      );
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return Response.json(
        createResponse(
          false,
          ResponseTitle.UNAUTHORIZED,
          "You are not authorized"
        ),
        {
          status: HttpStatus.UNAUTHORIZED,
        }
      );
    }

    const userId = session.user.id;

    const existing = await prisma.reaction.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existing) {
      await prisma.reaction.delete({
        where: { userId_postId: { userId, postId } },
      });

      return Response.json(
        createResponse(
          true,
          ResponseTitle.SUCCESS,
          "Post unliked successfully",
          { status: "unliked" }
        ),
        { status: HttpStatus.OK }
      );
    }

    await prisma.reaction.create({
      data: { postId, userId },
    });

    return Response.json(
      createResponse(true, ResponseTitle.SUCCESS, "Post liked successfully", {
        status: "liked",
      }),
      { status: HttpStatus.OK }
    );
  } catch (error) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.INTERNAL_SERVER_ERROR,
        "Error toggling like",
        { message: error instanceof Error ? error.message : "Unknown error" }
      ),
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
