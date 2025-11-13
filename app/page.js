'use client'

import { useRouter} from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen gap-2 px-4 translate-y-[-30px]">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-8 text-center">
          Tired of algorithm controlling your feed?
        </h1>
        <button
          onClick={() => router.push('./yourlist')}
          className="px-8 py-3 rounded-xl font-semibold text-white 
                   bg-gradient-to-r from-red-400 to-pink-500 
                   shadow-md hover:shadow-lg 
                   transition-all duration-300 
                   hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          Take back control
        </button>
      </div>
    </div>
  );

}


