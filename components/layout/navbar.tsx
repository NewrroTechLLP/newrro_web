"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Arjuna", href: "/Arjuna" },
  { name: "About Us", href: "/about" },
  { name: "Work Gallery", href: "/Gallery" },
  { name: "Store", href: "/products" },


];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-500 px-5 md:px-10",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div
        className={cn(
          "max-w-[1440px] mx-auto rounded-full transition-all duration-500",
          scrolled
            ? "bg-black/80 backdrop-blur-xl shadow-2xl"
            : "bg-black/50 backdrop-blur-md"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/NR.png"
                alt="Logo"
                width={160}  // Increased width for mobile
                height={160} // Increased height for mobile
                className="transition-all duration-300 object-contain md:w-28 md:h-28 w-24 h-24" // Larger size for mobile (24x24) and desktop (28x28)
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center justify-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-5 py-2 text-sm font-medium text-white rounded-full transition-all duration-300",
                  pathname === item.href
                    ? "bg-white/10 shadow-lg shadow-white/5"
                    : "hover:bg-white/5"
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full transform scale-x-100 transition-transform duration-300"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 transition-all duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="sm:hidden mobile-menu mt-3 transition-all duration-300 ease-in-out">
          <div className="rounded-2xl bg-black/90 backdrop-blur-xl shadow-2xl border border-white/[0.05] overflow-hidden">
            <div className="px-4 pt-3 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 text-base font-medium text-white rounded-lg transition-all duration-300",
                    pathname === item.href
                      ? "bg-white/10 shadow-lg shadow-white/5"
                      : "hover:bg-white/5"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full h-12 text-base font-medium transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-600/30"
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
