"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, SearchX } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  const router = useRouter()

  return (
    <main className="flex min-h-fit items-center justify-center bg-background px-6">
      <div className="mx-auto max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-12 w-12 text-muted-foreground" />
        </div>

        {/* 404 */}
        <h1 className="mt-8 text-9xl font-extrabold tracking-tight text-red-500">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-3xl font-bold tracking-tight">
          Page Not Found <span className="text-red-600">!</span>
        </h2>

        {/* Description */}
        <p className="mt-4 text-muted-foreground">
          Sorry, the page you are looking for does not exist or may have been
          moved. Please check the URL or return to the homepage.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
          {/* Home Link */}
          <Link
            href="/"
            className={cn(buttonVariants({ size: "lg", variant: "default" }))}
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          {/* Go Back Button */}
          <Button variant="outline" size="lg" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </main>
  )
}
