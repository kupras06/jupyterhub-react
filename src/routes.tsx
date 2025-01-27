import { Route, Routes } from "react-router";
import { File } from "./pages/File";
import { AppLayout } from "./views/layout/Layout";
import { Home } from "./pages/HomePage";

export const AppRouter = () => {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route index element={<Home />} />
				<Route path="files">
					<Route path=":fileId" element={<File />} />
				</Route>
			</Route>
		</Routes>
	);
};
