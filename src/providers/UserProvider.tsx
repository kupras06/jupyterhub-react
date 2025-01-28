import {
	client,
	getCurrentUser,
	type RequestIdentity,
} from "@/services/client";
import { create } from "zustand";
import { createZustandContext } from "zustand-context";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
	authToken: string;
	apiUrl: string;
	hubUser?: RequestIdentity;
};
type UserActions = {
	setUser: (user: UserStore) => Promise<void>;
};

export const [UserProvider, useUser] = createZustandContext(
	(initialState: UserStore) =>
		create(
			persist<UserStore & UserActions>(
				(set) => ({
					...initialState,
					setUser: async (user) => {
						const headers = {
							Authorization: `token ${user.authToken}`,
							'Access-Control-Allow-Origin': '*',
							'Content-Type': 'application/json',
							'X-Host-Header':'http://localhost:8000',
							'origin':'http://localhost:8000',
							'referer':'http://localhost:8000',
							'my-host':'http://localhost:8000',
						}
						client.setConfig({
							baseURL: user.apiUrl,
							headers
						});
						const url = `${user.apiUrl}/me`;
						const { data: hubUser } = await getCurrentUser();
						console.log(hubUser);

						const response = await fetch(url,{
							headers
						});
						console.log({response});
						const data = await response.json();
						console.log({data});
						const { data: hubUser1 } = await getCurrentUser();
						console.log(hubUser);
						set((state) => ({ ...state, ...user, hubUser }));
					},
				}),
				{
					name: "user-storage",
					storage: createJSONStorage(() => localStorage),
				},
			),
		),
);
