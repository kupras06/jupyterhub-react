import {
	Listbox,
	ListboxItem,
} from "@heroui/react";
import { AddNewFile } from "./AddNewFile";
import { SetUserData } from "./SetUserAPIData";


function AppSiderBar() {
	return (
		<aside className="w-full px-2 h-full border-r-2 max-w-sm">
			<h1 className="font-bold text-slate-600 text-5xl text-center my-8">
				My Work
			</h1>
			<div className="flex gap-4">
				<AddNewFile />
				<SetUserData />
			</div>
			<div className="w-full h-full border-b-small px-1 py-2 rounded-b-small border-default-200 ">
				<Listbox aria-label="Actions" onAction={(key) => alert(key)}>
					<ListboxItem key="new">New file</ListboxItem>
					<ListboxItem key="copy">Copy link</ListboxItem>
					<ListboxItem key="edit">Edit file</ListboxItem>
					<ListboxItem key="delete" className="text-danger" color="danger">
						Delete file
					</ListboxItem>
				</Listbox>
			</div>
		</aside>
	);
}
export function AppLayout() {
	return (
		<main className="flex  items-center  h-screen">
			<AppSiderBar />
			<div className="w-full ">
				<div className="flex flex-col items-center justify-center gap-4 py-12">
					<h1 className="text-3xl font-bold">Jupyter Project</h1>
					<p className="text-lg">
						This is a project to showcase the capabilities of JupyterHub
					</p>
				</div>
			</div>
		</main>
	);
}
