export function EmptyFile() {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<h1 className="text-2xl font-bold">No file found</h1>
			<p className="text-gray-500">
				Please create a new file or select an existing one.
			</p>
		</div>
	);
}
