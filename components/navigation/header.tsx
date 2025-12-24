"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsScrolled } from "@/lib/hooks/use-scroll";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Map", href: "/map" },
];

export function Header() {
  const pathname = usePathname();
  const isScrolled = useIsScrolled(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // On homepage with dark hero, use light text when not scrolled
  const isHomepage = pathname === "/";
  const useHeroStyles = isHomepage && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[1300] transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-md border-b"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/sgs-logo.svg"
                alt="Saudi Geological Survey Logo"
                width={48}
                height={48}
                className="w-10 h-10 lg:w-12 lg:h-12"
                priority
              />
              <span className={cn(
                "text-xl font-bold transition-colors",
                useHeroStyles ? "text-white" : "text-foreground"
              )}>
                GDAC
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hidden lg:flex items-center gap-1"
          >
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                    isActive
                      ? useHeroStyles
                        ? "text-white"
                        : "text-saudi-green-600 dark:text-saudi-green-400"
                      : useHeroStyles
                        ? "text-gray-300 hover:text-white hover:bg-white/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className={cn(
                        "absolute inset-0 rounded-lg -z-10",
                        useHeroStyles
                          ? "bg-white/15"
                          : "bg-saudi-green-100 dark:bg-saudi-green-900/30"
                      )}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </motion.div>

          {/* Right Side Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1"
          >
            {/* CTA Button */}
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "lg:hidden",
                useHeroStyles && "text-white hover:bg-white/10 hover:text-white"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-background/95 backdrop-blur-lg"
          >
            <div className="space-y-1 py-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                      isActive
                        ? "bg-saudi-green-100 dark:bg-saudi-green-900/30 text-saudi-green-600"
                        : "text-muted-foreground hover:bg-muted/50"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}

