import { PATH } from "@hocs/withGetServerSideProps";
import { NextRequest, NextResponse } from "next/server";

export default function commonMiddleware(req: NextRequest) {
  const token = req.cookies.get("userToken");

  if (!token) {
    return NextResponse.redirect(new URL(PATH.LOGIN, req.nextUrl));
  }
}

export const config = {
  matcher: ["/diary/:path*", "/stamp/:path*", "/planner/:path*", "/mypage/:path*"],
};
