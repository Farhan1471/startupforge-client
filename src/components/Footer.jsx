import Link from "next/link";
import {
  LogoFacebook,
  LogoLinkedin,
  LogoGithub,
  Handset,
  Envelope,
  LocationArrow
} from "@gravity-ui/icons";


export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* TOP SECTION */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* 1. LOGO & DESCRIPTION */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400">
                <span className="text-xl font-bold text-white">SF</span>
              </div>

              <div className="leading-none">
                <h2 className="text-xl font-bold">Startup</h2>
                <h2 className="text-xl font-bold">Forge</h2>
              </div>
            </Link>

            <p className="max-w-xs leading-8 text-gray-400 text-justify">
              A startup platform built for people who take their passion seriously. Let's connect and grow together.
            </p>
          </div>

          {/* 2. QUICK LINKS */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-blue-400">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/startups" className="transition hover:text-white">
                  Startups
                </Link>
              </li>

              <li>
                <Link href="/opportunities" className="transition hover:text-white">
                  Opportunities
                </Link>
              </li>

            </ul>
          </div>

          {/* 3. CONTACT INFO */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-blue-400">
              Contact Info
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-white"><Envelope className="h-5 w-5" /></span>
                <a
                  href="mailto:info@startupforge.com"
                  className="transition hover:text-white"
                >
                  info@startupforge.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-white"><Handset className="h-5 w-5" /></span>
                <a
                  href="tel:+8801846701079"
                  className="transition hover:text-white"
                >
                  +88 01846701079
                </a>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-white"><LocationArrow className="h-5 w-5" /></span>
                <span>
                  Rangamati,<br />
                  Bangladesh
                </span>
              </li>
            </ul>
          </div>

          {/* 4. SOCIAL LINKS */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-blue-400">
              Social Links
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-violet-600">
                    <LogoFacebook className="h-5 w-5" />
                  </div>
                  Facebook
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-violet-600">
                    <LogoGithub className="h-5 w-5" />
                  </div>
                  GitHub
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-violet-600">
                    <LogoLinkedin className="h-5 w-5" />
                  </div>
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>Copyright {new Date().getFullYear()} — StartupForge</p>
        </div>
      </div>
    </footer>
  );
}