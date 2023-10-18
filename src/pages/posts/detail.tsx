import Loader from "Components/loader/Loader";
import PostBox from "Components/posts/PostBox";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostProps } from "type";
import { IoIosArrowBack } from "react-icons/io";

const PostDetail = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [post, setPost] = useState<PostProps | null>(null);

	const getPost = useCallback(async () => {
		if (params.id) {
			const docRef = doc(db, "posts", params.id);
			const docSnap = await getDoc(docRef);

			setPost({ ...(docSnap.data() as PostProps), id: docSnap?.id });
		}
	}, [params.id]);

	useEffect(() => {
		if (params.id) {
			getPost();
		}
	}, [getPost, params.id]);

	return (
		<div className='post'>
			<div className='post__header'>
				<button type='button' onClick={() => navigate(-1)}>
					<IoIosArrowBack className='post__header-btn' />
				</button>
			</div>
			{post ? <PostBox post={post} /> : <Loader />}
		</div>
	);
};

export default PostDetail;
