'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();

  return session ? (
    <>
    <button onClick={() => signOut()}>Sign Out</button>
    <button onClick={() => router.push('./yourlist')}>Build your list</button>
    </>
  ) : (
    <>
    <button onClick={() => signIn("github")}>Sign In with GitHub</button>
    </>
  );
}
