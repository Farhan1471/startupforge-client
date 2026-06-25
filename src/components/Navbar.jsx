"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();

  const router = useRouter();
  const pathName = usePathname();

  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();

    const publicRoutes = ["/", "/startups", "/opportunities"];

    if (!publicRoutes.includes(pathName)) {
      router.push("/");
    }
    else {
      router.refresh();
    }


  }

  const navLinks = [
    {
      label: "Browse Startups",
      href: "/startups",
    },
    {
      label: "Browse Opportunities",
      href: "/opportunities",
    },
  ];

  const dashboardLinks = {
    collaborator: '/dashboard/collaborator',
    founder: '/dashboard/founder',
    admin: '/dashboard/admin'
  }

  if (user?.email) {
    navLinks.push(
      {
        label: 'Dashboard',
        href: dashboardLinks[user?.role || 'collaborator']
      }
    )
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg">
            <span className="text-xl font-bold text-white">SF</span>
          </div>

          <div className="hidden leading-none sm:block">
            <h1 className="text-lg font-bold text-white">
              StartupForge
            </h1>
          </div>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* Desktop Menu */}
          <div className="hidden items-center gap-6 md:flex">
            {/* Nav Links */}
            <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Vertical Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Auth Links */}
            <div className="flex items-center gap-4">
              {
                user ?
                  <>
                    Hi, {user.name}!
                    <Button onClick={handleSignOut}
                      variant="ghost">Logout</Button>
                  </>
                  :
                  
                  <div>
                      <Link
                          href="/auth/signin"
                          className="rounded-full px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-400 hover:text-white"
                        >
                          Login
                        </Link>

                        <Link
                          href="/auth/signup"
                          className="rounded-full px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-300 hover:text-white"
                        >
                          Register
                        </Link>
                    </div>
                  }
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0B0B0F] md:hidden">
          <div className="space-y-3 px-4 py-6">
            {/* Nav Links */}
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="rounded-xl px-4 py-3 text-base font-medium text-violet-400 transition hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>

                <Button
                  as={Link}
                  href="/register"
                  className="bg-white font-semibold text-black"
                  radius="lg"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}