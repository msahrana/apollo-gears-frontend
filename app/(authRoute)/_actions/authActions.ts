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

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    })

    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    })

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload

    if (decodedToken.role === "user") {
      redirect("/dashboard")
    } else if (decodedToken.role === "driver") {
      redirect("/driver-dashboard")
    } else if (decodedToken.role === "admin") {
      redirect("/admin-dashboard")
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

  // if (res.ok && result.success) {
  //   redirect("/login")
  // }

  return result
}
