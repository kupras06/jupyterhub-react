import { BrowserRouter } from "react-router";
import { HeroUIProvider } from "@heroui/react";
import { AppRouter } from "./routes";
import { UserProvider } from "./providers/UserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
	return (
		<HeroUIProvider>
			<BrowserRouter>
				<UserProvider initialValue={{ authToken: "", apiUrl: "" }}>
					<QueryClientProvider client={queryClient}>
						<AppRouter />
					</QueryClientProvider>
				</UserProvider>
			</BrowserRouter>
		</HeroUIProvider>
	);
}

export default App;
