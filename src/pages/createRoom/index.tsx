import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoomCreate: React.FC = () => {
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const roomref = collection(db, "Rooms");
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    await addDoc(roomref, {
      Roomname: newRoom,
      password: newPassword,
    });
      navigate(`/PrivateChat/${newRoom}`);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center">Create a Private Room</h2>
        <label className="block mb-2">Room Name:</label>
        <input
          type="text"
          name="roomName"
          className="mb-4 w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          onChange={(e) => setNewRoom(e.target.value)}
        />
        <label className="block mb-2">Password:</label>
        <input
          type="password"
          name="password"
          className="mb-4 w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create Room
        </button>
      </form>
    </div>
  );
};

export default PrivateRoomCreate;
