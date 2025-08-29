'use client';

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <button onClick={() => signOut()}>Sign Out</button>
  ) : (
    <button onClick={() => signIn("github")}>Sign In with GitHub</button>
  );
}
