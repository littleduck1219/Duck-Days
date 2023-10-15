import HomePage from "pages/home";
import Notification from "pages/notification";
import PostListPage from "pages/posts";
import PostDetail from "pages/posts/detail";
import PostEdit from "pages/posts/edit";
import PostNew from "pages/posts/new";
import ProfilePage from "pages/profile";
import ProfileEdit from "pages/profile/edit";
import Search from "pages/search";
import LoginPage from "pages/users/login";
import SignupPage from "pages/users/signup";
import { Navigate, Route, Routes } from "react-router-dom";
import { RouterProps } from "type";

export const Router = ({ isAuthenticated }: RouterProps) => {
	return (
		<Routes>
			{isAuthenticated ? (
				<>
					<Route path='/' element={<HomePage />} />
					<Route path='/posts' element={<PostListPage />} />
					<Route path='/posts/:id' element={<PostDetail />} />
					<Route path='/posts/new' element={<PostNew />} />
					<Route path='/posts/edit/:id' element={<PostEdit />} />
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/profile/edit' element={<ProfileEdit />} />
					<Route path='/notifications' element={<Notification />} />
					<Route path='/search' element={<Search />} />
					<Route path='*' element={<Navigate replace to='/' />} />
				</>
			) : (
				<>
					<Route path='/user/signup' element={<SignupPage />} />
					<Route path='/user/login' element={<LoginPage />} />
					<Route path='*' element={<Navigate replace to='/user/login' />} />
				</>
			)}
		</Routes>
	);
};

// export const Router = ({ isAuthenticated }: RouterProps) => {
// 	return (
// 		<Routes>
// 			<Route path='/' element={<HomePage />} />
// 			<Route path='/posts' element={<PostListPage />} />
// 			<Route path='/posts/:id' element={<PostDetail />} />
// 			<Route path='/posts/new' element={<PostNew />} />
// 			<Route path='/posts/edit/:id' element={<PostEdit />} />
// 			<Route path='/profile' element={<ProfilePage />} />
// 			<Route path='/profile/edit' element={<ProfileEdit />} />
// 			<Route path='/notifications' element={<Notification />} />
// 			<Route path='/search' element={<Search />} />
// 			<Route path='*' element={<Navigate replace to='/' />} />
// 		</Routes>
// 	);
// };
