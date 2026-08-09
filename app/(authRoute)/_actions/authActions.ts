"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import jwt, { JwtPayload } from "jsonwebtoken"

type LoginState = {
  success: true
  statusCode: number
  message: string
  data: {
    accessToken: string
    refreshToken: string
  }
}

type RegisterState = {
  success: boolean
  statusCode: number
  message: string
  data?: {
    id: string
    name: string
    email: string
  }
}

export const loginAction = async (
  prevState: LoginState,
  formData: FormData
) => {
  const email = formData.get("email")
  const password = formData.get("password")

  const payload = { email, password }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const result = await res.json()

  if (result.success) {
    const cookieStore = await cookies()
    const { accessToken, refreshToken } = result.data

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
    })

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    })

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload

    switch (decodedToken.role) {
      case "user":
        redirect("/dashboard")

      case "driver":
        redirect("/driver-dashboard")

      case "admin":
        redirect("/admin-dashboard")

      default:
        redirect("/")
    }
  }

  return result
}

export const RegisterAction = async (
  prevState: RegisterState,
  formData: FormData
) => {
  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")

  const payload = { name, email, password }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/v1/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )

  const result = await res.json()

  return result
}
