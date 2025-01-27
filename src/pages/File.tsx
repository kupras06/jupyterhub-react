import { useFileId } from "@/hooks/useFileId";
import CodeEditor from "@/views/files/CodeCell";

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
		<div>
			<CodeEditor />
		</div>
	);
}
