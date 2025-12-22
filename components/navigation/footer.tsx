"use client";

import Link from "next/link";
import { Mountain, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  explore: [
    { name: "Geology", href: "/geology" },
    { name: "Minerals", href: "/minerals" },
    { name: "Investment", href: "/investment" },
    { name: "Tenders", href: "/tenders" },
  ],
  resources: [
    { name: "Infrastructure", href: "/infrastructure" },
    { name: "Companies", href: "/companies" },
    { name: "Documentation", href: "/docs" },
    { name: "API Access", href: "/api" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-saudi-green-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                <Mountain className="w-7 h-7 text-saudi-gold-400" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">
                  Saudi Mining
                </span>
                <span className="block text-sm text-saudi-gold-400">
                  Platform
                </span>
              </div>
            </Link>
            <p className="text-saudi-green-200 text-sm leading-relaxed mb-6">
              The official platform for mining investment opportunities in the
              Kingdom of Saudi Arabia. Discover geological data, mineral
              resources, and investment opportunities.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@saudimining.sa"
                className="flex items-center gap-3 text-saudi-green-200 hover:text-saudi-gold-400 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                info@saudimining.sa
              </a>
              <a
                href="tel:+966112345678"
                className="flex items-center gap-3 text-saudi-green-200 hover:text-saudi-gold-400 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +966 11 234 5678
              </a>
              <div className="flex items-center gap-3 text-saudi-green-200 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Riyadh, Kingdom of Saudi Arabia</span>
              </div>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="text-saudi-gold-400 font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-saudi-green-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-saudi-gold-400 font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-saudi-green-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-saudi-gold-400 font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-saudi-green-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* External Links */}
            <div className="mt-6 pt-6 border-t border-saudi-green-700">
              <a
                href="https://mim.gov.sa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-saudi-green-200 hover:text-saudi-gold-400 transition-colors text-sm"
              >
                Ministry of Industry
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-saudi-green-700" />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-saudi-green-300 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Saudi Mining Platform. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-saudi-green-300 text-xs">
              Part of Vision 2030
            </span>
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
              <span className="text-saudi-gold-400 text-xs font-bold">SA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

