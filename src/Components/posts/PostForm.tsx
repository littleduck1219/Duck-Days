import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebaseApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const PostForm = () => {
	const [content, setContent] = useState<string>("");
	const [hashTag, setHashTag] = useState<string>("");
	const [tags, setTags] = useState<string[]>([]);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [imageFile, setImageFile] = useState<string | null>("");
	const { user } = useContext(AuthContext);

	const handleFileUpload = (e: any) => {
		const {
			target: { files },
		} = e;

		const file = files?.[0];
		const fileReader = new FileReader();
		fileReader?.readAsDataURL(file);

		fileReader.onloadend = (e: any) => {
			const { result } = e?.currentTarget;
			setImageFile(result);
		};
	};

	const onSubmit = async (e: any) => {
		setIsSubmitting(true);
		const key = `${user?.uid}/${uuidv4()}`;
		const storageRef = ref(storage, key);
		e.preventDefault();

		try {
			// 이미지 업로드
			let imageUrl = "";
			if (imageFile) {
				const data = await uploadString(storageRef, imageFile, "data_url");
				imageUrl = await getDownloadURL(data?.ref);
			}

			// url 업데이트
			await addDoc(collection(db, "posts"), {
				content: content,
				createdAt: new Date()?.toLocaleDateString("ko", {
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				}),
				uid: user?.uid,
				email: user?.email,
				hashTags: tags,
				imageUrl,
			});
			setTags([]);
			setHashTag("");
			setContent("");
			setIsSubmitting(false);
			setImageFile(null);
			toast.success("게시글이 작성되었습니다.");
		} catch (e: any) {
			setTags([]);
			setHashTag("");
			setContent("");
			setIsSubmitting(false);
			setImageFile(null);
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

	const handleDeleteImage = () => {
		setImageFile(null);

		const fileInput = document.getElementById("file-input") as HTMLInputElement;
		if (fileInput) {
			fileInput.value = "";
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
					<div className='post-form__image-area'>
						<label htmlFor='file-input' className='post-form__file'>
							<FiImage className='post-form__file-icon' />
						</label>
						<input
							type='file'
							name='file-input'
							id='file-input'
							accept='image/*'
							onChange={handleFileUpload}
							className='hidden'
						/>
						{imageFile && (
							<div className='post-form__attachment'>
								<img src={imageFile} alt='attachment' width={100} height={100} />
								<button className='post-form__clear-btn' type='button' onClick={handleDeleteImage}>
									Clear
								</button>
							</div>
						)}
					</div>

					<input type='submit' value='Tweet' className='post-form__submit-btn' disabled={isSubmitting} />
				</div>
			</form>
		</div>
	);
};

export default PostForm;
