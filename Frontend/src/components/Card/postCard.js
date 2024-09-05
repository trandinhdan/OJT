import React, { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styles from "./postCard.module.css";
import ShowComment from "./showComment";
import { format } from "date-fns";
import FriendsDropdown from "../Card/FriendDropDown";
import { getAllFriendsToTag } from "../../services/friendService";
import { createTag } from "../../services/tagService";

const PostCard = ({
    post,
    user,
    isLiked,
    onUpdate,
    onLikeToggle,
    onDeletePost,
    onCommentSubmit,
    likeCount,
    modalShow,
    setModalShow,
    onDeleteComment
}) => {
    const likedUsers = post.like_id.map((like) => like.user_id.fullName);
    const displayLikedUsers =
        likedUsers.length > 1
            ? `${likedUsers[0]} and ${likedUsers.length - 1} others`
            : likedUsers[0];

    const displayedComments = post.comment_id.slice(0, 3);
    const showAllComments = post.comment_id.length > 3;
    const [editMode, setEditMode] = useState(false);
    const [newContent, setNewContent] = useState(post.content);
    const [currentPost, setCurrentPost] = useState(post);
    const [comment, setComment] = useState("");
    const [friends, setFriends] = useState([]);
    const [showFriendsDropdown, setShowFriendsDropdown] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    const handleCommentChange = async (event) => {
        const text = event.target.value;
        setComment(text);

        if (text.includes('@')) {
            try {
                const allFriends = await getAllFriendsToTag(user.userId);
                const filteredFriends = [];

                allFriends.forEach(friend => {
                    if (friend.user_id._id === user.userId) {
                        filteredFriends.push(friend.friend_id);
                    } else if (friend.friend_id._id === user.userId) {
                        filteredFriends.push(friend.user_id);
                    }
                });

                setFriends(filteredFriends);
                setShowFriendsDropdown(true);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        } else {
            setShowFriendsDropdown(false);
        }
    };

    const handleFriendSelect = (friend) => {
        setSelectedFriend(friend);
        setComment(`${comment}${friend.fullName} `);
        setShowFriendsDropdown(false);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     onCommentSubmit(event, post, comment);
    //     setComment(""); // Clear the textarea after submit
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        onCommentSubmit(event, post, comment);
        const mentionRegex = /@(\w+)/g;
        const mentions = [];
        let match;
        while ((match = mentionRegex.exec(comment)) !== null) {
            mentions.push(match[1]);
        }
        for (const mentionedUser of mentions) {
            await createTag({ user_id: selectedFriend._id, post_id: post._id, tagged_by: user });
        }
        setComment("");
    };

    useEffect(() => {
        setCurrentPost(post);
    }, [post]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedPost = await onUpdate(post._id, { content: newContent });
            setEditMode(false);
            setNewContent(updatedPost.content);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        setNewContent(e.target.value);
        setCurrentPost({ ...currentPost, content: e.target.value });
    };

    return (
        <div className={styles["post-card"]}>
            <div className={styles["post-heading"]}>
                <img className={styles["post-avatar"]} src={"./img/avaImg/ava.jpg"} alt={"Avatar"} />
                <div className={styles["post-user"]}>
                    <h4 className={styles["post-fullname"]}>{post.user_id.fullName}</h4>
                    <div className={styles["post-time"]}>{format(new Date(post.createdAt), 'dd/MM/yyyy - HH:mm')}</div>
                </div>
            </div>

            <div className={styles["post-content"]}>
                {editMode ? (
                    <Form onSubmit={handleUpdate}>
                        <Form.Control
                            as="textarea"
                            value={newContent}
                            onChange={handleInputChange}
                            rows={3}
                        />
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                        <Button variant="secondary" onClick={() => setEditMode(false)}>
                            Cancel
                        </Button>
                    </Form>
                ) : (
                    <p>{currentPost.content}</p>
                )}
            </div>

            {post.image_url && (
                <div className={styles["post-heading"]}>
                    <img
                        src={post.image_url}
                        alt="Post Image"
                        className={styles["post-image"]}
                    />
                </div>
            )}

            {post.user_id._id === user.userId && !editMode && (
                <div className={styles["post-button-container"]}>
                    <Button variant="outline-primary" onClick={() => setEditMode(true)}>
                        Edit
                    </Button>
                    <Button variant="outline-danger" onClick={() => onDeletePost(post._id)}>
                        Delete
                    </Button>
                </div>
            )}

            <div className={styles["post-button-container"]}>
                <div className={styles["left-column"]}>
                    <Button
                        variant={isLiked ? "danger" : "outline-danger"}
                        className={styles["like-button"]}
                        onClick={() => onLikeToggle(post)}
                    >
                        Like{" "}
                        <Badge bg={"danger"} className={styles["like-badge"]}>
                            {likeCount}
                        </Badge>
                    </Button>

                    <div className={styles["like-container"]}>
                        {displayLikedUsers && (
                            <div className={styles["like-users"]}>
                                <strong>{displayLikedUsers}</strong>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles["right-column"]}>
                    <Button
                        variant="outline-primary"
                        onClick={() => setModalShow(post._id, true)}
                    >
                        <Badge bg={"primary"} className={styles["like-badge"]}>
                            {post.comment_id.length}
                        </Badge>{" "}
                        Comment
                    </Button>
                </div>
            </div>

            <div className={styles["comment-container"]}>
                {showAllComments && (
                    <Button
                        variant="link"
                        className={styles["show-all-comments"]}
                        onClick={() => setModalShow(post._id, true)}
                    >
                        <strong>All comments</strong>
                    </Button>
                )}
                {displayedComments.map((comment, index) => (
                    <div key={index} className={styles["comment-box"]}>
                        <h5 style={{ margin: "0", fontWeight: "bold", fontSize: "16px" }}>
                            {comment.user_id.fullName}
                        </h5>
                        <p
                            style={{
                                margin: "5px 0 0 0",
                                fontSize: "14px",
                                lineHeight: "1.5",
                            }}
                        >
                            {comment.content}
                        </p>
                    </div>
                ))}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formComment">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment"
                            style={{ marginBottom: "10px" }}
                        />
                        {showFriendsDropdown && (
                            <FriendsDropdown friends={friends} onSelect={handleFriendSelect} />
                        )}
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Post Comment
                    </Button>
                </Form>
            </div>
            <ShowComment
                show={modalShow}
                userId={user.userId}
                onHide={() => setModalShow(post._id, false)}
                comments={post.comment_id || []}
                onDeleteComment={onDeleteComment}
            />
        </div>
    );
};

export default PostCard;
