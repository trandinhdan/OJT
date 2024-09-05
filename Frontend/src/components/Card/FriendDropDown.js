import React from 'react';
import styles from '../Card/FriendDropDown.module.css';

const FriendsDropdown = ({ friends, onSelect }) => {
    return (
        <div className={styles.dropdownContainer}>
            <ul className={styles.dropdownList}>
                {friends.map((friend) => (
                    <li key={friend._id} className={styles.dropdownItem} onClick={() => onSelect(friend)}>
                        {friend.fullName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsDropdown;
