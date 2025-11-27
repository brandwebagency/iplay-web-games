import { Route } from "@/models/Routes";

export const siteRoutes = {
  // Home
  home: {
    path: "/",
    label: "Home",
  } as Route,
  
  mazegame: {
    path: "/maze-game",
    label: "Maze Game",
  } as Route,

    targetPractice: {
    path: "/target-practice",
    label: "Target Practice",
  } as Route,
};
