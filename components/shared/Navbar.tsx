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

import { LayoutDashboard, LogOut, Settings, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { toast } from "sonner"

import { logout } from "@/service/logout"

import { cn } from "@/lib/utils"

// =========================
// LOGO
// =========================

function Logo(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 64 64"
      fill="currentColor"
      {...props}
    >
      {/* Put your logo SVG paths here */}
    </svg>
  )
}

// =========================
// NAVIGATION LINKS
// =========================

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

// =========================
// USER TYPE
// =========================

type UserData = {
  name?: string
  email?: string
  img?: string | null
  role?: string
}

function getInitials(name?: string) {
  if (!name) return "U"

  const parts = name.trim().split(/\s+/)

  // Example:
  // Tara -> TA
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  // Example:
  // Tara Mony -> TM
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = React.useState<UserData | null>(null)
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
        } else {
          setUser(null)
        }
      } catch (error) {
        console.log("Failed to fetch user:", error)
        setUser(null)
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
      console.log(error)
      toast.error("Logout failed")
    }
  }

  const handleDashboard = () => {
    if (!user) return

    if (user.role === "admin") {
      router.push("/admin-dashboard")
    } else if (user.role === "driver") {
      router.push("/driver-dashboard")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* =========================
            LEFT SIDE
        ========================= */}

        <div className="flex items-center gap-6">
          {/* LOGO */}

          <Link href="/" className="flex items-center gap-2">
            <Logo className="text-3xl" />

            <span className="text-xl font-bold">
              <span>Apollo</span>

              <span className="text-red-500">Gears</span>
            </span>
          </Link>

          {/* NAVIGATION */}

          <NavigationMenu>
            <NavigationMenuList>
              {links.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex h-9 items-center rounded-md px-4 text-sm transition-colors",

                      pathname === link.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="flex items-center gap-3">
          {/* LOADING */}

          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            /* =========================
               LOGGED-IN USER
            ========================= */

            <DropdownMenu>
              {/* AVATAR BUTTON */}

              <DropdownMenuTrigger className="flex h-10 w-10 items-center justify-center rounded-full outline-none hover:bg-accent">
                <Avatar>
                  <AvatarImage src={user.img || ""} alt={user.name || "User"} />

                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              {/* DROPDOWN */}

              <DropdownMenuContent align="end" className="w-56">
                {/* USER INFORMATION */}

                <div className="px-3 py-2">
                  <p className="font-medium">{user.name || "User"}</p>

                  <p className="text-xs text-muted-foreground">
                    {user.email || ""}
                  </p>
                </div>

                <DropdownMenuSeparator />

                {/* =========================
                    PROFILE
                ========================= */}

                <DropdownMenuItem>
                  <Link
                    href="/profile"
                    className="flex w-full cursor-pointer items-center"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                {/* =========================
                    DASHBOARD
                ========================= */}

                <DropdownMenuItem
                  onClick={handleDashboard}
                  className="cursor-pointer"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>

                {/* =========================
                    SETTINGS
                ========================= */}

                <DropdownMenuItem>
                  <Link
                    href="/settings"
                    className="flex w-full cursor-pointer items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* =========================
                    LOGOUT
                ========================= */}

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer font-bold text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* =========================
               NOT LOGGED IN
            ========================= */

            <>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
