import { PostProps } from "type";
import { FiImage } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";

const posts: PostProps[] = [
	{ id: "1", email: "test@example.com", content: "content", createdAt: "2021-01-01", uid: "1" },
	{ id: "2", email: "test@example.com", content: "content", createdAt: "2021-01-02", uid: "2" },
	{ id: "3", email: "test@example.com", content: "content", createdAt: "2021-01-03", uid: "3" },
	{ id: "4", email: "test@example.com", content: "content", createdAt: "2021-01-04", uid: "4" },
];

const handleFileUpload = () => {};
const handleDelete = () => {};

export const HomePage = () => {
	return (
		<div>
			<div className='home'>
				<div className='home__title'>Home</div>
				<div className='home__tabs'>
					<div className='home__tab home__tab--active'>For You</div>
					<div className='home__tab '>Following</div>
				</div>

				{/* Post Form */}
				<form className='post-form'>
					<textarea
						className='post-form__textarea'
						required
						name='content'
						placeholder='What ist happening'
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

				{/* Tweet Posts */}
				<div className='post'>
					{posts?.map((post) => (
						<div className='post-box' key={post.id}>
							<Link to={`/posts/${post.id}`}>
								<div className='post__box-profile'>
									<div className='post__flex'>
										{post?.profileUrl ? (
											<img
												src={post?.profileUrl}
												alt='pofile'
												className='post__box-profile-img'
											/>
										) : (
											<FaUserCircle className='post__box-profile-icon' />
										)}
										<div className='post__emial'>{post?.email}</div>
										<div className='post__createdAt'>{post?.createdAt}</div>
									</div>
									<div className='post__box-content'>{post?.content}</div>
								</div>
							</Link>
							<div className='post__box-footer'>
								{/* post.uid === user.uid */}
								<>
									<button type='button' className='post__delete' onClick={handleDelete}>
										Delete
									</button>
									<button type='button' className='post__edit'>
										<Link to={`/posts/edit/${post.id}`}>Edit</Link>
									</button>
									<button type='button' className='post__comment'>
										<FaRegComment />
										{post?.comments?.length || 0}
									</button>
									<button type='button' className='post__likes'>
										<AiFillHeart />
										{post?.likesCount || 0}
									</button>
								</>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
