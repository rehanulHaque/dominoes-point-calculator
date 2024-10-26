import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface AppContextTypes {
  users: UserTypes[];
  addUser: (usernames: string[]) => void;
  addScores: (scoreData: { id: string; score: number }[]) => void;
}

interface UserTypes {
  id: string;
  username: string;
  scores: number[];
}

const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<UserTypes[]>(() => {
    // Load initial data from local storage if available
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  // Save users to local storage on every update
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (usernames: string[]) => {
    setUsers((prevUsers) => {
      const newUsers = usernames
        .filter((username) => !prevUsers.some((user) => user.username === username))
        .map((username) => ({
          id: uuidv4(),
          username,
          scores: []
        }));
      return [...prevUsers, ...newUsers];
    });
  };

  const addScores = (scoreData: { id: string; score: number }[]) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        const userScoreData = scoreData.find((data) => data.id === user.id);
        if (userScoreData) {
          return { ...user, scores: [...user.scores, userScoreData.score] };
        }
        return user;
      })
    );
  };

  return (
    <AppContext.Provider value={{ users, addUser, addScores }}>
      {children}
    </AppContext.Provider>
  );
}
