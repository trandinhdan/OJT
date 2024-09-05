import React from 'react';
import PostList from './PostList';
import CreatePost from "./CreatePost";
import styles from './HomePageLayout.module.css';

const HomePageLayout = ({ postList, user}) => {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.middleColumn}>
                    <CreatePost userId={user?.userId} />
                    <PostList postList={postList} user={user}/>
                </div>
            </div>
        </>
    );
}

export default HomePageLayout;
