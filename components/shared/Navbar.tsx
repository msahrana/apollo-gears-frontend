/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { LayoutDashboard, LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { toast } from "sonner"

import { logout } from "@/service/logout"

import { cn } from "@/lib/utils"

function Logo(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 64 64"
      fill="currentColor"
      {...props}
    >
      <rect x="8" y="28" width="48" height="16" rx="3" />
      <path d="M20 28 L28 18 H36 L44 28 Z" />
      <circle cx="20" cy="46" r="4" />
      <circle cx="44" cy="46" r="4" />
    </svg>
  )
}

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/cars",
    label: "Cars",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
]

export function Navbar() {
  const router = useRouter()

  const pathname = usePathname()

  const [user, setUser] = React.useState<any>(null)

  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", {
          cache: "no-store",
        })

        const data = await res.json()

        if (data.success) {
          setUser(data.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      await logout()

      setUser(null)

      toast.success("Logged out successfully")

      router.replace("/login")

      router.refresh()
    } catch (error) {
      toast.error("Logout failed")
    }
  }
  const handleDashboard = () => {
    if (user.role === "admin") {
      router.push("/admin-dashboard")
    } else if (user.role === "driver") {
      router.push("/driver-dashboard")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* LEFT */}

        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="text-3xl" />

            <span className="text-xl font-bold">
              <span>Apollo</span>

              <span className="text-red-500">Gears</span>
            </span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {links.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link
                    href={link.href}

                    className={cn(
                      "flex h-9 items-center rounded-md px-4 text-sm",
                      pathname === link.href
                        ? "bg-accent"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-10 w-10 items-center justify-center rounded-full outline-none hover:bg-accent">
                <Avatar>
                  <AvatarImage src={user.img || ""} />

                  <AvatarFallback>
                    {user.name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="font-medium">{user.name}</p>

                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleDashboard}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>

              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
