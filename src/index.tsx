import React, { createRef } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Redux
import { Provider } from "react-redux";
import store from "./store/store";
// Components
import LayoutView from "./components/Layout/LayoutView";
import NavBar from "./components/Navigation/NavBar";
// import NavBar from "./components/Navigation/NavBar";
const App = () => {
	const navBarRef = createRef<HTMLDivElement>();
	return (
		<div className="flex flex-col min-h-screen min-w-full bg-neutral-800 text-white">
			<NavBar ref={navBarRef} />
			<LayoutView navBarRef={navBarRef} />
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
