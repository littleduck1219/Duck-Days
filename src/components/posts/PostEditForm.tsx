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
	const [hashTag, setHashTag] = useState<string>("");
	const [tags, setTags] = useState<string[]>([]);
	const navigate = useNavigate();

	const getPost = useCallback(async () => {
		if (params.id) {
			const docRef = doc(db, "posts", params.id);
			const docSnap = await getDoc(docRef);
			setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
			setContent(docSnap?.data()?.content);
			setTags(docSnap?.data()?.hashTags);
		}
	}, [params.id]);

	const onSubmit = async (e: any) => {
		e.preventDefault();

		try {
			if (post) {
				const postRef = doc(db, "posts", post?.id);
				await updateDoc(postRef, { content, hashTags: tags });
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

	// 태그입력
	const handleKeyUp = (e: any) => {
		if (e.keyCode === 32 && e.target.value.trim() !== "") {
			if (tags?.includes(e.target.value?.trim())) {
				toast.error("해당 태그가 이미 존재합니다.");
			} else {
				setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
				setHashTag("");
			}
		}
	};

	const onChangeHashTag = (e: any) => {
		setHashTag(e?.target?.value?.trim());
	};

	// 태그를 누르면 태그 삭제
	const removeTag = (tag: string) => {
		setTags(tags?.filter((val) => val !== tag));
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
				<div className='post-form__hashtags'>
					<span className='post-form__hashtags-outputs'>
						{tags?.map((tag, index) => (
							<span className='post-form__hashtags-tag' key={index} onClick={() => removeTag(tag)}>
								#{tag}
							</span>
						))}
					</span>
					<input
						className='post-form__input'
						name='hashtag'
						id='hashtag'
						placeholder='해시태그 + 스페이스바'
						onChange={onChangeHashTag}
						onKeyUp={handleKeyUp}
						value={hashTag}
					/>
				</div>
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
