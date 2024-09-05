import React from "react";
import { Modal } from "react-bootstrap";
import styles from "./ShowComment.module.css";

function ShowComment({ show, onHide, comments, userId, onDeleteComment }) {
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles["modal-body"]}>
                {comments.map((comment, index) => (
                    <div key={index} className={styles["comment-container"]}>
                        <h5 className={styles["comment-user"]}>{comment.user_id.fullName}</h5>
                        <p className={styles["comment-content"]}>{comment.content}</p>
                        {comment.user_id._id.includes(userId) && (
                            <button onClick={(event) => onDeleteComment(event, comment)}>Delete</button>
                        )}
                    </div>
                ))}
            </Modal.Body>
        </Modal>
    );
}

export default ShowComment;
