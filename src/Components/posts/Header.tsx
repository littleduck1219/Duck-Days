import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const PostHeader = () => {
	const navigate = useNavigate();
	return (
		<div className='post_header'>
			<button type='button' onClick={() => navigate(-1)}>
				<IoIosArrowBack className='post__header-btn' />
			</button>
		</div>
	);
};

export default PostHeader;
