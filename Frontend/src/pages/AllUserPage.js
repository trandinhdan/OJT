import React from "react";
import { useLoaderData } from "react-router-dom";
import AllUserPageLayout from '../components/AllUserPageLayout/AllUserPageLayout';
import store from '../store';
import { fetchAllUsersExceptCurrentThunk } from '../features/users/userThunk';
import userService from '../services/userService';
import { getFriendRequestsSentByUserId, getAllFriendsWithUserId} from '../services/friendService';
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : null;

function AllUserPage() {
    const data = useLoaderData();
    // console.log("Data: ", user);
    // console.log("Data: ", data.userData);
    return (
        <AllUserPageLayout users={data.userData} currentUser={user} requestList={data.requestList} friendList={data.friendList}/>
    );
}

export default AllUserPage;

export async function AllUserPageLoader() {
    try {
        const [users, requestList, friendList] = await Promise.all([store.dispatch(fetchAllUsersExceptCurrentThunk(user.userId)), getFriendRequestsSentByUserId(user.userId), getAllFriendsWithUserId(user.userId)]);
        return {
            userData: users.payload || null,
            requestList: requestList,
            friendList: friendList
        };
    } catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
}