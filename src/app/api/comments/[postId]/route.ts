import { createResponse } from "@/lib/api-type/server";
import { HttpStatus, ResponseTitle } from "@/lib/api-type/types";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db/prisma";
import { CommentSchema } from "@/lib/schema";
import { headers } from "next/headers";

export async function Post(
  req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const body = await req.json();
  const result = CommentSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.INVALID_INPUT,
        "Please enter valid input"
      ),
      {
        status: HttpStatus.BAD_REQUEST,
      }
    );
  }

  const data = result.data;
  const { postId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.UNAUTHORIZED,
        "You are not authorized to create a comment"
      ),
      { status: HttpStatus.UNAUTHORIZED }
    );
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        image: data.image,
        postId: postId,
        userId: session.user.id,
      },
    });

    return Response.json(
      createResponse(
        true,
        ResponseTitle.CREATED,
        "Comment created successfully",
        comment
      ),
      { status: HttpStatus.CREATED }
    );
  } catch (error) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.INTERNAL_SERVER_ERROR,
        "Something went wrong when creating comment",
        { message: error instanceof Error ? error.message : "Unknown error" }
      ),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function Get(
  req: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.UNAUTHORIZED,
        "You are not authorized to access comments"
      ),
      { status: HttpStatus.UNAUTHORIZED }
    );
  }

  const { postId } = await params;

  try {
    const userSelect = {
      id: true,
      name: true,
      image: true,
    };

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: { select: userSelect },
        reactions: {
          include: { user: { select: userSelect } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(
      createResponse(
        true,
        ResponseTitle.CREATED,
        "Comments fetched successfully",
        comments
      ),
      { status: HttpStatus.CREATED }
    );
  } catch (error) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.INTERNAL_SERVER_ERROR,
        "Something went wrong while fetching comments",
        { message: error instanceof Error ? error.message : "Unknown error" }
      ),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
