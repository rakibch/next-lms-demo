// lib/users.ts
export type User = {
  id: string;
  username: string;
  password: string;
  name: string;
  role: "admin" | "learner";
};

export const users: User[] = [
  { id: "1", username: "admin", password: "adminpass", name: "Admin User", role: "admin" },
  { id: "2", username: "student", password: "studentpass", name: "Learner User", role: "learner" }
];

export function findUser(username: string) {
  return users.find((u) => u.username === username);
}
