import React from "react";
import { useLoaderData } from "react-router-dom";
import store from '../store';
import { getFriendRequestsByUserId } from '../services/friendService';
import  FriendRequestPageLayout  from '../components/FriendRequestPageLayout/FriendRequestPageLayout';
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : null;

function FriendRequestPage() {
    const data = useLoaderData();
    return (
        <FriendRequestPageLayout requests={data} userId={user.userId} />
    );
}

export default FriendRequestPage;

export async function FriendRequestPageLoader() {
    try {
        const result = await getFriendRequestsByUserId(user.userId);
        return result;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
}