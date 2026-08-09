import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectToDb from "./lib/connectToDb";
import User from "./models/User";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDb();
        const email = credentials.email as string;
        const password = credentials.password as string;

        const dbUser = await User.findOne({ email });
        if (!dbUser) {
          return null;
        }
        if (!(await bcrypt.compare(password, dbUser.password))) {
          return null;
        }
        return {
          id: dbUser._id.toString(),
          email: dbUser.email,
          role: dbUser.role.toString(),
          fullName: dbUser.fullName,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullName = user.fullName;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.fullName = token.fullName as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
