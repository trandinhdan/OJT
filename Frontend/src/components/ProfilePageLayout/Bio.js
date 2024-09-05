import React from "react";
import styles from "./Bio.module.css";

function Bio({profile}) {
    return (
        <div className={styles["bio-container"]}>
            <h3 className={styles["bio-heading"]}>Intro</h3>
            <ul className={styles["bio-list"]}>
                <li>{profile.email}</li>
                <li>{profile.phone}</li>
                {/*<li>{profile.gender}</li>*/}
            </ul>
        </div>
    );
}

export default Bio;
