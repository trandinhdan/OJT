import React from "react";
import { Container } from "react-bootstrap";
import styles from "../ListFriendPageLayout/ListFriendPageLayout.module.css";
import FriendList from "./FriendList";


function FriendListPageLayout({friends}) {
    return (
        <div>
            <FriendList friends={friends}/>
        </div>
    );
}

export default FriendListPageLayout;