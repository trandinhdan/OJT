import React from "react";
import ProfileLayout from "../components/ProfilePageLayout/ProfileLayout";
import { getUserById } from "../services/userService";
import { useLoaderData} from "react-router-dom";
import { getPostByUserID } from "../services/postService";

function ProfilePage() {
    const data = useLoaderData();
    return (
        <ProfileLayout profile={data.userData} postList={data.postData} />
    );
}

export async function profileLoader(params) {
    const userId = params.params.userId;
    try {
        const [userData, postData] = await Promise.all([getUserById(userId), getPostByUserID(userId)]);
        return {
            userData: userData,
            postData: postData
        };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null; // Trả về null nếu có lỗi xảy ra
    }
}

export default ProfilePage;