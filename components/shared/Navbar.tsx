"use client"

import * as React from "react"
import Link from "next/link"
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
      <rect x="8" y="28" width="48" height="16" rx="3" fill="currentColor" />
      <path d="M20 28 L28 18 H36 L44 28 Z" fill="currentColor" />
      <circle cx="20" cy="46" r="4" fill="currentColor" />
      <circle cx="44" cy="46" r="4" fill="currentColor" />
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
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="group-aria-expanded:rotate-315d origin-center -translate-y-1.75 transition-all duration-300 ease-in-out group-aria-expanded:translate-y-0"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-in-out group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center -translate-y-1.75 transition-all duration-300 ease-in-out group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
    />
  </svg>
)

/* -------------------------------------------------------------------------- */
/*                               Navbar Types                                 */
/* -------------------------------------------------------------------------- */
export interface NavbarLink {
  href: string
  label: string
  active?: boolean
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
  { href: "/", label: "Home", active: true },
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
      if (containerRef.current) resizeObserver.observe(containerRef.current)
      return () => resizeObserver.disconnect()
    }, [])

    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      },
      [ref]
    )

    return (
      <header
        ref={combinedRef}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 md:px-6",
          className
        )}
        {...props}
      >
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            {isMobile && (
              <Popover>
                <PopoverTrigger>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-48 p-2">
                  <nav className="flex flex-col gap-1">
                    {navigationLinks.map((link, i) => (
                      <Link
                        key={i}
                        href={link.href}
                        className={cn(
                          "block w-full rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                          link.active
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground/80"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-2 flex flex-col gap-1 border-t pt-2">
                    <Link
                      href="/login"
                      className="block w-full rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
                    >
                      Sign Up
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {/* Logo */}
            <Link
              href={logoHref}
              className="flex items-center space-x-2 text-primary transition-colors hover:text-primary/90"
            >
              <Logo className="text-2xl" />
              <span className="hidden text-xl font-bold sm:inline-block">
                {logoText}
              </span>
            </Link>

            {/* Desktop Links */}
            {!isMobile && (
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {navigationLinks.map((link, i) => (
                    <NavigationMenuItem key={i}>
                      <Link
                        href={link.href}
                        className={cn(
                          "inline-flex h-9 items-center rounded-md px-4 text-sm font-medium no-underline transition-colors hover:bg-accent hover:text-accent-foreground",
                          link.active
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground/80"
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

          {/* Right Section */}
          {!isMobile && (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="h-9 rounded-md px-4 text-sm font-medium shadow-sm"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>
    )
  }
)

Navbar.displayName = "Navbar"
