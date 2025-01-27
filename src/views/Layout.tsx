export function AppLayout() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="w-full max-w-md">
				<div className="flex flex-col items-center justify-center gap-4 py-12">
					<h1 className="text-3xl font-bold">Jupyter Project</h1>
					<p className="text-lg">
						This is a project to showcase the capabilities of JupyterHub
					</p>
				</div>
			</div>
		</div>
	);
}
