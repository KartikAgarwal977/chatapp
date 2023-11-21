import { useEffect, useState } from "react";
import {
  addDoc,
  serverTimestamp,
  collection,
  onSnapshot,
  where,
  query,
  DocumentData,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";

export const Chat: React.FC = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState<DocumentData[]>([]);
  const [messages, setMessages] = useState([]);
  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessage = query(messageRef, where("room", "==", room));
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(newMessages);
    });

    // Clean up function
    return () => unsubscribe();
  }, [messageRef, room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newMessage);
    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      user: auth.currentUser?.displayName,
      userid: auth.currentUser?.uid,
      room,
    });

    setNewMessage("");
  };

  // Function to generate a color for a username
  const getColor = (username) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = 31 * hash + username.charCodeAt(i);
    }
    const colors = [
      "red",
      "yellow",
      "green",
      "blue",
      "indigo",
      "purple",
      "pink",
    ];
    return colors[hash % colors.length];
  };

  return (
    <div className="bg-amber-200 h-screen flex flex-col">
      <div className="overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className="flex flex-col bg-white p-4 rounded-xl space-y-2"
          >
            <span
              className={`font-semibold text-sm text-${getColor(
                message.user
              )}-600`}
            >
              {message.user}
            </span>
            <div className="flex item-center item-justify">
              <span className="text-sm text-gray-600">{message.text}</span>
              <span className="text-xs text-gray-500 margin text-right">{message.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-auto flex items-center p-4 bg-white"
      >
        <input
          className="w-full rounded-full border px-4 py-2 mr-4 focus:outline-none focus:border-amber-500"
          id="message"
          type="text"
          placeholder="Type a message..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button
          className="bg-amber-700 hover:bg-amber-800 text-white rounded-150 p-2"
          type="submit"
        >
          Send &#9658;
        </button>
      </form>
    </div>
  );
};
