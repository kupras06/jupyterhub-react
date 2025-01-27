import { Outlet } from "react-router";
import { AppSideBar } from "./AppSideBar";
export function AppLayout() {
	return (
		<main className="flex  items-center  h-screen">
			<AppSideBar />
			<div className="w-full ">
				<Outlet />
			</div>
		</main>
	);
}
