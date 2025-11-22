import * as z from "zod";

export const RegisterSchema = z.object({
  username: z.string().trim().min(3, "username is required"),
  email: z.string().trim().email().min(5, "email is required"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
  profilePic: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().trim().email().min(5, "email is required"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export const CommentSchema = z.object({
  content: z
    .string()
    .min(1, "comment cant be empty")
    .max(300, "Comments must be under 300 characters"),
     image: z.string().optional(),
});

export const PostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "content is required")
    .max(500, "content must be under 500 characters"),
  image: z.string().optional(),
});
