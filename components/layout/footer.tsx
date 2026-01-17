'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const footerLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://github.com/iAMido', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/idomosseri/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com/idomosseri', icon: Twitter, label: 'Twitter' },
  { href: 'mailto:idomosseri@gmail.com', icon: Mail, label: 'Email' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="py-12 px-6 bg-slate-100 border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center gap-3">
            <Link href="/" className="text-xl font-semibold text-slate-900 hover:text-blue-600 transition-colors">
              Ido Mosseri
            </Link>
            <p className="text-slate-500 text-sm">Technical SEO Lead</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-blue-100 transition-all"
                  aria-label={social.label}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="pt-4 border-t border-slate-200 w-full text-center">
            <p className="text-sm text-slate-500">
              &copy; {currentYear} Ido Mosseri. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
