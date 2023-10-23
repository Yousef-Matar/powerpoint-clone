import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Redux
import { Provider } from "react-redux";
import store from "./store/store";
// Components
// import LayoutView from "./components/Layout/LayoutView";
import NavBar from "./components/Navigation/NavBar";
const App = () => {
	return (
		<div className="flex flex-col min-h-screen min-w-full overflow-hidden bg-slate-400 dark:bg-slate-800 text-black dark:text-white">
			<NavBar />
			{/* <LayoutView /> */}
		</div>
	);
};
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
