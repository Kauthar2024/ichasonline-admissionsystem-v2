import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="w-full py-10 bg-gray-50 flex flex-col items-center justify-center ">
      <div className="bg-green-200 p-8 rounded-xl border border-gray-200 shadow-sm max-w-md w-full text-center space-y-6">
        <div>
          <h2 className="text-1xl font-bold text-gray-900">
            Imperial College of Health and Allied Science
          </h2>
          <br />
          <hr />
        <br />
          <h1 className="text-xl font-bold text-gray-500">
            ICHAS Admission System
          </h1>
          <p className="text-xs text-gray-500 mt-2">
            Welcome! Please sign in or create an account to begin your application.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to={('/login' as any)}
            className="w-full py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition active:scale-[0.99] flex items-center justify-center"
          >
            Sign In
          </Link>

          <Link
            to={('/registration' as any)}
            className="w-full py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition active:scale-[0.99] flex items-center justify-center"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}