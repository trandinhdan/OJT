import React from "react";
import { Form } from "react-bootstrap";
import styles from "../AllUserPageLayout/AllUserPageLayout.module.css";

function UserCard({ friend, onSentFriendRequest, isRequestFrom, isFriend, isRequestTo, onUnfriend, onFriendRequest }) {
    // console.log("UserCard(friend): ", friend._id);
    return (
        <div>
            <Form>
                <div className={styles.card} key={friend._id}>
                    <div className={styles.cardContent}>
                        <div className={styles.cardImage}>
                            <img src={friend.profilePicture} alt="User" />
                        </div>
                        <div className={styles.cardText}>
                            <h3>{friend.fullName}</h3>
                            <p>{friend.email}</p>
                        </div>

                        {isRequestFrom ? (
                            <div className={styles.cardButton}>
                                <button
                                    type="button"
                                    onClick={() => onSentFriendRequest(friend._id)}
                                >
                                    Unsent
                                </button>
                            </div>
                        ) : null}

                        {isFriend ? (
                            <div className={styles.cardButton}>
                                <button
                                    type="button"
                                    onClick={() => onUnfriend(friend._id)}
                                >
                                    UnFriend
                                </button>
                            </div>
                        ) : null}

                        {isRequestTo ? (
                            <div className={styles.cardButton}>
                                <button
                                    type="button"
                                    onClick={() => onFriendRequest(friend._id, "accepted")}
                                >
                                    Accept
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onFriendRequest(friend._id, "rejected")}
                                >
                                    Reject
                                </button>
                            </div>
                        ) : null}

                        {!isRequestFrom && !isFriend && !isRequestTo && (
                            <div className={styles.cardButton}>
                                <button
                                    type="button"
                                    onClick={() => onSentFriendRequest(friend._id)}
                                >
                                    Add Friend
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </Form>
        </div>
    );
}

export default UserCard;
