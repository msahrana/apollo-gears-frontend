import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get("accessToken")?.value

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/auth/me`, {
    method: "GET",
    headers,
    cache: "no-store",
  })

  const result = await res.json()

  return NextResponse.json(result, {
    status: res.status,
  })
}
