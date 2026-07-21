"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                               Logo Component                               */
/* -------------------------------------------------------------------------- */
function Logo(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 64 64"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="8" y="28" width="48" height="16" rx="3" />
      <path d="M20 28 L28 18 H36 L44 28 Z" />
      <circle cx="20" cy="46" r="4" />
      <circle cx="44" cy="46" r="4" />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/*                           Hamburger Icon Component                         */
/* -------------------------------------------------------------------------- */
const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-1.5 transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:-rotate-45"
    />
    <path
      d="M4 12H20"
      className="transition-all duration-300 group-aria-expanded:opacity-0"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-1.5 transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-45"
    />
  </svg>
)

/* -------------------------------------------------------------------------- */
/*                               Navbar Types                                 */
/* -------------------------------------------------------------------------- */
export interface NavbarLink {
  href: string
  label: string
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logoText?: string
  logoHref?: string
  navigationLinks?: NavbarLink[]
}

/* -------------------------------------------------------------------------- */
/*                           Default Navigation Links                         */
/* -------------------------------------------------------------------------- */
const defaultLinks: NavbarLink[] = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Cars" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

/* -------------------------------------------------------------------------- */
/*                              Navbar Component                              */
/* -------------------------------------------------------------------------- */
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      logoText = "Apollo Gears",
      logoHref = "/",
      navigationLinks = defaultLinks,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname()

    const [isMobile, setIsMobile] = React.useState(false)
    const containerRef = React.useRef<HTMLElement>(null)

    React.useEffect(() => {
      const handleResize = () => {
        if (containerRef.current) {
          setIsMobile(containerRef.current.offsetWidth < 768)
        }
      }

      handleResize()

      const resizeObserver = new ResizeObserver(handleResize)

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current)
      }

      return () => resizeObserver.disconnect()
    }, [])

    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node

        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref]
    )

    const isActive = (href: string) => {
      if (href === "/") {
        return pathname === "/"
      }

      return pathname.startsWith(href)
    }

    return (
      <header
        ref={combinedRef}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
          className
        )}
        {...props}
      >
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
          {/* Left */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            {isMobile && (
              <Popover>
                <PopoverTrigger className="group">
                  <Button variant="ghost" size="icon" className="group h-9 w-9">
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>

                <PopoverContent align="start" className="w-52 p-2">
                  <nav className="flex flex-col gap-1">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                          isActive(link.href)
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-2 border-t pt-2">
                    <Link href="/login">
                      <Button
                        variant="ghost"
                        className="mb-2 w-full justify-start"
                      >
                        Login
                      </Button>
                    </Link>

                    <Link href="/signup">
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {/* Logo */}
            <Link href={logoHref} className="flex items-center gap-2">
              <Logo className="text-2xl text-primary" />

              <span className="hidden text-xl font-bold sm:block">
                {logoText}
              </span>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {navigationLinks.map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "inline-flex h-9 items-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                          isActive(link.href)
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          {/* Right */}
          {!isMobile && (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>

              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </header>
    )
  }
)

Navbar.displayName = "Navbar"
