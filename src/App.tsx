import { Button, ButtonGroup } from "@heroui/react";

import { BrowserRouter } from "react-router";
import { HeroUIProvider } from "@heroui/react";
import { AppRouter } from "./routes";
function App() {
	return (
		<HeroUIProvider>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</HeroUIProvider>
	);
}

export default App;
