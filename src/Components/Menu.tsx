import React, { useContext } from "react";
import { BsHouse } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { MdLogout, MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AuthContext from "context/AuthContext";

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
					<button type='button' onClick={() => navigate("/")}>
						<MdLogin />
						Login
					</button>
				) : (
					<button type='button' onClick={() => navigate("/")}>
						<MdLogout />
						Logout
					</button>
				)}
			</div>
		</div>
	);
};

export default MenuList;
