'use client';

import { getSession } from '@/lib/session';
import { UserType } from '@/types';
import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext({
  isAuth: false,
  user: {} as UserType | undefined,

});

export default function AuthProvider({ children }:{children: React.ReactNode}) {
  
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserType>();
  const [isAuth, setAuth] = useState(false);

  useEffect(()=>{
    setToken(localStorage.getItem('freshtrack_token') ?? "");
  }, [])

  useEffect(()=>{
    if(token){
      getSession(token).then((data) => {
        setUser(data);
      })
    }
  }, [token])

  useEffect(()=>{
    setAuth(user != undefined);
  }, [user])

  return (
    <AuthContext.Provider value={{
      isAuth,
      user
    }}>{children}</AuthContext.Provider>
  )
}
