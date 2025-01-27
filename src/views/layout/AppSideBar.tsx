import { AddNewFile } from "../files/AddNewFile";
import { SetUserData } from "./SetUserAPIData";
import { FilesList } from "../files/FilesList";

export function AppSideBar() {
	return (
		<aside className="w-full px-2 h-full flex flex-col border-r-2 max-w-sm ">
			<h1 className="font-bold text-slate-600 text-5xl text-center my-8">
				My Notes
			</h1>
			<div className="flex gap-4">
				<AddNewFile />
				<SetUserData />
			</div>
			<FilesList />
		</aside>
	);
}
