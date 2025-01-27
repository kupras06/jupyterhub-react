import { BrowserRouter } from "react-router";
import { HeroUIProvider } from "@heroui/react";
import { AppRouter } from "./routes";
import { UserProvider } from "./providers/UserProvider";
function App() {
	return (
		<HeroUIProvider>
			<BrowserRouter>
				<UserProvider initialValue={{ authToken: "", apiUrl: "" }}>
					<AppRouter />
				</UserProvider>
			</BrowserRouter>
		</HeroUIProvider>
	);
}

export default App;
