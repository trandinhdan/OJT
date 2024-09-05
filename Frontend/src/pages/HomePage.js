import React from "react";
import { useLoaderData } from "react-router-dom";
import HomePageLayout from '../components/HomePageLayout/HomePageLayout';
import store from '../store';
import { fetchPostsThunk } from '../features/posts/postThunk';
import { jwtDecode } from "jwt-decode";
const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : null;
function HomePage() {
    const data = useLoaderData();
    
    return (
        <HomePageLayout postList={data} user={user}/>
    );
}

export default HomePage;

export async function homepageLoader() {
    try {
        const result = await store.dispatch(fetchPostsThunk());
        return result.payload || null;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return error; // Return null if there is an error
    }
}
