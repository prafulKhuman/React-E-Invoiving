import { BrowserRouter } from "react-router-dom";
import RouteConfig from "./utility/routeConfig/RouteConfig";

import { UserAuthContextProvider } from "./context/Auth/UserAuthContext";




function App() {
	return (<>
		<UserAuthContextProvider>
			
			<BrowserRouter>
				
				<RouteConfig/>
			</BrowserRouter>
		</UserAuthContextProvider>
		
		
		
	</>);
}

export default App;
