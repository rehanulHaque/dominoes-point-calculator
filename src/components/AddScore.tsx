import { FormEvent, useRef } from "react";
import { useAppContext } from "../context/AppContext";

export default function AddScore() {
  const { users, addScores } = useAppContext();
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);
  const input4Ref = useRef<HTMLInputElement>(null);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    nextInputRef: React.RefObject<HTMLInputElement> | null
  ) => {
    const value = e.target.value;

    // Limit the input to two characters
    if (value.length > 2) {
      e.target.value = value.slice(0, 2);
    }

    // Move to the next input if the value has two characters
    if (value.length === 2 && nextInputRef?.current) {
      nextInputRef.current.focus();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputs = e.currentTarget.getElementsByTagName("input");
    const scores: { score: number; id: string }[] = [];
    let zeroCount = 0;

    for (let i = 0; i < inputs.length; i++) {
      const score = Number(inputs[i].value);
      const id = users[i].id;
      scores.push({ score, id });

      if (score === 0) {
        zeroCount++;
      }

      // Throw error if more than one zero is found
      if (zeroCount > 1) {
        alert("Error: More than one value is zero.");
        return;
      }
    }
    addScores(scores);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="w-full mt-3 bg-red-200 rounded-lg p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <input
            type="number"
            className="w-[50px] border border-gray-800 outline-none rounded-md px-1"
            min={0}
            max={99}
            onChange={(e) => handleInput(e, input2Ref)}
            ref={input1Ref}
          />
          <input
            type="number"
            className="w-[50px] border border-gray-800 outline-none rounded-md px-1"
            min={0}
            max={99}
            onChange={(e) => handleInput(e, input3Ref)}
            ref={input2Ref}
          />
          <input
            type="number"
            className="w-[50px] border border-gray-800 outline-none rounded-md px-1"
            min={0}
            max={99}
            onChange={(e) => handleInput(e, input4Ref)}
            ref={input3Ref}
          />
          <input
            type="number"
            className="w-[50px] border border-gray-800 outline-none rounded-md px-1"
            min={0}
            max={99}
            onChange={(e) => handleInput(e, null)}
            ref={input4Ref}
          />
        </div>
        <button className="w-full mt-3 bg-blue-500 rounded-lg p-2">Add</button>
      </form>
    </div>
  );
}
