import type { NextAuthConfig } from "next-auth";

const authConfig: NextAuthConfig = {
  providers: [],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const onAuthRoute =
        nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/signup");
      if (onAuthRoute) return true;
      return isLoggedIn;
    },
    jwt: ({ token, user }) => {
      if (user) token.id = user.id;
      return token;
    },
    session: ({ session, token }) => {
      if (token.id) session.user.id = token.id as string;
      return session;
    },
  },
};

export default authConfig;
