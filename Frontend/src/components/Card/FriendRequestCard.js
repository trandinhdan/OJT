import React from "react";
import { Form } from "react-bootstrap";
import styles from "../AllUserPageLayout/AllUserPageLayout.module.css";

function FriendRequestCard({ request, onSetFriendRequestStatus, isFriend, userId }) {
    return (
        <div>
            {isFriend ? (
                <Form>
                    <div key={request.user_id._id}>
                        <div>
                            <div>
                                {/* <img src={friend.user_id.profilePicture} alt="User" /> */}
                            </div>
                            <div>
                                <h3>{request.user_id.fullName}</h3>
                                <p>{request.user_id.email}</p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => onSetFriendRequestStatus(request.user_id._id, "accepted")}
                                >
                                    Accept
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onSetFriendRequestStatus(request.user_id._id, "rejected")}
                                >
                                    Reject
                                </button>
                            </div>

                        </div>
                    </div>
                </Form>
            ) : null}

        </div>
    );
}

export default FriendRequestCard;