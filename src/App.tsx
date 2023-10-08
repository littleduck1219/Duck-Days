import React from "react";

import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<h1>Homepage</h1>} />
			<Route path='/posts' element={<h1>postlist</h1>} />
			<Route path='/posts/:id' element={<h1>post detail</h1>} />
			<Route path='/posts/new' element={<h1>post new</h1>} />
			<Route path='/posts/edit/:id' element={<h1>post edit</h1>} />
			<Route path='/profile' element={<h1>profile</h1>} />
			<Route path='/profile/edit' element={<h1>profile edit</h1>} />
			<Route path='/notifications' element={<h1>notifications</h1>} />
			<Route path='/search' element={<h1>search</h1>} />
			<Route path='/signup' element={<h1>signup edit</h1>} />
			<Route path='/login' element={<h1>login edit</h1>} />
			<Route path='*' element={<Navigate replace to='/' />} />
		</Routes>
	);
};

export default App;
