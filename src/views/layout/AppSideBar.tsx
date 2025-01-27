import { getUserFiles } from "@/services/files.service";
import { AddNewFile } from "./AddNewFile";
import { SetUserData } from "./SetUserAPIData";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";

function FilesList() {
	const { data, isLoading } = useQuery({
		queryKey: ["files"],
		queryFn: async () => getUserFiles(),
		refetchOnWindowFocus: true,
	});
	return (
		<div className="flex flex-col flex-grow divide-y-2 overflow-y-scroll my-2 ">
			{isLoading && <div>Loading...</div>}
			{data?.map((file) => (
				<NavLink
					to={`files/${file.id}`}
					key={file.id}
					className="flex p-1 text-center flex-row gap-2 items-center hover:cursor-pointer hover:bg-slate-100 h-full"
				>
					<div className="text-slate-600 text-lg">{file.id}</div>
					<div className="text-slate-600 text-lg truncate">{file.title}</div>
				</NavLink>
			))}
		</div>
	);
}

export function AppSideBar() {
	return (
		<aside className="w-full px-2 h-full flex flex-col border-r-2 max-w-sm ">
			<h1 className="font-bold text-slate-600 text-5xl text-center my-8">
				My Work
			</h1>
			<div className="flex gap-4">
				<AddNewFile />
				<SetUserData />
			</div>
			<FilesList />
		</aside>
	);
}
