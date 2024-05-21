import "./App.css";
import {Routes ,Route, Navigate} from "react-router-dom"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import Home from "./pages/Home.jsx"
import Landing from "./pages/Landing.jsx";
import {Toaster} from "react-hot-toast"
import { useAuth } from "./Context/AuthContext.jsx";

function App() {
	const {authUser} = useAuth();
	return (<>
		<Routes>
			<Route path= '/' element={<Landing/>}/>
		</Routes>
	<div className='md:p-4 p-0 h-screen w-screen flex items-center justify-center'>
		<Routes>
			<Route path= '/app' element={authUser ? <Home/> : <Navigate to ="/login" />} />
			<Route path= '/login' element={authUser ? <Navigate to ="/app" /> : <Login/>} />
			<Route path= '/signup' element={authUser ? <Navigate to ="/app" /> : <Signup/> } />
		</Routes>
		<Toaster/>
	</div>
		</>
	);
}

export default App;
