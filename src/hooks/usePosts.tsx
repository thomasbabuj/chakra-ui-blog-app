import { postState } from "@/atoms/postsAtom";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};
  const onDeletePost = async () => {};
  const onSelectPost = () => {};
  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};
export default usePosts;
