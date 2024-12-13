import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { authUserBySocial } from "./lib/axiosConfig";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub || "";
      return session;
    },
    async signIn({ user, account }) {
      if (!user) return false;
      const Provider = account?.provider;

      const response = await authUserBySocial({
        email: user.email as string,
        name: user.name as string,
        image: user.image as string,
        providerId: user.id as string,
        providerName: Provider as string,
      });
      if (!response.success) {
        return false;
      }

      const { accessToken } = response.data;
      (await cookies()).set("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
      });
      return true;
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token }) {
      return token;
    },
  },
});
