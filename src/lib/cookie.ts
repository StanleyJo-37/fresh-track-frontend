import 'server-only';
import { cookies } from "next/headers";

export async function getServerCookie(name: string){
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}