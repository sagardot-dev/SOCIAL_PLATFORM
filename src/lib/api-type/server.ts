import { ApiResponse } from "./types";

export function createResponse<T>(
  success: boolean,
  title: string,
  code: string,
  data?: T
): ApiResponse<T> {
  return {
    success,
    title,
    code,
    type: success ? "success" : "error",
    data,
  };
}
