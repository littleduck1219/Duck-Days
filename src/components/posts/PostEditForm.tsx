import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useCallback, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostProps } from "type";

const PostEditForm = () => {
	const handleFileUpload = () => {};
	const params = useParams();
	const [post, setPost] = useState<PostProps | null>(null);
	const [content, setContent] = useState<string>("");
	const navigate = useNavigate();
	console.log(params);

	const getPost = useCallback(async () => {
		if (params.id) {
			const docRef = doc(db, "posts", params.id);
			const docSnap = await getDoc(docRef);
			setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
			setContent(docSnap?.data()?.content);
		}
	}, [params.id]);

	const onSubmit = async (e: any) => {
		e.preventDefault();

		try {
			if (post) {
				const postRef = doc(db, "posts", post?.id);
				await updateDoc(postRef, { content });
			}
			navigate(`/posts/${post?.id}`);
			toast.success("게시글이 수정되었습니다.");
		} catch (e: any) {
			setContent("");
			toast.error("게시글이 작성실패하였습니다.");
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const {
			target: { name, value },
		} = e;

		if (name === "content") {
			setContent(value);
		}
	};

	useEffect(() => {
		if (params.id) {
			getPost();
		}
	}, [getPost, params.id]);

	return (
		<div>
			<form className='post-form' onSubmit={onSubmit}>
				<textarea
					className='post-form__textarea'
					required
					name='content'
					placeholder='What ist happening'
					onChange={onChange}
					value={content}
				/>
				<div className='post-form__submit-area'>
					<label htmlFor='file-input' className='post-form__file'>
						<FiImage className='post-form__file-icon' />
					</label>
					<input
						type='file'
						name='file-input'
						accept='image/*'
						onChange={handleFileUpload}
						className='hidden'
					/>
					<input type='submit' value='Tweet' className='post-form__submit-btn' />
				</div>
			</form>
		</div>
	);
};

export default PostEditForm;
