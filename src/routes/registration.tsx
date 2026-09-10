// // import React, { useState } from 'react';
// // import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
// // import { useRegister } from '../lib/use-auth';

// // export const Route = createFileRoute('/registration')({
// //   component: RegisterPage,
// // });

// // export function RegisterPage() {
// //   const navigate = useNavigate();
// //   const { mutate: register, isPending, error } = useRegister();

// //   const [formData, setFormData] = useState({
// //     education: '',
// //     indexNumber: '',
// //     email: '',
// //     phone: '',
// //     password: '',
// //     password2: '',
// //   });

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// //   ) => {
// //     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();

// //     register(
// //       {
// //         education_authority: formData.education,
// //         index_number: formData.indexNumber,
// //         email: formData.email,
// //         phone: formData.phone,
// //         password: formData.password,
// //       },
// //       {
// //         onSuccess: () => {
// //           navigate({ to: '/login' });
// //         },
// //       }
// //     );
// //   };

// //   return (
// //     <div className="w-full min-h-screen flex-1 bg-green-200 flex items-center justify-center p-4 py-10">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-6 rounded-xl border shadow-sm w-full max-w-sm space-y-3"
// //       >
// //         <h2 className="text-xl font-bold text-center">Create Account</h2>

// //         {error && (
// //           <div className="p-2 bg-red-100 border border-red-400 text-red-700 text-xs rounded text-center">
// //             {axiosIsAxiosError(error)
// //               ? renderErrorMessage(error.response?.data)
// //               : 'Registration failed. Please check your details.'}
// //           </div>
// //         )}

// //         <select
// //           name="education"
// //           id="education"
// //           required
// //           value={formData.education}
// //           onChange={handleChange}
// //           disabled={isPending}
// //           className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
// //         >
// //           <option value="">
// //             Choose Examination Authority for your first sitting at O-level(FIV)
// //           </option>
// //           <option value="NECTA">
// //             National Examination Council of Tanzania (NECTA) 1987-To Date
// //           </option>
// //           <option value="CSEE">
// //             CSEE Before 1987/GCE/Foreign Examination
// //           </option>
// //         </select>

// //         <input
// //           type="text"
// //           name="indexNumber"
// //           required
// //           placeholder="Index Number......Eg.S0001/0001/2000"
// //           value={formData.indexNumber}
// //           onChange={handleChange}
// //           disabled={isPending}
// //           className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
// //         />

// //         <input
// //           type="email"
// //           name="email"
// //           required
// //           placeholder="Valid Email Address...."
// //           value={formData.email}
// //           onChange={handleChange}
// //           disabled={isPending}
// //           className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
// //         />

// //         <input
// //           type="tel"
// //           name="phone"
// //           required
// //           placeholder="Telephone No.Eg.255777020304"
// //           value={formData.phone}
// //           onChange={handleChange}
// //           disabled={isPending}
// //           className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
// //         />

// //         <input
// //           type="password"
// //           name="password"
// //           required
// //           placeholder="Password"
// //           value={formData.password}
// //           onChange={handleChange}
// //           disabled={isPending}
// //           className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
// //         />

// //               <input
// //           type="password2"
// //           name="password2"
// //           required
// //           placeholder="Confirm Password"
// //           value={formData.password2}
// //           onChange={handleChange}
// //           disabled={isPending}
// //           className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
// //         />

// //         <button
// //           type="submit"
// //           disabled={isPending}
// //           className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-200 text-black font-semibold text-sm rounded-lg transition flex items-center justify-center"
// //         >
// //           {isPending ? 'Registering...' : 'Register'}
// //         </button>

// //         <p className="text-xs text-center text-gray-600">
// //           Already registered?{' '}
// //           <Link to="/login" className="font-semibold underline">
// //             Sign In
// //           </Link>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // }

// // // Helper to safely extract and format Django DRF field errors or general messages
// // function axiosIsAxiosError(err: unknown): err is { response?: { data?: Record<string, unknown> } } {
// //   return typeof err === 'object' && err !== null && 'response' in err;
// // }

// // function renderErrorMessage(data?: Record<string, unknown>): string {
// //   if (!data) return 'Registration failed.';
// //   if (typeof data.detail === 'string') return data.detail;
  
