import { FormEvent } from "react";
import { useAppContext } from "../context/AppContext";

export default function AddPlayer({
  setForm,
}: {
  setForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { addUser } = useAppContext();
  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputs = e.currentTarget.getElementsByTagName("input");
    const usernames: string[] = [];
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value) {
        usernames.push(inputs[i].value);
      }
    }
    if(usernames.length < 4){
      alert("Min 4 players required");
      return
    }
    addUser(usernames);
    setForm(false);
  };
  return (
    <div className="mt-3 bg-red-200 rounded-lg p-4 absolute top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2">
      <form className="flex gap-2 flex-col" onSubmit={handelSubmit}>
        <h2 className="font-semibold text-xl  text-center">Add Player</h2>
        <input
          type="text"
          placeholder="Player 1"
          className="px-3 py-1 rounded-md outline-none "
        />
        <input
          type="text"
          placeholder="Player 2"
          className="px-3 py-1 rounded-md outline-none "
        />
        <input
          type="text"
          placeholder="Player 3"
          className="px-3 py-1 rounded-md outline-none "
        />
        <input
          type="text"
          placeholder="Player 4"
          className="px-3 py-1 rounded-md outline-none "
        />
        <button
          type="submit"
          className="w-full mt-3 bg-blue-500 rounded-lg p-2 text-white"
        >
          Add Player
        </button>
      </form>
    </div>
  );
}
