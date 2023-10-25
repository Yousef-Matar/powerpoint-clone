import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Redux
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
// Components
import LayoutView from "./components/Layout/LayoutView";
import NavBar from "./components/Navigation/NavBar";
// Utilities
import * as keyboard from "./constants/keyboardKeys.constants";
const App = () => {
	const dispatch = useDispatch();
	const [holdingCTRL, setHoldingCTRL] = useState(false);
	const handlePasteElement = (pressedKey: string) => {
		if (pressedKey === keyboard.ctrlKey) {
			setHoldingCTRL(true);
		}
		if (holdingCTRL && pressedKey === keyboard.vKey) {
			dispatch({
				type: "PASTE_ELEMENT",
			});
		}
	};
	return (
		<div
			className="flex flex-col min-h-screen min-w-full bg-neutral-800 text-white"
			tabIndex={-1}
			onKeyDown={(event) => handlePasteElement(event.key)}
		>
			<NavBar />
			<LayoutView />
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
