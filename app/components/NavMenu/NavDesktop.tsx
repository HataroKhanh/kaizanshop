import Link from "next/link";
import { navLinks } from "./dataNavMenu";

export default function NavDesktop() {
  return (
    <nav className="hidden md:flex">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          className="rounded-xl px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

