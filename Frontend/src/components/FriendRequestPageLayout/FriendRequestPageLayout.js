import React from "react";
import { Container } from "react-bootstrap";
import styles from "./FriendRequestPageLayout.module.css";
import FriendRequestList from "./FriendRequestList";

function FriendRequestPageLayout({requests, userId}) {
    return (
        <div>
            <FriendRequestList requests={requests} userId={userId}/>
        </div>
    );
}

export default FriendRequestPageLayout;