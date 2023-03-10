
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

// O contexto forma um componente
type User = {
    id: string;
    name: string;
    avatar: string;
};
  
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode
}


export const AuthContext = createContext({} as AuthContextType); 

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>();

    useEffect(() => {
  
      const unsubscribe = auth.onAuthStateChanged(user => {

        if (user) {
          // extraindo informações da conta do google
          const { displayName, photoURL, uid } = user
  
          if (!displayName || !photoURL) {
            throw new Error('Informações faltando da conta do Google.')
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
  
        return () => {
          unsubscribe();
        }
      })
    }, [])
  
    async function signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
  
      const res = await auth.signInWithPopup(provider)
  
        if (res.user) {
          const { displayName, photoURL, uid } = res.user
          if (!displayName || !photoURL) {
            throw new Error('Informações faltando da conta do Google.')
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
  }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}