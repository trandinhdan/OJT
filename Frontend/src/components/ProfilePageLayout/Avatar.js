import React from "react";
import styles from "./Avatar.module.css";

function Avatar({ profile }) {
    return (
        <div className={styles["avatar-container"]}>
            <img
                className={styles["avatar-img"]}
                src="../img/avaImg/ava.jpg"
                alt="Avatar"
            />
            <div>
                <h1 className={styles["avatar-info"]} >{profile.fullName}</h1>
                <h5 className={styles["avatar-info"]}>1K friends</h5>
            </div>
        </div>
    );
}

export default Avatar;
