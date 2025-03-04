import { NextAuthOptions, DefaultSession, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import TwitterProvider from "next-auth/providers/twitter";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { JWT } from "next-auth/jwt";
import { prisma } from "../../prisma/prisma"; // Usa la instancia global

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      avatar?: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    id?: string;
    avatar?: string;
  }
}

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_TOKEN as string,
});

async function verifyOTP(email: string, code: string): Promise<boolean> {

  console.log("verficando OPtp")

  const record = await prisma.verificationToken.findFirst({
    where: { identifier: email, token: code },
  });

  console.log(record)
  console.log("otp_get")

  if (!record) return false;

  // Verificar expiración
  if (record.expires < new Date()) {
    return false;
  }

  // OTP válido, eliminarlo después de usar
  await prisma.verificationToken.delete({
    where: { identifier_token: { identifier: email, token: record.token } },
  });

  return record.token === code;
}

function generate6DigitCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const AuthOptions: NextAuthOptions = {
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
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        const { email, otp } = credentials ?? {};

        if (!email) throw new Error("No se recibió un email");

        if (!otp) {
          const code = generate6DigitCode();
          await prisma.verificationToken.upsert({
            where: { identifier_token: { identifier: email, token: code } },
            update: { token: code, expires: new Date(Date.now() + 3 * 60 * 1000) },
            create: { identifier: email, token: code, expires: new Date(Date.now() + 3 * 60 * 1000) },
          });

          const sender = new Sender(process.env.EMAIL_FROM as string, "Avalanche Hub");
          const recipients = [new Recipient(email, "Usuario")];

          const emailParams = new EmailParams({
            from: sender,
            to: recipients,
            subject: "Verifica tu cuenta",
            text: `Tu código de verificación es: ${code}. Expira en 3 minutos.`,
            html: `<p>Tu código de verificación es: <strong>${code}</strong>. Expira en 3 minutos.</p>`,
          });

          try {
            await mailersend.email.send(emailParams);
            console.log("Correo enviado con éxito a", email);
          } catch (error) {
            console.error("Error enviando el correo:", error);
            throw new Error("No se pudo enviar el correo de verificación");
          }

          throw new Error("OTP enviado");
        }

        // Verificar OTP
        const isValid = await verifyOTP(email, otp);
        if (!isValid) throw new Error("OTP inválido");

        // Crear usuario si no existe
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          user = await prisma.user.create({
            data: { email, name: "", image: "" },
          });
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // async signIn({ user, account }) {
    //   console.log("desde callback")
    //   console.log(user)
    //   console.log(account)
    //   if (account?.provider === "credentials") {
    //     let existingUser = await prisma.user.findUnique({
    //       where: { email: user.email! },
    //     });

    //     if (!existingUser) {
    //       existingUser = await prisma.user.create({
    //         data: {
    //           email: user.email!,
    //           name: user.name || "",
    //           image: user.image || "",
    //         },
    //       });
    //     }
    //   }
    //   return true;
    // },
    async jwt({ token, user }: { token: JWT; user?: any }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.avatar = user.image;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (!session.user) {
        session.user = { name: "", email: "", image: "" };
      }
      session.user.id = token.id as string;
      session.user.avatar = token.avatar as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", 
  },
};