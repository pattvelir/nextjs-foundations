"use client";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-70">
            <p>
              © {new Date().getFullYear()} Vercel Daily News. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
