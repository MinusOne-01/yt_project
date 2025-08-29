import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Protect all routes under / (or you can specify paths)
  pages: {
    signIn: "/login" // redirect here if not authenticated
  }
});

// Apply middleware to all routes
export const config = { matcher: ["/((?!_next|favicon.ico|$).*)"] };
