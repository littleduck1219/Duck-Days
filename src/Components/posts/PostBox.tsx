import React, { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { PostBoxProps } from "type";
import AuthContext from "context/AuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { storage } from "firebaseApp";

const PostBox = ({ post }: PostBoxProps) => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleDelete = async () => {
		const confirm = window.confirm("게시글을 삭제하시겠습니까?");
		if (confirm) {
			const imageRef = ref(storage, post?.imageUrl);

			if (post?.imageUrl) {
				deleteObject(imageRef).catch((error) => {
					console.log(error);
				});
			}

			await deleteDoc(doc(db, "posts", post.id));
			toast.success("게시글이 삭제 되었습니다.");
			navigate("/");
		}
	};

	return (
		<div>
			<div className='post__box' key={post.id}>
				<Link to={`/posts/${post.id}`}>
					<div className='post__box-profile'>
						<div className='post__flex'>
							{post?.profileUrl ? (
								<img src={post?.profileUrl} alt='pofile' className='post__box-profile-img' />
							) : (
								<FaUserCircle className='post__box-profile-icon' />
							)}
							<div className='post__email'>{post?.email}</div>
							<div className='post__createdAt'>{post?.createdAt}</div>
						</div>
						<div className='post__box-content'>{post?.content}</div>
						{post?.imageUrl && (
							<div className='post__image-div'>
								<img
									src={post?.imageUrl}
									alt='post-img'
									className='post_image'
									width={100}
									height={100}
								/>
							</div>
						)}
						<div className='post-form__hashtags-outputs'>
							{post?.hashTags?.map((tag, index) => (
								<span className='post-form__hashtags-tag' key={index}>
									#{tag}
								</span>
							))}
						</div>
					</div>
				</Link>
				<div className='post__box-footer'>
					{user?.uid === post?.uid && (
						<>
							<button type='button' className='post__delete' onClick={handleDelete}>
								Delete
							</button>
							<button type='button' className='post__edit'>
								<Link to={`/posts/edit/${post.id}`}>Edit</Link>
							</button>
						</>
					)}
					<>
						<button type='button' className='post__likes'>
							<AiFillHeart />
							{post?.likesCount || 0}
						</button>
						<button type='button' className='post__comment'>
							<FaRegComment />
							{post?.comments?.length || 0}
						</button>
					</>
				</div>
			</div>
		</div>
	);
};

export default PostBox;
