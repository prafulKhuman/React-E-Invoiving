import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	sendPasswordResetEmail

} from "firebase/auth";
import { auth } from "../../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
	const [user, setUser] = useState({});

	function logIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function signUp(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function logOut() {
		return signOut(auth);
	}
	const forgotPassword = (email) => {
		return sendPasswordResetEmail(auth, email);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			
			setUser(currentuser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<userAuthContext.Provider
			value={{ user, logIn, signUp, logOut , forgotPassword}}
		>
			{children}
		</userAuthContext.Provider>
	);
}

export function useUserAuth() {
	return useContext(userAuthContext);
}
