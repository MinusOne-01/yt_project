'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();

  return session ? (
    <div className="min-h-screen bg-gradient-to-r from-[#FF8235] to-[#30E8BF]">
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl md:text-5xl font-bold
         text-white text-center drop-shadow-lg py-5">
          Signed in as {session.user.email}
        </h1>

      <button
        onClick={() => signOut()}
        className="w-60 px-6 py-3 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-gray-600 to-gray-800
                   shadow-md hover:shadow-lg
                   transition-all duration-300 
                   hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Sign Out
      </button>

      <button
        onClick={() => router.push('./yourlist')}
        className="w-60 px-6 py-3 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-blue-400 to-blue-600
                   shadow-md hover:shadow-lg
                   transition-all duration-300 
                   hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Build your list
      </button>
    </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-r from-[#FF8235] to-[#30E8BF]">
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 translate-y-[-30px]">
      <h1 className="text-2xl md:text-5xl font-bold
         text-white text-center drop-shadow-lg py-5">
          Sign in to continue
        </h1>

      {/* GitHub button */}
      <button
        onClick={() => signIn("github")}
        className="w-60 px-6 py-3 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-gray-600 to-black
                   shadow-md hover:shadow-lg
                   transition-all duration-300 
                   hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        GitHub
      </button>

      {/* Google dummy button */}
      <button
        onClick={() => alert("Google login not set up yet")}
        className="w-60 px-6 py-3 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-red-400 to-pink-500
                   shadow-md hover:shadow-lg
                   transition-all duration-300 
                   hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Google
      </button>

      {/* Twitter dummy button */}
      <button
        onClick={() => alert("Twitter login not set up yet")}
        className="w-60 px-6 py-3 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-sky-400 to-sky-600
                   shadow-md hover:shadow-lg
                   transition-all duration-300 
                   hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        Twitter
      </button>
    </div>
    </div>
  );
}

