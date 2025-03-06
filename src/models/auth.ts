import { RegisterSchema } from "@/pages/auth/register";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { parseAst } from "vite";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  profile: string;
};

type AuthState = {
  user: User | null;
  users: User[];
  isAuth: boolean;

  setAuth: (isAuth: boolean) => void;

  register: (formData: z.infer<typeof RegisterSchema>) => Promise<void>;
  login: ({ email, password }: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

// Create Zustand store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isAuth: false,

      setAuth: (isAuth: boolean) => set({ isAuth }),

      register: async (formData) => {
        const storedUsers = get().users; // get all the registered users

        // user already exists?
        if (storedUsers.some((user: User) => user.email === formData.email)) {
          throw new Error("User already exists!");
        }

        // TODO: need to hash password
        const newUser: User = {
          id: uuid(),
          name: formData.name,
          email: formData.email,
          password: formData.password,
          profile: `https://avatar.iran.liara.run/public?usearname=${formData.name}`,
        };

        set({
          user: newUser,
          users: [...storedUsers, newUser],
          isAuth: true,
        });

        toast.success("Registration successful!");
      },

      login: async ({ email, password }) => {
        const storedUsers = get().users;
        const user = storedUsers.find(
          (user: User) => user.email === email && user.password === password,
        );

        if (!user) {
          throw new Error("Invalid credentials!");
        }

        set({ user: user, isAuth: true });
      },

      logout: async () => {
        set({ user: null, isAuth: false });
        toast.success("Logged out successfully!");
      },
    }),
    {
      name: "session",
    },
  ),
);

export const getAuth = () => useAuthStore.getState();
export default useAuthStore;
