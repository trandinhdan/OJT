import React, { useState, useEffect, useCallback } from 'react';
import useSocket from '../hooks/useSocket';
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByRoomThunk, getMessagesByUserThunk, sendMessageThunk } from '../features/messages/messageThunk';
import { getAllRoomsThunk, getRoomByUserIdThunk } from "../features/rooms/roomThunk";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");

const Message = () => {
    const serverUrl = 'http://localhost:5000';
    const dispatch = useDispatch();
    const userRooms = useSelector((state) => state.rooms.userRooms);
    const user = token ? jwtDecode(token) : null;
    const currentUser = useSelector((state) => state.users.user);
    const socket = useSocket(serverUrl);
    const [message, setMessage] = useState('');
    const [roomMessages, setRoomMessages] = useState({});
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    useEffect(() => {
        const fetchRoomsAndMessages = async () => {
            try {
                const result = await dispatch(getRoomByUserIdThunk({userId: user.userId}));
                if (result.payload && result.payload.length > 0) {
                    console.log("User rooms fetched successfully:", result.payload);
                    const messagesByRoom = {};
                    for (const room of result.payload) {
                        const messages = await dispatch(getMessagesByRoomThunk(room._id));
                        messagesByRoom[room._id] = messages.payload;
                    }
                    setRoomMessages(messagesByRoom);
                } else {
                    console.log("No room found for the user.");
                }
            } catch (error) {
                console.error("Error fetching user's room:", error);
            }
        };

        fetchRoomsAndMessages();
    }, [dispatch]);

    useEffect(() => {
        if (socket) {
            socket.on('new_message', (msg) => {
                if (msg.roomId) {
                    console.log('Received new message:', msg);
                    setRoomMessages(prevMessages => ({
                        ...prevMessages,
                        [msg.roomId]: [...(prevMessages[msg.roomId] || []), msg]
                    }));
                }
            });

            return () => {
                if (socket) {
                    socket.off('new_message');
                }
            };
        }
    }, [socket]);

    const sendMessage = useCallback(async () => {
        if (message.trim() && selectedRoomId) {
            const messageData = {
                userId: user.userId,
                content: message,
                roomId: selectedRoomId,
            };

            try {
                await dispatch(sendMessageThunk(messageData));
                setMessage('');
            } catch (err) {
                console.error('Error sending message:', err);
            }
        } else {
            console.error('Cannot send message:', { message, selectedRoomId });
        }
    }, [message, selectedRoomId, dispatch]);

    const joinRoom = async (roomId) => {
        setSelectedRoomId(roomId);
        if (!roomMessages[roomId]) {
            const messages = await dispatch(getMessagesByRoomThunk(roomId));
            setRoomMessages(prevMessages => ({
                ...prevMessages,
                [roomId]: messages.payload
            }));
        }
    };

    const getOtherUserName = (room, senderId) => {
        if (!room || !room.participants) return 'Unknown User';
        const otherUser = room.participants.find(participant => participant._id !== user.userId);
        return otherUser ? otherUser.fullName : 'Unknown User';
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/4 border-r border-gray-300 p-4 h-full overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Active Chat Rooms</h2>
                <ul>
                    {userRooms.map((room) => (
                        <li key={room._id} className="mb-2">
                            <button
                                className="w-full text-left p-2 bg-blue-100 hover:bg-blue-200"
                                onClick={() => joinRoom(room._id)}
                            >
                               {getOtherUserName(room, user.userId)}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-3/4 p-4 h-full flex flex-col">
                {selectedRoomId ? (
                    <div className="flex flex-col h-full">
                        <div className="flex-grow overflow-y-auto border p-4">
                            {(roomMessages[selectedRoomId] || []).map((msg, index) => {
                                const isCurrentUser = msg.sender === user.userId;
                                const senderName = isCurrentUser ? 'You' : getOtherUserName(userRooms.find(room => room._id === selectedRoomId), msg.sender);
                                return (
                                    <div key={index} className={`mb-2 p-2 ${isCurrentUser ? 'text-right bg-blue-100' : 'text-left bg-gray-100'}`}>
                                        <span className="block font-bold">{senderName}</span>
                                        <span>{msg.content}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex p-4 border-t">
                            <input
                                type="text"
                                className="flex-grow p-2 border border-gray-300 rounded-l"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <button
                                className="bg-blue-500 text-white p-2 rounded-r"
                                onClick={sendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-gray-500">Select a chat room to start messaging</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;