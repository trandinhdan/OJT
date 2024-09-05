import React from "react";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "../ListFriendPageLayout/ListFriendPageLayout.module.css";
import FriendListCard from "../Card/FriendListCard";


function FriendList({ friends }) {

    return (
        <div>
            <Container>
                <div className={styles.container}>
                    {friends.map((friend) => (
                        <FriendListCard
                         friend={friend}
                            key={friend._id}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default FriendList;