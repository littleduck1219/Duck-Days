import React, { useState } from "react";

import { Router } from "Router";
import Layout from "Components/Layout";
import { app } from "firebaseApp";
import { getAuth } from "firebase/auth";

const App = () => {
	const auth = getAuth(app);
	// console.log(auth);
	// const [isAuthenticated, setAuthenticated] = useState<boolean>(!!auth?.currentUser);
	const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
	console.log("로그인 아이디 : ", isAuthenticated === true ? auth?.currentUser : "로그인 되어 있지 않음");

	return (
		<Layout>
			<Router isAuthenticated={isAuthenticated} />
		</Layout>
	);
};

export default App;
