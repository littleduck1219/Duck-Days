import React from "react";
import { FiImage } from "react-icons/fi";

const PostForm = () => {
	const handleFileUpload = () => {};
	return (
		<div>
			<form className='post-form'>
				<textarea className='post-form__textarea' required name='content' placeholder='What ist happening' />
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
