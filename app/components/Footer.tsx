"use client";
export default function Footer() {
  return (
    <footer className="mt-10 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-neutral-600 dark:text-neutral-400">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} KaizanMarket. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <a className="hover:underline" href="#/privacy">
              Privacy
            </a>
            <a className="hover:underline" href="#/terms">
              Terms
            </a>
            <a className="hover:underline" href="#/support">
              Support
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
