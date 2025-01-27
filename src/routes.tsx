import { Route, Routes } from "react-router";
import { FilesList } from "./pages/FilesList";
import { File } from "./pages/File";
import { AppLayout } from "./views/Layout";
import { Home } from "./pages/home";

export const AppRouter = () => {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route index element={<Home />} />

				<Route path="files">
					<Route index element={<FilesList />} />
					<Route path=":fileId" element={<File />} />
				</Route>
			</Route>
		</Routes>
	);
};
