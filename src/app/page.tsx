// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
}

// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "./api/auth/[...nextauth]/route";

// export default async function Home() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect("/signin");
//   } else {
//     redirect("/dashboard");
//   }
// }