import React from "react";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./FriendRequestPageLayout.module.css";
import FriendRequestCard from "../Card/FriendRequestCard";
import { updateFriendStatus } from "../../services/friendService";


function FriendRequestList({ requests, userId }) {
    const [ListFriend, setListFriend] = useState(new Set());

    useEffect(() => {
        const initialIsFriend = new Set();
        requests.forEach(request => {
            initialIsFriend.add(request.user_id._id);
        });
        setListFriend(initialIsFriend);
        console.log("FriendRequestList(ListFriend): ", ListFriend);
    }, [userId]);


    const handleSetFriendRequestStatus = async (friendId, status) => {
        try {
            const form = {
                user_id: friendId,
                friend_id: userId,
                status: status
            }
            await updateFriendStatus(form);
            setListFriend(prev => {
                const listFriend = new Set(prev);
                listFriend.delete(friendId);
                return listFriend;
            });
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };

    return (
        <div>
            <Container>
                <div className={styles.container}>
                    {requests.map((request) => (
                        <FriendRequestCard request={request} key={request.user_id._id}
                        onSetFriendRequestStatus={handleSetFriendRequestStatus}
                        isFriend={ListFriend.has(request.user_id._id)}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default FriendRequestList;