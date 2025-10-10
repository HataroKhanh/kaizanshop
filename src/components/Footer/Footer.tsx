
"use client";
export default function Footer() {
  return (
    <footer className="mt-20 border-t py-10">
      <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500">
        <p>
          © {new Date().getFullYear()} Kaizan. Built with Next.js & MongoDB ·
          Styled by Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
