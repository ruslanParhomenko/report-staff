import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
      accessList?: string[] | null;
    };
  }

  interface User {
    role?: string | null;
    status?: string | null;
    accessList?: string[] | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string | null;
    accessList?: string[] | null;
  }
}
