declare module "next-auth" {
  interface User {
    id: string;
    fullName: string;
    email: string;
    role: string;
  }
}

export {};
