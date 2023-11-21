import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../Supabase";
import { ReactSession } from 'react-client-session';
import { Navigate } from "react-router-dom";

ReactSession.setStoreType("localStorage");
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const logout = () => {
  supabase.auth.signOut();
  Navigate("/login");
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        // console.log(session?.user)
        setUser(session?.user);
        ReactSession.set("user", session?.user);
        setAuth(true);
      }else if (event === "SIGNED_OUT"){
        setUser(null);
        ReactSession.set("user", null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, [auth]);
  
  if(!auth){
    if(ReactSession.get("user")){
      setUser(ReactSession.get("user"));
      setAuth(true);
    }
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;