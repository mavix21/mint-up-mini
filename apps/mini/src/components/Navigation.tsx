import Image from "next/image";
import Link from "next/link";

import { Button } from "@mint-up/ui/components/button";

import { ThemeToggle } from "./ThemeToggle";

const Navigation = () => {
  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border sticky top-0 z-50 border-b backdrop-blur">
      <div className="container mx-auto px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with Character */}
          <Link href="/" className="relative z-50 flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center">
              <Image
                src="/lovable-uploads/ef0b150b-c43f-45d9-bc17-5798b9568c00.png"
                alt="Mint Up! Character"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-foreground text-xl font-bold">Mint Up!</span>
          </Link>

          {/* Hamburger Menu Toggle (hidden checkbox) */}
          <input type="checkbox" id="menu-toggle" className="peer hidden" />

          {/* Hamburger Button */}
          <label
            htmlFor="menu-toggle"
            className="relative z-50 flex h-8 w-8 cursor-pointer flex-col items-center justify-center space-y-1.5 md:hidden"
          >
            <span className="bg-foreground block h-0.5 w-6 transition-all duration-300 ease-in-out peer-checked:translate-y-2 peer-checked:rotate-45"></span>
            <span className="bg-foreground block h-0.5 w-6 transition-all duration-300 ease-in-out peer-checked:opacity-0"></span>
            <span className="bg-foreground block h-0.5 w-6 transition-all duration-300 ease-in-out peer-checked:-translate-y-2 peer-checked:-rotate-45"></span>
          </label>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/explore"
              className="text-foreground hover:text-primary transition-colors"
            >
              Explore Events
            </Link>
            <Link
              href="/create"
              className="text-foreground hover:text-primary transition-colors"
            >
              Create Event
            </Link>
            <Link
              href="/my-events"
              className="text-foreground hover:text-primary transition-colors"
            >
              My Events
            </Link>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className="bg-background/95 fixed bottom-0 left-0 right-0 top-16 z-40 translate-x-full transform backdrop-blur-md transition-transform duration-300 ease-in-out peer-checked:translate-x-0 md:hidden"
            id="mobile-menu"
          >
            <div className="flex h-full flex-col items-center justify-center space-y-8">
              <Link
                href="/explore"
                className="text-foreground hover:text-primary text-2xl transition-colors"
                onClick={() => {
                  const checkbox = document.getElementById(
                    "menu-toggle",
                  ) as HTMLInputElement;
                  if (checkbox) checkbox.checked = false;
                }}
              >
                Explore Events
              </Link>
              <Link
                href="/create"
                className="text-foreground hover:text-primary text-2xl transition-colors"
                onClick={() => {
                  const checkbox = document.getElementById(
                    "menu-toggle",
                  ) as HTMLInputElement;
                  if (checkbox) checkbox.checked = false;
                }}
              >
                Create Event
              </Link>
              <Link
                href="/my-events"
                className="text-foreground hover:text-primary text-2xl transition-colors"
                onClick={() => {
                  const checkbox = document.getElementById(
                    "menu-toggle",
                  ) as HTMLInputElement;
                  if (checkbox) checkbox.checked = false;
                }}
              >
                My Events
              </Link>

              {/* Theme Toggle in Mobile Menu */}
              <div className="pt-4">
                <ThemeToggle />
              </div>

              {/* Connect Wallet Button in Mobile Menu */}
              <Button variant="outline" size="sm" className="mt-4">
                Connect Wallet
              </Button>
            </div>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden items-center space-x-4 md:flex">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              Connect Wallet
            </Button>
          </div>

          {/* Right Side - Mobile (removed ThemeToggle since it's now in the menu) */}
          <div className="relative z-50 flex items-center space-x-4 md:hidden">
            {/* Empty for now since ThemeToggle is moved to mobile menu */}
          </div>
        </div>
      </div>

      <style>{`
        #menu-toggle:checked ~ #mobile-menu {
          transform: translateX(0) !important;
        }
        
        #menu-toggle:checked + label span:nth-child(1) {
          transform: rotate(45deg) translateY(8px) !important;
        }
        
        #menu-toggle:checked + label span:nth-child(2) {
          opacity: 0 !important;
        }
        
        #menu-toggle:checked + label span:nth-child(3) {
          transform: rotate(-45deg) translateY(-8px) !important;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
