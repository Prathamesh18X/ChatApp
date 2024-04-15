import "./App.css";
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import Home from "./pages/Home.jsx"

function App() {
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Login />
			{/* <Signup /> */}
			{/* <Home /> */}
		</div>
	);
}

export default App;
