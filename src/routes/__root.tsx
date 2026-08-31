import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import '../styles.css'

// 1. Define the Footer component here
function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4 px-4 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
        <div className="flex flex-wrap items-center justify-center gap-2 font-medium">
          <a href="#programmes" className="hover:text-black">Programmes</a>
          <span>|</span>
          <a href="#how-to-apply" className="hover:text-black">How to apply</a>
          <span>|</span>
          <a href="#faq" className="hover:text-black">FAQ</a>
          <span>|</span> 
         <span>Support:+255000000000</span>
        </div>

        <div className="flex items-center text-gray-800">
          <span>ICHAS Online Admission System | @2014-2026 Imperial College of Health and Allied Science</span>
        </div>
      </div>
    </footer>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
})

// 2. Render the Root component using the defined Footer
function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  )
}
