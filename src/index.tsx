import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Redux
import { Provider } from "react-redux";
import store from "./store/store";
// Components
const App = () => {
	return (
		<div className="flex flex-col min-h-screen min-w-full bg-neutral-800 text-white">
		{/* <NavBar /> */}
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
