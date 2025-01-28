import { useFileId } from "@/hooks/useFiles";
import CodeEditor from "@/views/files/CodeCell";
import { FileInfo } from "@/views/files/FileInfo";

function EmptyFile() {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<h1 className="text-2xl font-bold">No file found</h1>
			<p className="text-gray-500">
				Please create a new file or select an existing one.
			</p>
		</div>
	);
}
export function File() {
	const fileId = useFileId();
	if (!fileId) return <EmptyFile />;
	return (
		<main className="flex bg-gray-50 h-screen flex-col items-center pt-4 px-8 ">
			<FileInfo />
			<div className="overflow-y-scroll w-full">
				<CodeEditor />
			</div>
		</main>
	);
}
