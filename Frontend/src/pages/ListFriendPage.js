import React from "react";
import { useLoaderData } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FriendListPageLayout from "../components/ListFriendPageLayout/FriendListPageLayout";
import { getAllFriendsByUserId } from "../services/friendService";
const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : null;

const ListFriendPage = () => {
    const data = useLoaderData();
    console.log("ListFriendPage: ", data);
    return (
        <FriendListPageLayout friends={data} />
    );
}

export default ListFriendPage;

export async function ListFriendPageLoader() {
    try {
        const result = await getAllFriendsByUserId(user.userId);

        return result;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
}