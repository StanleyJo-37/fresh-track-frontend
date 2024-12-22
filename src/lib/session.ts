import 'server-only'
import { getServerCookie } from './cookie'
import { baseURL } from '@/api/axios'

export async function getSession(token: string){
    const resp = await fetch(`${baseURL}/user`, {
      method: "GET",
      headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if(resp.status == 401){
      return null;
    }
    
    const data = await resp.json();
    return data;
}

export async function deleteSession(){
  

}