import { PostProps } from "type";
import PostForm from "Components/posts/PostForm";
import PostBox from "Components/posts/PostBox";
import { useContext, useEffect, useState } from "react";
import AuthContext from "context/AuthContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "firebaseApp";

const HomePage = () => {
	const [posts, setPosts] = useState<PostProps[]>([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (user) {
			let postsRef = collection(db, "posts");
			let postsQuery = query(postsRef, orderBy("createdAt", "desc"));

			onSnapshot(postsQuery, (snapShot) => {
				let dataObj = snapShot.docs.map((doc) => ({
					...doc.data(),
					id: doc?.id,
				}));
				setPosts(dataObj as PostProps[]);
			});
		}
	}, []);

	return (
		<div>
			<div className='home'>
				<div className='home__top'>
					<div className='home__title'>Home</div>
					<div className='home__tabs'>
						<div className='home__tab home__tab--active'>For You</div>
						<div className='home__tab '>Following</div>
					</div>
				</div>

				<PostForm />
				{/* Tweet Posts */}
				<div className='post'>
					{posts?.length > 0 ? (
						posts.map((post) => <PostBox post={post} key={post.id} />)
					) : (
						<div className='post__no-posts'>
							<div className='posts__text'>게시글이 존재하지 않습니다.</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
