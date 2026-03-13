"use client";

import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const bgColor = theme == "Light" ? "white" : "black";
  const textColor = theme == "Light" ? "black" : "white";
  return (
    <div className="min-h-screen" style={{ backgroundColor: bgColor }}>
      <div>
        <ThemeToggle></ThemeToggle>
      </div>

      <header className="mb-8 border-b py-4">
        <nav className="flex gap-4">
          <a href="/" className="font-semibold">
            Home
          </a>
          <a href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </a>
          <a href="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </a>
        </nav>
      </header>

      <main style={{ color: textColor }}>{children}</main>

      <footer className="mt-8 border-t py-4 text-gray-500 text-sm">
        © 2026 Next.js Foundations
      </footer>
    </div>
  );
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}
