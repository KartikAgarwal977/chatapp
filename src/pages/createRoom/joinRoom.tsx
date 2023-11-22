import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinPrivateRoom: React.FC = () => {
    const navigate = useNavigate();
    const roomref = collection(db, "Rooms");
    const [newRoom, setNewRoom] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setNewRoom(e.target.elements.roomName.value);
        setNewPassword(e.target.elements.password.value);
    }
    useEffect(() => {
        const queryRoom = query(roomref, where("Roomname", "==", newRoom), where("password", "==", newPassword));
        const unsubscribe = onSnapshot(queryRoom, (snapshot) => {
            if (!snapshot.empty) {
                console.log(snapshot.docs[0].data());
                navigate(`/chat/${newRoom}`)
            }
        })
        return () => unsubscribe()
    }, [newRoom, newPassword])
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
          <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl mb-4 text-center">Join a Private Room</h2>
            <label className="block mb-2">Room Name:</label>
            <input
              type="text"
              name="roomName"
              className="mb-4 w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              name="password"
              className="mb-4 w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
              Join Private Room
            </button>
          </form>
        </div>
      );
    };
    
export default JoinPrivateRoom;
