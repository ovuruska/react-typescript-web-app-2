import React, { createContext, useContext, useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import { FirebaseConfig, firebaseConfigSymbol } from '@domain/types/common/firebase-config';
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { Analytics } from '@firebase/analytics';



export interface FirebaseProviderProps {
  children: React.ReactNode;
}

export interface FirebaseContextValue {
  analytics: Analytics | null;
}
const FirebaseContext = createContext({analytics: null} as FirebaseContextValue);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children  } : FirebaseProviderProps) => {
  const firebaseConfig = useInjection(firebaseConfigSymbol) as FirebaseConfig;

  const [auth, setAuth] = useState(null);
  const [firestore, setFirestore] = useState(null);
  const [storage, setStorage] = useState(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);


  useEffect(() => {
    const app = initializeApp(firebaseConfig);

    const analytics = getAnalytics(app);

    setAnalytics(analytics);

  }, []);

  const value = {
    analytics
  } as FirebaseContextValue;

  return (
    <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
  );
};
