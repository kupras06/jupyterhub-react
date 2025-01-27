import { useFileStore } from "@/stores/fileStore";
import { Button } from "@heroui/react";
import { Plus } from "lucide-react";

export function FileInfo() {
	const { addNewCell } = useFileStore();
	return (
		<div className="mb-4 w-full flex justify-between items-center">
			<h1 className="text-2xl font-bold text-gray-800">Python Notebook</h1>
			<div className="flex gap-2 items-center">
				<div className="text-sm text-gray-600">Shift + Enter to run</div>
				<Button
					onPress={addNewCell}
					className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					<Plus size={16} />
					Add Cell
				</Button>
			</div>
		</div>
	);
}
