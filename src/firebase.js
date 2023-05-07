
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyA0HwOdfDtqQOTwwerTK4YKUIpG8y5pKCM",
	authDomain: "e-invoicing-app.firebaseapp.com",
	projectId: "e-invoicing-app",
	storageBucket: "e-invoicing-app.appspot.com",
	messagingSenderId: "54038150600",
	appId: "1:54038150600:web:60b3e83e7c156cf9c8d4fd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
