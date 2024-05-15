import { NextRequest } from "next/server";
import { updateSession } from "./app/lib/actions";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
