import { deleteServerCookie, getServerCookie } from "./cookie";
import { baseURL } from "@/api/axios";

export async function getSession(token: string) {
  try {
    const resp = await fetch(`${baseURL}/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (resp.status == 401) {
      return null;
    }

    const data = await resp.json();
    return data;
  } catch (e) {
    return null;
  }
}

export async function deleteSession(token: string) {
  
}
