import { authModalState } from "@/atoms/authModalAtom";
import { Post, PostVote, postState } from "@/atoms/postsAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { withRouter } from "next/router";

const usePosts = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const setAuthModalState = useSetRecoilState(authModalState);

  const onVote = async (post: Post, vote: number) => {
    // check for a user => if not, open auth modal
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    try {
      const { voteStatus } = post;
      const existingVote = postStateValue.postVotes.find(
        (vote) => vote.postId === post.id
      );

      const batch = writeBatch(firestore);
      // taking copy of the status and update the copy first and apply the change to state
      const updatePost = { ...post };
      const updatedPosts = [...postStateValue.posts];
      let updatedPostVotes = [...postStateValue.postVotes];

      let voteChange = vote;

      if (!existingVote) {
        // create a new postVote document
        const postVoteRef = doc(
          collection(firestore, "users", `${user?.uid}/postVotes`)
        );

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          voteValue: vote, // 1 or -1
        };

        batch.set(postVoteRef, newVote);

        // add /subtract 1 to/from post.voteStatus
        updatePost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      } else {
        // Existing vote  - user have voted on the post before

        const postVoteRef = doc(
          firestore,
          "users",
          `${user?.uid}/postVotes/${existingVote.id}`
        );

        //Removing the vote
        if (existingVote.voteValue === vote) {
          // add /subtract 1 to/from post.voteStatus
          voteChange *= -1;
          updatePost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id
          );
          // deleting a postVote document
          batch.delete(postVoteRef);
        } else {
          // Flipping the vote
          // add /subtract 2 to/from post.voteStatus
          voteChange = 2 * vote;
          updatePost.voteStatus = voteStatus + 2 * vote;

          const voteIdx = postStateValue.postVotes.findIndex(
            (vote) => vote.id === existingVote.id
          );

          if (voteIdx !== -1) {
            updatedPostVotes[voteIdx] = {
              ...existingVote,
              voteValue: vote,
            };
          }

          // update the existing postVote document
          batch.update(postVoteRef, {
            voteValue: vote,
          });
        }
      }

      // update our post document
      let updatedState = { ...postStateValue, updatedPostVotes };
      const postIdx = postStateValue.posts.findIndex(
        (item) => item.id === post.id
      );

      updatedPosts[postIdx] = updatePost;

      updatedState = {
        ...updatedState,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      };

      if (postStateValue.selectedPost) {
        updatedState.selectedPost = updatePost;
      }

      setPostStateValue(updatedState);

      const postRef = doc(firestore, "posts", post.id!);
      batch.update(postRef, { voteStatus: voteStatus + voteChange });

      await batch.commit();
    } catch (error: any) {
      console.log("OnVote error ", error.message);
    }
  };
  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      // Check if post has any image then delete
      if (post.imageUrl) {
        const imageRef = ref(storage, `posts/${post.id!}/image`);
        await deleteObject(imageRef);
      }

      // delete post document from firestore
      const postDocRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postDocRef);

      // update recoil state
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));
      return true;
    } catch (error) {
      return false;
    }
  };
  const onSelectPost = (post: Post) => {
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: post,
    }));

    router.push(`posts/${post.id}`);
  };

  const getPostVotes = async () => {
    const postsVotesQuery = query(
      collection(firestore, "users", `${user?.uid}/postVotes`)
    );

    const postVotesDocs = await getDocs(postsVotesQuery);
    const postVotes = postVotesDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPostStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }));
  };

  const getAPost = async (postId: string) => {
    const postDocRef = doc(firestore, "posts", postId);
    const postDoc = await getDoc(postDocRef);

    return postDoc;
  };

  useEffect(() => {
    if (!user) {
      // Clear post userPostVotes
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    }
    getPostVotes();
  }, [user]);

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
    getAPost,
  };
};
export default usePosts;