// //   // DRF field validation errors (e.g. { "email": ["This field must be unique."] })
// //   const firstKey = Object.keys(data)[0];
// //   if (firstKey && Array.isArray(data[firstKey])) {
// //     return `${firstKey}: ${data[firstKey][0]}`;
// //   }
  
// //   return 'Invalid registration details.';
// // }


// import React, { useState } from 'react';
// import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
// import { useRegister } from '../lib/use-auth';

// export const Route = createFileRoute('/registration')({
//   component: RegisterPage,
// });

// export function RegisterPage() {
//   const navigate = useNavigate();
//   const { mutate: register, isPending, error } = useRegister();

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     education: '',
//     indexNumber: '',
//     email: '',
//     phone: '',
//     password: '',
//     password2: '',
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     register(
//       {
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         education_authority: formData.education,
//         index_number: formData.indexNumber,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//       },
//       {
//         onSuccess: () => {
//           navigate({ to: '/login' });
//         },
//       }
//     );
//   };

//   return (
//     <div className="w-full min-h-screen flex-1 bg-green-200 flex items-center justify-center p-4 py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl border shadow-sm w-full max-w-sm space-y-3"
//       >
//         <h2 className="text-xl font-bold text-center">Create Account</h2>

//         {error && (
//           <div className="p-2 bg-red-100 border border-red-400 text-red-700 text-xs rounded text-center">
//             {axiosIsAxiosError(error)
//               ? renderErrorMessage(error.response?.data)
//               : 'Registration failed. Please check your details.'}
//           </div>
//         )}


//         <select
//           name="education"
//           id="education"
//           required
//           value={formData.education}
//           onChange={handleChange}
//           disabled={isPending}
//           className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
//         >
//           <option value="">
//             Choose Examination Authority for your first sitting at O-level(FIV)
//           </option>
//           <option value="NECTA">
//             National Examination Council of Tanzania (NECTA) 1987-To Date
//           </option>
//           <option value="CSEE">
//             CSEE Before 1987/GCE/Foreign Examination
//           </option>
//         </select>

//         <input
//           type="text"
//           name="indexNumber"
//           required
//           placeholder="Index Number......Eg.S0001/0001/2000"
//           value={formData.indexNumber}
//           onChange={handleChange}
//           disabled={isPending}
//           className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
//         />

//         <input
//           type="email"
//           name="email"
//           required
//           placeholder="Valid Email Address...."
//           value={formData.email}
//           onChange={handleChange}
//           disabled={isPending}
//           className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
//         />

//         <input
//           type="tel"
//           name="phone"
//           required
//           placeholder="Telephone No.Eg.255777020304"
//           value={formData.phone}
//           onChange={handleChange}
//           disabled={isPending}
//           className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
//         />
//            <input
//           type="text"
//           name="firstName"
//           required
//           placeholder="First Name...."
//           value={formData.firstName}
//           onChange={handleChange}
//           disabled={isPending}
//           className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
//         />

//         <input
//           type="text"
//           name="lastName"
//           required
//           placeholder="Last Name...."
//           value={formData.lastName}
//           onChange={handleChange}
//           disabled={isPending}
//           className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
//         />

//         <input
//           type="password"
//           name="password"
//           required
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           disabled={isPending}
//           className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
//         />

//         <input
//           type="password"
//           name="password2"
//           required
//           placeholder="Confirm Password"
//           value={formData.password2}
//           onChange={handleChange}
//           disabled={isPending}
//           className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
//         />

//         <button
//           type="submit"
//           disabled={isPending}
//           className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-200 text-black font-semibold text-sm rounded-lg transition flex items-center justify-center"
//         >
//           {isPending ? 'Registering...' : 'Register'}
//         </button>

//         <p className="text-xs text-center text-gray-600">
//           Already registered?{' '}
//           <Link to="/login" className="font-semibold underline">
//             Sign In
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// // Helper to safely extract and format Django DRF field errors or general messages
// function axiosIsAxiosError(err: unknown): err is { response?: { data?: Record<string, unknown> } } {
//   return typeof err === 'object' && err !== null && 'response' in err;
// }

// function renderErrorMessage(data?: Record<string, unknown>): string {
//   if (!data) return 'Registration failed.';
//   if (typeof data.detail === 'string') return data.detail;
  
//   // DRF field validation errors (e.g. { "email": ["This field must be unique."] })
//   const firstKey = Object.keys(data)[0];
//   if (firstKey && Array.isArray(data[firstKey])) {
//     return `${firstKey}: ${data[firstKey][0]}`;
//   }
  
//   return 'Invalid registration details.';
// }

import React, { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useRegister } from '../lib/use-auth';

export const Route = createFileRoute('/registration')({
  component: RegisterPage,
});

export function RegisterPage() {
  const navigate = useNavigate();
  const { mutate: register, isPending, error } = useRegister();
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const [formData, setFormData] = useState({
    indexNumber: '',
    equivalentNumber: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    password: '',
    password2: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (passwordMismatch) setPasswordMismatch(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      setPasswordMismatch(true);
      return;
    }

    register(
      {
        index_number: formData.indexNumber,
        equivalent_number: formData.equivalentNumber || undefined,
        email: formData.email,
        phone: formData.phone,
        first_name: formData.firstName,
        last_name: formData.lastName,
        password: formData.password,
        password2: formData.password2,
      },
      {
        onSuccess: () => {
          navigate({ to: '/login' });
        },
      }
    );
  };

  return (
    <div className="w-full min-h-screen flex-1 bg-green-200 flex items-center justify-center p-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border shadow-sm w-full max-w-md space-y-3"
      >
        <h2 className="text-xl font-bold text-center">Create Account</h2>

        {passwordMismatch && (
          <div className="p-2 bg-red-100 border border-red-400 text-red-700 text-xs rounded text-center font-medium">
            Passwords do not match.
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 text-xs rounded text-left space-y-1">
            <p className="font-semibold text-center border-b border-red-200 pb-1 mb-1">
              Registration Error
            </p>
            {renderDetailedError(error)}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Index Number</label>
          <input
            type="text"
            name="indexNumber"
            required
            placeholder="Index number... eg. S0001/0001/2000"
            value={formData.indexNumber}
            onChange={handleChange}
            disabled={isPending}
            className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Equivalent Number (Optional)
          </label>
          <input
            type="text"
            name="equivalentNumber"
            placeholder="Equivalent number if applicable"
            value={formData.equivalentNumber}
            onChange={handleChange}
            disabled={isPending}
            className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              required
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isPending}
              className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              required
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isPending}
              className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Valid Email Address..."
            value={formData.email}
            onChange={handleChange}
            disabled={isPending}
            className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="Telephone No. eg. 255777020304"
            value={formData.phone}
            onChange={handleChange}
            disabled={isPending}
            className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={isPending}
              className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="password2"
              required
              placeholder="Confirm Password"
              value={formData.password2}
              onChange={handleChange}
              disabled={isPending}
              className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-200 text-black font-semibold text-sm rounded-lg transition flex items-center justify-center mt-2"
        >
          {isPending ? 'Registering...' : 'Register'}
        </button>

        <p className="text-xs text-center text-gray-600">
          Already registered?{' '}
          <Link to="/login" className="font-semibold underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

// Detailed error inspector for network/CORS vs response errors
function renderDetailedError(err: unknown): React.ReactNode {
  if (typeof err === 'object' && err !== null && 'isAxiosError' in err) {
    const axiosErr = err as {
      response?: { data?: unknown; status?: number };
      request?: unknown;
      message?: string;
    };

    // Case 1: Backend responded with an error (e.g., 400 Bad Request)
    if (axiosErr.response?.data) {
      const data = axiosErr.response.data as Record<string, unknown>;
      const entries = Object.entries(data);

      return (
        <ul className="list-disc list-inside space-y-0.5">
          {entries.map(([field, messages]) => {
            const fieldName = field.replace(/_/g, ' ').toUpperCase();
            const msgText = Array.isArray(messages) ? messages.join(', ') : String(messages);
            return (
              <li key={field}>
                <span className="font-semibold">{fieldName}:</span> {msgText}
              </li>
            );
          })}
        </ul>
      );
    }

    // Case 2: Request was made but no response (CORS or Server Down)
    if (axiosErr.request) {
      return (
        <p className="text-center font-semibold">
          Network Error: Unable to reach Django server at <code>/api/auth/register/</code>. Ensure Django is running and CORS is enabled.
        </p>
      );
    }

    return <p>{axiosErr.message}</p>;
  }

  return <p>An unexpected error occurred.</p>;
}