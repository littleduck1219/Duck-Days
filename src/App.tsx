import React, { useEffect, useState } from "react";

import { Router } from "Router";
import Layout from "components/Layout";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loader from "components/loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	const auth = getAuth(app);
	// console.log(auth);
	// const [isAuthenticated, setAuthenticated] = useState<boolean>(!!auth?.currentUser);
	const [init, setInit] = useState<boolean>(false);
	const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
	console.log("로그인 아이디 : ", isAuthenticated === true ? auth?.currentUser?.email : "로그인 되어 있지 않음");

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuthenticated(true);
			} else {
				setAuthenticated(false);
			}
			setInit(true);
		});
	}, [auth]);

	return (
		<Layout>
			<ToastContainer />
			{/* {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />} */}
			<Router isAuthenticated={isAuthenticated} />
		</Layout>
	);
};

export default App;
