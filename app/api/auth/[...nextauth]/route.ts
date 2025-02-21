
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth"
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,

   pages: {
    signIn: "/login",
   },
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };