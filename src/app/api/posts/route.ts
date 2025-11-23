import { createResponse } from "@/lib/api-type/server";
import { HttpStatus, ResponseTitle } from "@/lib/api-type/types";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db/prisma";
import { PostSchema } from "@/lib/schema";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const result = PostSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.INVALID_INPUT,
        "Please enter valid input"
      ),
      {
        status: HttpStatus.NOT_IMPLEMENTED,
      }
    );
  }
  //safe data
  const data = result.data;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.UNAUTHORIZED,
        "Your are not authozrized to access this data"
      ),
      {
        status: HttpStatus.UNAUTHORIZED,
      }
    );
  }
  try {
    const post = await prisma.post.create({
      data: {
        content: data.content,
        image: data.image,
        userId: session.user.id,
      },
    });
    if (!post) {
      return Response.json(
        createResponse(
          false,
          ResponseTitle.UNKNOWN_ERROR,
          "cant create post db error"
        ),
        {
          status: HttpStatus.BAD_REQUEST,
        }
      );
    }

    return Response.json(
      createResponse(
        true,
        ResponseTitle.CREATED,
        "Post created successfully",
        post
      ),
      {
        status: HttpStatus.CREATED,
      }
    );
  } catch (error) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.INTERNAL_SERVER_ERROR,
        "Something went wrong when creating post",
        { message: error instanceof Error ? error.message : "Unknown error" }
      ),
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    );
  }
}

export async function GET(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.UNAUTHORIZED,
        "Your are not authozrized to access this data"
      ),
      {
        status: HttpStatus.UNAUTHORIZED,
      }
    );
  }
  try {
    const userSelect = {
      id: true,
      name: true,
      image: true,
    };
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: userSelect,
        },
        comments: {
          include: {
            user: {
              select: userSelect,
            },
            reactions: {
              include: {
                user: {
                  select: userSelect,
                },
              },
            },
          },
        },
        reactions: {
          include: {
            user: {
              select: userSelect,
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    if (!posts) {
      return Response.json(
        createResponse(
          false,
          ResponseTitle.UNKNOWN_ERROR,
          "cant create post db error"
        ),
        {
          status: HttpStatus.BAD_REQUEST,
        }
      );
    }

    return Response.json(
      createResponse(
        true,
        ResponseTitle.CREATED,
        "Post created successfully",
        posts
      ),
      {
        status: HttpStatus.CREATED,
      }
    );
  } catch (error) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.INTERNAL_SERVER_ERROR,
        "Something went wrong when creating post",
        { message: error instanceof Error ? error.message : "Unknown error" }
      ),
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
