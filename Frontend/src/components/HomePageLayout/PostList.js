import PostCard from "../Card/postCard";
import { useEffect, useState } from "react";
import { updatePost, deletePost } from "../../services/postService";
import { createLikeForPost, deleteLikeForPost } from "../../services/likeService";
import { createComment, deleteComment } from "../../services/commentService";

const PostList = ({ postList, user }) => {
    const [comments, setComments] = useState([]);
    const [likeCount, setLikeCount] = useState({});
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [modalShow, setModalShow] = useState({});

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(postList);
    }, [postList]);

    useEffect(() => {
        const initialLikedPosts = new Set();
        const initialLikeCount = {};
        posts.forEach(post => {
            const userLiked = post.like_id.some(like => like.user_id._id === user.userId);
            if (userLiked) {
                initialLikedPosts.add(post._id);
            }
            initialLikeCount[post._id] = post.like_id.length;
        });
        setLikedPosts(initialLikedPosts);
        setLikeCount(initialLikeCount);
    }, [posts, user.userId]);

    const handleUpdatePost = async (postId, updatedPost) => {
        try {
            await updatePost(postId, updatedPost);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    const handleAddComment = (post_id, notification) => {
        const post = posts.find(post => post._id === post_id);
        const updatedPost = { ...post, comment_id: [...post.comment_id, notification] };
        setPosts(prevPosts => prevPosts.map(p => p._id === updatedPost._id ? updatedPost : p));
    };

    const handleDeleteComment = (post_id, comment_id) => {
        const post = posts.find(post => post._id === post_id);
        const updatedPost = { ...post, comment_id: post.comment_id.filter(c => c._id !== comment_id) };
        setPosts(prevPosts => prevPosts.map(p => p._id === updatedPost._id ? updatedPost : p));
    };

    const handleLikeToggle = async (postData) => {
        try {
            const postId = postData._id;
            if (likedPosts.has(postId)) {
                await deleteLikeForPost(user.userId, postId);
                setLikedPosts(prev => {
                    const newLikedPosts = new Set(prev);
                    newLikedPosts.delete(postId);
                    return newLikedPosts;
                });
                setLikeCount(prevCount => ({
                    ...prevCount,
                    [postId]: prevCount[postId] - 1
                }));
            } else {
                await createLikeForPost(user, postData);
                setLikedPosts(prev => new Set(prev).add(postId));
                setLikeCount(prevCount => ({
                    ...prevCount,
                    [postId]: prevCount[postId] + 1
                }));
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            setPosts(posts.filter(post => post._id !== postId));
            await deletePost(postId);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleCommentSubmit = async (event, post, comment) => {
        event.preventDefault();
        if (comment.trim() !== "") {
            try {
                const createdComment = await createComment(comment, post, user);
                setComments([...comments, createdComment]);
                const commentData = {
                    post_id: createdComment.post_id,
                    content: comment,
                    user_id: {
                        _id: user.userId,
                        fullName: user.fullName
                    },
                    _id: createdComment._id
                }
                handleAddComment(createdComment.post_id, commentData);
            } catch (error) {
                console.error("Error creating comment:", error);
            }
        }
    };

    const handleModalShow = (postId, show) => {
        setModalShow((prevModalShow) => ({
            ...prevModalShow,
            [postId]: show
        }));
    };

    const HandleDeleteComment = async (event, comment) => {
        event.preventDefault();
        setComments((prevComments) => prevComments.filter((c) => c._id !== comment._id));
        handleDeleteComment(comment.post_id, comment._id);
        await deleteComment(comment._id);
    };

    return (
        <div>
            {posts.map((post, index) => (
                <PostCard
                    key={index}
                    post={post}
                    user={user}
                    isLiked={likedPosts.has(post._id)}
                    onUpdate={handleUpdatePost}
                    onLikeToggle={handleLikeToggle}
                    onDeletePost={handleDeletePost}
                    onCommentSubmit={handleCommentSubmit}
                    likeCount={likeCount[post._id] || 0}
                    modalShow={modalShow[post._id] || false}
                    setModalShow={handleModalShow}
                    onDeleteComment={HandleDeleteComment}
                />
            ))}
        </div>
    );
};

export default PostList;