import { Link } from '@tanstack/react-router';

export function Footer() {
  const linkPath: any = '/Footer';

  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4 mt-auto">
      <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-gray-600">
        <Link to={linkPath} className="hover:text-black hover:underline transition">
          Programmes
        </Link>
        <span className="text-gray-300">|</span>

        <Link to={(linkPath)} className="hover:text-black hover:underline transition">
          How to apply
        </Link>
        <span className="text-gray-300">|</span>

        <Link to={(linkPath)} className="hover:text-black hover:underline transition">
          FAQ
        </Link>
        <span className="text-gray-300">|</span>

        <Link to={(linkPath)} className="hover:text-black hover:underline transition">
          Support
        </Link>
      </div>
    </footer>
  );
}