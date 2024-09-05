import React from "react";
import { Container } from "react-bootstrap";
import styles from "./AllUserPageLayout.module.css";
import UserList from "./UserList";
import NavBar from "../Layout/NavBar";

function AllUserPageLayout({ users, currentUser, requestList, friendList }) {
    return (
        <div>
            <UserList users={users} currentUser={currentUser}  requestList={requestList} friendList={friendList}/>
        </div>
    );
}

export default AllUserPageLayout;