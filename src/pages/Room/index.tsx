import { useState, useRef } from "react";
import { Chat } from "../chat";

interface RoomProps {
  room: string | null;
}

const Room: React.FC<RoomProps> = () => {
    const [room, setRoom] = useState<string | null>(null);
    const roomInput = useRef<HTMLInputElement | null>(null);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (roomInput.current) {
            const inputValue = roomInput.current.value;
            
            if (inputValue !== "") {
                setRoom(inputValue);
            }
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-amber-100">
            <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
                {room ? (
                    <Chat room={room} />
                ) : (
                    <form onSubmit={handleFormSubmit} className='room'>
                        <label className="block text-amber-500 font-semibold mb-2">Enter Room Name :</label>
                        <input ref={roomInput} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber" />
                        <button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4">Join room</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Room;
