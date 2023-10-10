import { PostProps } from "type";

import MenuList from "Components/Menu";
import PostForm from "Components/posts/PostForm";
import PostBox from "Components/posts/PostBox";

const posts: PostProps[] = [
	{ id: "1", email: "test@example.com", content: "content", createdAt: "2021-01-01", uid: "1" },
	{ id: "2", email: "test@example.com", content: "content", createdAt: "2021-01-02", uid: "2" },
	{ id: "3", email: "test@example.com", content: "content", createdAt: "2021-01-03", uid: "3" },
	{ id: "4", email: "test@example.com", content: "content", createdAt: "2021-01-04", uid: "4" },
];

export const HomePage = () => {
	return (
		<div>
			<div className='home'>
				<div className='home__title'>Home</div>
				<div className='home__tabs'>
					<div className='home__tab home__tab--active'>For You</div>
					<div className='home__tab '>Following</div>
				</div>
				<PostForm />
				{/* Tweet Posts */}
				<div className='post'>
					{posts?.map((post) => (
						<PostBox post={post} key={post.id} />
					))}
				</div>
				<MenuList />
			</div>
		</div>
	);
};
