import React from "react";
import { Form } from "react-bootstrap";
import styles from "../ListFriendPageLayout/ListFriendPageLayout.module.css";

function FriendListCard({friend}) {
    return (
        <div>
            <Form>
                <div className={styles.card} key={friend._id}>
                    <div className={styles.cardContent}>
                        <div className={styles.cardImage}>
                            <img src={friend.profilePicture} alt="User" />
                        </div>
                        <div className={styles.cardText}>
                            <h3>{friend.user_id.fullName}</h3>
                            <p>{friend.user_id.email}</p>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default FriendListCard;