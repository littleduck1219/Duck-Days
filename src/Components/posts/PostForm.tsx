import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";

const PostForm = () => {
	const handleFileUpload = () => {};
	const [content, setContent] = useState<string>("");
	const { user } = useContext(AuthContext);

	const onSubmit = async (e: any) => {
		e.preventDefault();

		try {
			await addDoc(collection(db, "posts"), {
				content: content,
				createdAt: new Date()?.toLocaleDateString("ko", {
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				}),
				uid: user?.uid,
				email: user?.email,
			});
			setContent("");
			toast.success("게시글이 작성되었습니다.");
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

export default PostForm;
