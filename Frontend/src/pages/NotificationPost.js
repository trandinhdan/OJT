import React, { useState, useEffect} from "react";
import PostList from "../components/HomePageLayout/PostList";
import { useLoaderData} from "react-router-dom";
import { getPostById } from "../services/postService";
import { jwtDecode } from "jwt-decode";
function NotificationPostPage() {
    const data = useLoaderData();
    const [postDataArray, setPostDataArray] = useState([]);
    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token) : null;

    useEffect(() => {
        const fetchData = async () => {
            const updatedPostDataArray = [...postDataArray];
            updatedPostDataArray.push(data.postData);
            setPostDataArray(updatedPostDataArray);
        };
        fetchData();
    }, []);

    if (data.commentId) {
        return (
            <PostList postList={postDataArray} commentId={data.commentId} user={user}/>
        );
    }
    else {
        return (
            <PostList postList={postDataArray} user={user}/>
        );
    }
}



export async function NotificationPostPageLoader(params) {

    try {
        const postId = params.params.postId
        const commentId = params.params.commentId
        const postData = await getPostById(postId);
        return {
            postData,
            commentId
        };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null; // Trả về null nếu có lỗi xảy ra
    }
}

export default NotificationPostPage;