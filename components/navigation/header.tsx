"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mountain,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Search,
  Monitor,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsScrolled } from "@/lib/hooks/use-scroll";
import { useTheme } from "@/lib/providers/theme-provider";
import { useAppStore } from "@/lib/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Home", nameAr: "الرئيسية", href: "/" },
  { name: "Map", nameAr: "الخريطة", href: "/map" },
  { name: "Geology", nameAr: "الجيولوجيا", href: "/geology" },
  { name: "Minerals", nameAr: "المعادن", href: "/minerals" },
  { name: "Investment", nameAr: "الاستثمار", href: "/investment" },
  { name: "Tenders", nameAr: "المناقصات", href: "/tenders" },
  { name: "Infrastructure", nameAr: "البنية التحتية", href: "/infrastructure" },
  { name: "Companies", nameAr: "الشركات", href: "/companies" },
];

export function Header() {
  const pathname = usePathname();
  const isScrolled = useIsScrolled(50);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { language, setLanguage } = useAppStore();
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
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saudi-green-500 to-saudi-green-700 flex items-center justify-center shadow-lg">
                  <Mountain className="w-6 h-6 text-white" />
                </div>
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-saudi-gold-500 border-2",
                  useHeroStyles ? "border-gray-900" : "border-background"
                )} />
              </div>
              <div className="hidden sm:block">
                <span className={cn(
                  "text-lg font-bold transition-colors",
                  useHeroStyles ? "text-white" : "text-foreground"
                )}>
                  {language === "ar" ? "التعدين السعودي" : "Saudi Mining"}
                </span>
                <span className={cn(
                  "block text-xs -mt-1 transition-colors",
                  useHeroStyles ? "text-gray-300" : "text-muted-foreground"
                )}>
                  {language === "ar" ? "المنصة" : "Platform"}
                </span>
              </div>
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
                  {language === "ar" ? item.nameAr : item.name}
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
            {/* Search Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "hidden sm:flex",
                useHeroStyles && "text-white hover:bg-white/10 hover:text-white"
              )}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className={cn(
                "hidden sm:flex gap-1.5",
                useHeroStyles && "text-white hover:bg-white/10 hover:text-white"
              )}
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium uppercase">
                {language === "en" ? "العربية" : "EN"}
              </span>
            </Button>

            {/* Theme Toggle Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={cn(
                    useHeroStyles && "text-white hover:bg-white/10 hover:text-white"
                  )}
                >
                  {resolvedTheme === "dark" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>{language === "ar" ? "فاتح" : "Light"}</span>
                  {theme === "light" && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>{language === "ar" ? "داكن" : "Dark"}</span>
                  {theme === "dark" && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  <span>{language === "ar" ? "النظام" : "System"}</span>
                  {theme === "system" && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <Button variant="saudi" className="hidden sm:flex ml-2">
              {language === "ar" ? "تسجيل الدخول" : "Sign In"}
            </Button>

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
                    {language === "ar" ? item.nameAr : item.name}
                  </Link>
                );
              })}
              
              {/* Mobile Language and Theme Controls */}
              <div className="px-4 py-3 border-t mt-2 flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                  className="flex-1"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === "en" ? "العربية" : "English"}
                </Button>
                <div className="flex gap-1">
                  <Button
                    variant={theme === "light" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={theme === "dark" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={theme === "system" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setTheme("system")}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="px-4 pt-4 border-t mt-4">
                <Button variant="saudi" className="w-full">
                  {language === "ar" ? "تسجيل الدخول" : "Sign In"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}

