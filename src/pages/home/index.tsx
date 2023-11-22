import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-amber-200">
            <h1 className="text-4xl mb-8">Welcome to LetChat</h1>
            <Link to="/room">
                <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4">
                    Join a Public Room
                </button>
            </Link>
            <Link to="/privateroom">
                <button className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 mb-4">
                    Create a Private Room
                </button>
            </Link>
            <Link to="/joinprivate">
                <button className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600">
                    Join a Private Room
                </button>
            </Link>
        </div>
    )
}

export default Home;
