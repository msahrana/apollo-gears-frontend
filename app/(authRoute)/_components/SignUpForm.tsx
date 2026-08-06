"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useActionState, useEffect } from "react"
import { RegisterAction } from "../_actions/authActions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

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

const initialState: RegisterState = {
  success: false,
  statusCode: 0,
  message: "",
}

const SignUpForm = () => {
  const [state, action, pending] = useActionState(RegisterAction, initialState)
  const router = useRouter()

  useEffect(() => {
    if (!state) return

    if (state.success) {
      toast.success(state.message)

      setTimeout(() => {
        router.push("/login")
      }, 1500) // Redirect after 1.5 seconds
    } else {
      toast.error(state.message)
    }
  }, [state, router])

  return (
    <form action={action} className="space-y-4">
      <Card className="space-y-4 p-5">
        <Input
          name="name"
          type="name"
          placeholder="Enter Your Full Name"
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter Your Password"
          required
        />
        <Button type="submit">{pending ? "Submitting" : "Register"}</Button>
      </Card>
    </form>
  )
}

export default SignUpForm
