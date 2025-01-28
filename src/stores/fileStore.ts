import { nanoid } from "nanoid";
import { create } from "zustand";

const DEFAULT_CELL = {
	id: "cell_1",
	code: '# Write your Python code here\nprint("Hello, World!")',
	output: "",
};
type DEFAULT_CELL = typeof DEFAULT_CELL;
type TFileStore = {
	cells: DEFAULT_CELL[];
};
type TFIleActions = {
	addNewCell: () => void;
	deleteCell: (id: string) => void;
	updateCell: (id: string, newCode: string) => void;
	executeCell: (id: string) => void;
};
export const useFileStore = create<TFileStore & TFIleActions>((set) => ({
	cells: [DEFAULT_CELL],
	addNewCell: () => {
		const newId = nanoid();
		set((prev) => ({
			...prev,
			cells: [...prev.cells, { ...DEFAULT_CELL, id: newId }],
		}));
		setTimeout(() => {
			const codeMirror = document.getElementById(newId);
			if (codeMirror) {
				codeMirror.scrollIntoView({ behavior: "smooth" });
			}
		}, 100);
	},
	deleteCell: (id) =>
		set((prev) => ({
			...prev,
			cells: prev.cells.filter((cell) => cell.id !== id),
		})),
	updateCell: (id, newCode) =>
		set((prev) => ({
			...prev,
			cells: prev.cells.map((cell) =>
				cell.id === id ? { ...cell, code: newCode } : cell,
			),
		})),
	executeCell: (id) =>
		set((prev) => ({
			...prev,
			cells: prev.cells.map((cell) =>
				cell.id === id ? { ...cell, output: "Hello World" } : cell,
			),
		})),
}));
