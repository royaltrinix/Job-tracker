import { createContext, useEffect, useState, useContext  } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined)

    // SIGN UP

    const signUpNewUser = async ( email,password ) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            emailRedirectTo: `${window.location.origin}/dashboard`
        });

        if(error){
            console.error("there was a problem signing up: ", error);
            return { success: false, error };
        }
        return { success: true, data };
    };

    useEffect(() =>{
        supabase.auth.getSession().then(({ data: { session } }) =>{
            setSession(session);
        }) 

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, []); 

    // SIGN IN
    const signInUser = async (  email,password ) => {
        try{
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if(error){
                console.error("sign in error occurred: ", error);
                return { success: false, error: error.message}
            }
            console.log("sign in success: ", data );
            return { success: true, data}
        }catch (error){
            console.error("an error occured: ", error )
        }
    }

    //  SIGN OUT

    const signOut = async () => { 
        const { error } = await supabase.auth.signOut(); 
        if (error) {
            console.error("there was an error: ", error);
        }
    };

    return (
        <AuthContext.Provider value= {{session, signUpNewUser, signInUser, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const userAuth = () => {
    return useContext(AuthContext)
} 