import React from "react";
import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import styles from "./AllUserPageLayout.module.css";
import UserCard from "../Card/userCard";
import {
    createFriendRequest,
    friendCheck,
    deleteFriendRequest,
    deleteFriend,
    updateFriendStatus
} from "../../services/friendService";
import Category from "../Layout/Category";
import Trending from "../Layout/Trending";
import NavBar from "../Layout/NavBar";
import CreatePost from "../HomePageLayout/CreatePost";
import PostList from "../HomePageLayout/PostList";

function UserList({users, currentUser, requestList, friendList}) {

    // list of request sent by user
    const [ListRequestFrom, setListRequestFrom] = useState(new Set());
    // list of request sent to user
    const [ListRequestTo, setListRequestTo] = useState(new Set());
    // list of friends of user
    const [ListFriend, setListFriend] = useState(new Set());

    useEffect(() => {
        const ListRequestFrom = new Set();
        const ListRequestTo = new Set();
        const ListFriend = new Set();

        friendList.forEach(friend => {
            // list of friends request sent from user
            if (friend.user_id._id === currentUser.userId && friend.status === "requested") {
                ListRequestFrom.add(friend.friend_id._id);
            }
            // list of friends request sent to user
            else if (friend.friend_id._id === currentUser.userId && friend.status === "requested") {
                ListRequestTo.add(friend.user_id._id);
            }
            // list of friends of user
            else if (friend.user_id._id === currentUser.userId && friend.status === "accepted") {
                ListFriend.add(friend.friend_id._id);
            } else if (friend.friend_id._id === currentUser.userId && friend.status === "accepted") {
                ListFriend.add(friend.user_id._id);
            }
        })
        setListRequestTo(ListRequestTo);
        setListRequestFrom(ListRequestFrom);
        setListFriend(ListFriend);
    }, [currentUser.userId]);

    // handle for sending friend request
    const handleSentFriendRequest = async (friendId) => {
        try {
            const form = {
                user_id: currentUser.userId,
                friend_id: friendId,
                user_fullName: currentUser.fullName
            }
            if (ListRequestFrom.has(friendId)) {
                await deleteFriendRequest(form);
                setListRequestFrom(prev => {
                    const ListRequestFrom = new Set(prev);
                    ListRequestFrom.delete(friendId);
                    return ListRequestFrom;
                });

            } else {
                await createFriendRequest(form);
                setListRequestFrom(prev => new Set(prev).add(friendId));
            }
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };

    // handle for unfriend
    const handleUnfriend = async (friendId) => {
        try {
            const form = {
                user_id: currentUser.userId,
                friend_id: friendId
            }
            if (ListFriend.has(friendId)) {
                await deleteFriend(form);
                setListFriend(prev => {
                    const ListFriend = new Set(prev);
                    ListFriend.delete(friendId);
                    return ListFriend;
                });
            }
        } catch (error) {
            console.error("Error unfriending:", error);
        }
    };

    const handleFriendRequest = async (friendId, status) => {
        try {
            const form = {
                user_id: friendId,
                friend_id: currentUser.userId,
                status: status,
                friend_fullName: currentUser.fullName
            }
            console.log("form: ", form)
            if (status === "rejected") {
                await deleteFriendRequest(form);
            } else {
                await updateFriendStatus(form);
                setListFriend(prev => new Set(prev).add(friendId));
            }
            setListRequestTo(prev => {
                const ListRequestTo = new Set(prev);
                ListRequestTo.delete(friendId);
                return ListRequestTo;
            });
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };

    return (
        <div>
            <Container>
                <div className={styles.container}>
                    {users.map((user) => (
                        <UserCard friend={user} key={currentUser._id}
                                  onSentFriendRequest={handleSentFriendRequest}
                                  onUnfriend={handleUnfriend}
                                  onFriendRequest={handleFriendRequest}
                                  isRequestFrom={ListRequestFrom.has(user._id)}
                                  isFriend={ListFriend.has(user._id)}
                                  isRequestTo={ListRequestTo.has(user._id)}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default UserList;