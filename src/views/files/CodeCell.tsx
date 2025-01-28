import type { KeyboardEvent } from "react";
import { Play, Trash2 } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { Button } from "@heroui/react";
import { useFileId } from "@/hooks/useFiles";
import { useFileStore } from "@/stores/fileStore";

function CellInfo({ cellId }: { cellId: string }) {
	const { deleteCell, executeCell } = useFileStore();

	return (
		<div className="flex items-center gap-2 p-2 bg-gray-100 rounded-t-lg">
			<Button
				isIconOnly
				onPress={() => executeCell(cellId)}
				className=" hover:bg-gray-200 rounded"
				title="Run cell (Shift+Enter)"
				color="primary"
				variant="light"
			>
				<Play size={16} />
			</Button>
			<div className="flex-1">
				<span className="text-gray-500 text-sm">In [{cellId}]:</span>
			</div>
			<Button
				isIconOnly
				onPress={() => deleteCell(cellId)}
				className=" hover:bg-gray-200 rounded"
				title="Delete cell"
				color="danger"
				variant="light"
			>
				<Trash2 size={24} />
			</Button>
		</div>
	);
}

const CodeEditor = () => {
	const { cells, updateCell, executeCell } = useFileStore();

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, id: string) => {
		// Shift + Enter to execute code
		if (e.shiftKey && e.key === "Enter") {
			e.preventDefault();
			executeCell(id);
		}
	};
	const fileId = useFileId();
	if (!fileId) return;
	return (
		<div className="w-full max-w-4xl mx-auto p-4 ">
			<div className="space-y-4">
				{cells.map((cell) => (
					<div
						key={cell.id}
						id={cell.id}
						className="bg-white rounded-lg shadow"
					>
						<CellInfo cellId={cell.id} />
						<CodeMirror
							value={cell.code}
							extensions={[python()]}
							minHeight="100px"
							onChange={(value) => updateCell(cell.id, value)}
							onKeyDown={(e) => handleKeyDown(e, cell.id)}
							className="border-0"
							basicSetup={{
								lineNumbers: true,
								highlightActiveLineGutter: true,
								highlightSpecialChars: true,
								history: true,
								foldGutter: true,
								drawSelection: true,
								dropCursor: true,
								allowMultipleSelections: true,
								indentOnInput: true,
								syntaxHighlighting: true,
								bracketMatching: true,
								closeBrackets: true,
								autocompletion: true,
								rectangularSelection: true,
								crosshairCursor: true,
								highlightActiveLine: true,
								highlightSelectionMatches: true,
								closeBracketsKeymap: true,
								defaultKeymap: true,
								searchKeymap: true,
								historyKeymap: true,
								foldKeymap: true,
								completionKeymap: true,
								lintKeymap: true,
							}}
						/>
						{cell.output && (
							<div className="border-t">
								<div className="p-2 bg-gray-50">
									<span className="text-gray-500 text-sm">
										Out [{cell.id}]:
									</span>
								</div>
								<pre className="p-4 font-mono text-sm whitespace-pre-wrap text-gray-700">
									{cell.output}
								</pre>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default CodeEditor;
