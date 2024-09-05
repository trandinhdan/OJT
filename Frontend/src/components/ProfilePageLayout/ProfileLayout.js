import React from "react";
import { Container } from "react-bootstrap";
import Avatar from "./Avatar";
import Bio from "./Bio";
import CreatePost from "../HomePageLayout/CreatePost";
import PostList from "../HomePageLayout/PostList";
import styles from "./ProfileLayout.module.css";

function ProfileLayout({ profile, postList }) {
    return (
        <div>
            {/*<Container>*/}
                <div className={styles.avatar}>
                    <Avatar profile={profile} />
                </div>

                <div className={styles.flexContainer}>
                    <div className={styles.content}>
                        <div className={styles.bio}>
                            <Bio profile={profile} />
                        </div>
                        <div className={styles.createPost}>
                            <CreatePost userId={profile._id} />
                            <PostList postList={postList} user={profile} />
                        </div>
                    </div>
                </div>
            {/*</Container>*/}
        </div>
    );
}

export default ProfileLayout;
