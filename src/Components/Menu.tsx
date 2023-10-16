import React, { useContext } from "react";
import { BsHouse } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { MdLogout, MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

const MenuList = () => {
	const navigate = useNavigate();
	const user = useContext(AuthContext);
	console.log(user);

	return (
		<div className='footer'>
			<div className='footer__grid'>
				<button type='button' onClick={() => navigate("/")}>
					<BsHouse />
					Home
				</button>
				<button type='button' onClick={() => navigate("/profile")}>
					<BiUserCircle />
					Profile
				</button>
				{user === null ? (
					<button type='button' onClick={() => navigate("/user/login")}>
						<MdLogin />
						Login
					</button>
				) : (
					<button
						type='button'
						onClick={async () => {
							const auth = getAuth(app);
							await signOut(auth);
							toast.success("로그아웃 되었습니다.");
						}}>
						<MdLogout />
						Logout
					</button>
				)}
			</div>
		</div>
	);
};

export default MenuList;
