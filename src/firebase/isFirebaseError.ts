import { has } from "lodash";

export const isFirebaseError = (
  error: unknown
): error is { code: string; message: string } => {
  // @ts-ignore
  return error.code && has(error, "message");
};
