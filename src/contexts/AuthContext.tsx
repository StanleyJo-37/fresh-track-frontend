'use client';

import { getSession } from '@/lib/session';
import { UserType } from '@/types';
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext({
  isAuth: false,
  user: {} as UserType | undefined,
  token: "",
  setToken: (token:string) => {}
});

export default function AuthProvider({ children }:{children: React.ReactNode}) {
  
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserType>();
  const [isAuth, setAuth] = useState(false);

  useEffect(()=>{
    setToken(localStorage.getItem('freshtrack_token') ?? "");
  }, [])

  useEffect(()=>{
    if(!token){
      setAuth(false);
    }

    getSession(token).then((data) => {
      if(data){
        setUser(data);
        setAuth(true);  
        return;
      } 
      
      setAuth(false);
    });

  }, [token])

  return (
    <AuthContext.Provider value={{
      isAuth,
      user,
      token,
      setToken
    }}>{children}</AuthContext.Provider>
  )
}
