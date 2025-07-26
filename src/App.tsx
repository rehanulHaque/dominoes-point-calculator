import AddPlayer from "./components/AddPlayer";
import { useEffect, useState } from "react";
import PlayerCard from "./components/PlayerCard";
import { useAppContext } from "./context/AppContext";
import AddScore from "./components/AddScore";
import { FaInstagram, FaGithub } from "react-icons/fa";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [lowestScore, setLowestScore] = useState<string | undefined>("");
  const randInt = Math.floor(Math.random() * 9) + 1;
  const { users } = useAppContext();

  useEffect(() => {
    const isGameOver = users.some((user) => user.scores.length === 7);
    setGameOver(isGameOver);

    const allScores = users.map((user) =>
      user.scores.reduce((a, b) => a + b, 0)
    );
    const highestScorer = users.find(
      (user) =>
        user.scores.reduce((a, b) => a + b, 0) === Math.min(...allScores)
    )?.username;
    setLowestScore(highestScorer);
  }, [users]);
  const resetButton = () => {
    localStorage.removeItem("users");
    window.location.reload();
  };
  return (
    <main className="relative h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-center font-semibold mt-4">
          Domines Calculator
        </h1>
        {users[0]?.id && (
          <button className="text-sm bg-blue-500 rounded-lg p-2 text-white" onClick={resetButton}>
            Reset Game
          </button>
        )}
      </div>
      {!users[0]?.id && (
        <div className="w-full h-screen absolute top-0 left-0 flex justify-center items-center -translate-y-16">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="flex items-center justify-center p-8 rounded-full bg-gray-200"
          >
            <img src="/plus.svg" alt="plus" className="h-16 w-16" />
          </button>
        </div>
      )}
      <div className="flex flex-col gap-4 mt-4">
        {users && users.map((user) => <PlayerCard key={user.id} user={user} />)}
      </div>
      {gameOver && (
        <div className="px-4">
          <h1 className="text-xl text-center font-semibold my-1">
            Player with lowest score: {lowestScore}
          </h1>
          <img
            src={`/${randInt.toString()}.gif`}
            alt="trophy"
            className="w-full"
          />
          <button
            className="w-full mt-3 bg-red-200 rounded-lg p-4"
            onClick={resetButton}
          >
            Reset
          </button>
        </div>
      )}
      <div className="mx-2">{users[0]?.id && !gameOver && <AddScore />}</div>
      {showForm && <AddPlayer setForm={setShowForm} />}
      <div className="absolute flex items-center justify-center bottom-0 right-0 w-screen h-[100px] bg-gray-200">
        <div className="flex gap-4">
          <a href="https://www.instagram.com/rehan_._cr" target="_blank" className="flex items-center gap-2">
            <FaInstagram className="h-5 w-5 text-black" />
          </a>
          <a href="https://github.com/rehanulHaque" target="_blank" className="flex items-center gap-2">
            <FaGithub className="h-5 w-5 text-black" />
          </a>
        </div>
      </div>
    </main>
  );
}
