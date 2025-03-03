
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import NextAuth from "next-auth"
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string ,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string
    })
    
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,

   pages: {
    signIn: "/login",
   },
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };