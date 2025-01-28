export interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
}

export const colors = [
  { id: "red", hex: "#FF3B30" },
  { id: "orange", hex: "#FF9500" },
  { id: "yellow", hex: "#FFCC00" },
  { id: "green", hex: "#34C759" },
  { id: "blue", hex: "#007AFF" },
  { id: "indigo", hex: "#5856D6" },
  { id: "purple", hex: "#AF52DE" },
  { id: "pink", hex: "#FF2D55" },
  { id: "brown", hex: "#A2845E" },
  { id: "black", hex: "#000000" },
  { id: "white", hex: "#FFFFFF" },
];
