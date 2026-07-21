"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const SignUpForm = () => {
  return (
    <form className="space-y-4">
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
        <Button type="submit">Register</Button>
      </Card>
    </form>
  )
}

export default SignUpForm
