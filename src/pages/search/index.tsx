import PostBox from "Components/posts/PostBox";
import AuthContext from "context/AuthContext";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useContext, useEffect, useState } from "react";
import { PostProps } from "type";

const Search = () => {
	const { user } = useContext(AuthContext);
	const [posts, setPosts] = useState<PostProps[]>([]);
	const [tagQuery, setTagQuery] = useState<string>("");

	const onChange = (e: any) => {
		// 스페이스바 무시
		setTagQuery(e?.target?.value?.trim());
	};

	useEffect(() => {
		if (user) {
			let postsRef = collection(db, "posts");
			let postsQuery = query(
				postsRef,
				where("hashTags", "array-contains-any", [tagQuery]),
				orderBy("createdAt", "desc")
			);

			onSnapshot(postsQuery, (snapShot) => {
				let dataObj = snapShot?.docs?.map((doc) => ({
					...doc?.data(),
					id: doc?.id,
				}));

				setPosts(dataObj as PostProps[]);
			});
		}
	}, [tagQuery, user]);

	return (
		<div className='home'>
			<div className='home__top'>
				<div className='home__title'>
					<div className='home__title-text'>Search</div>
				</div>
				<div className='home__search-div'>
					<input className='home__search' placeholder='해시태그 검색' onChange={onChange} />
				</div>
			</div>
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
	);
};

export default Search;
