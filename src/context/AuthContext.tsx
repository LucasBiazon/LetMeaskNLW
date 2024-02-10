import { createContext, useState, useEffect, ReactNode } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; 
import { auth } from '../services/firebase';

interface User {
  id: string;
  name: string;
}

interface AuthContextType {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, uid } = user;
        if (!displayName) {
          throw new Error('Missing information from Google Account.');
        }
        setUser({
          id: uid,
          name: displayName,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider(); 
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      const { displayName, uid } = result.user;
      if (!displayName) {
        throw new Error('Missing information from Google Account.');
      }
      setUser({
        id: uid,
        name: displayName,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
