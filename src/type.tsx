import { ReactNode } from "react";

export interface LayoutProps {
	children: ReactNode;
}

export interface PostProps {
	id: string;
	email: string;
	content: string;
	createdAt: string;
	uid: string;
	profileUrl?: string;
	likesCount?: number;
	comments?: any;
	hashTags?: string[];
	imageUrl?: string;
}

export interface PostBoxProps {
	post: PostProps;
}

// auth
export interface RouterProps {
	isAuthenticated: boolean;
}
