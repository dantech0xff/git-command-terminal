export interface TerminalEntry {
  id: string;
  type: "command" | "output" | "error";
  content: string;
  timestamp: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  timestamp: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}
