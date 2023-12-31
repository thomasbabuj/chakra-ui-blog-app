import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
import { Descendant, Node } from "slate";

export enum PostStatus {
  PUBLISHED = "published",
  DRAFT = "draft",
}

export type PostBody = {
  type: string;
  children: Node[];
  videoId?: string;
};

export type Post = {
  id?: string;
  creatorId: string;
  creatorDisplayName: string;
  slug: string;
  title: string;
  shortDescription?: string;
  body: PostBody[];
  numberOfComments: number;
  voteStatus: number;
  imageUrl?: string;
  createdAt: Timestamp;
  status: PostStatus;
};

export type PostVote = {
  id: string;
  postId: string;
  voteValue: number;
};

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  postVotes: PostVote[];
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
