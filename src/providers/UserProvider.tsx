import { create } from "zustand";
import { createZustandContext } from "zustand-context";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
	authToken: string;
	apiUrl: string;
};
type UserActions = {
	setUser: (user: UserStore) => void;
};

export const [UserProvider, useUser] = createZustandContext(
	(initialState: UserStore) =>
		create(
			persist<UserStore & UserActions>(
				(set) => ({
					...initialState,
					setUser: (user) => set((state) => ({ ...state, ...user })),
				}),
				{
					name: "user-storage",
					storage: createJSONStorage(() => localStorage), 
				},
			),
		),
);
