interface UserTypes {
    user: {
        id: string
        username: string
        scores: number[]
    }
}

const totalScore = (user: UserTypes) => {
    return user.user.scores.reduce((acc, score) => acc + score, 0);
}

export default function PlayerCard({user}: UserTypes) {
  return (
    <div className="border border-gray-700 mx-1 rounded-lg p-2 flex">
    <h1 className="font-medium mr-[5px]">{user.username}<span className="ml-[3px]">:</span></h1>
    <div className="flex justify-between w-full">
      <div>
        {user.scores.map((score, idx) => (
          <span className=" text-sm" key={idx}>{score}, </span>
        ))}
      </div>
      <p>{totalScore({user})}</p>
    </div>
  </div>
  )
}
