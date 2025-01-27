import { type KeyboardEvent, useState } from "react";
import { Play, Plus, Trash2 } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { Button } from "@heroui/react";
import { useFileId } from "@/hooks/useFileId";
import { useFileStore } from "@/stores/fileStore";

const CodeEditor = () => {
	const { cells, addNewCell, deleteCell, updateCell, executeCell } =
		useFileStore();

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
		<div className="w-full max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
			<div className="mb-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-800">Python Notebook</h1>
				<div className="flex gap-2">
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

			<div className="space-y-4">
				{cells.map((cell) => (
					<div key={cell.id} className="bg-white rounded-lg shadow">
						<div className="flex items-center gap-2 p-2 bg-gray-100 rounded-t-lg">
							<Button
								onPress={() => executeCell(cell.id)}
								className="p-1 hover:bg-gray-200 rounded"
								title="Run cell (Shift+Enter)"
							>
								<Play size={16} />
							</Button>
							<div className="flex-1">
								<span className="text-gray-500 text-sm">In [{cell.id}]:</span>
							</div>
							<Button
								onPress={() => deleteCell(cell.id)}
								className="p-1 hover:bg-gray-200 rounded"
								title="Delete cell"
							>
								<Trash2 size={16} />
							</Button>
						</div>

						<div
							className="border-b"
							onKeyDown={(e) => handleKeyDown(e, cell.id)}
						>
							<CodeMirror
								value={cell.code}
								height="150px"
								extensions={[python()]}
								onChange={(value) => updateCell(cell.id, value)}
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
						</div>

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
