import React, { useState } from "react";
import { useDispatch } from "react-redux";

const NavBar = () => {
	const dispatch = useDispatch();
	const [tabs, setTabs] = useState([
		{ text: "Home", visible: true },
		{ text: "Insert", visible: false },
	]);
	// const handleTabClick = (
	// 	clickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	// 	clickedTab: NavTab
	// ) => {
	// 	switch (clickEvent.detail) {
	// 		case 1: {
	// 			setTabs(
	// 				[...tabs].map((tab) => {
	// 					if (tab.text === clickedTab.text) {
	// 						document
	// 							.getElementById(
	// 								`${tab.text.toLowerCase()}-content`
	// 							)
	// 							?.setAttribute("class", "flex gap-3");
	// 						return {
	// 							...tab,
	// 							visible: true,
	// 						};
	// 					} else {
	// 						document
	// 							.getElementById(
	// 								`${tab.text.toLowerCase()}-content`
	// 							)
	// 							?.setAttribute("class", "hidden");
	// 						return {
	// 							...tab,
	// 							visible: false,
	// 						};
	// 					}
	// 				})
	// 			);
	// 			break;
	// 		}
	// 		case 2: {
	// 			setTabs(
	// 				[...tabs].map((tab) => {
	// 					document
	// 						.getElementById(`${tab.text.toLowerCase()}-content`)
	// 						?.setAttribute("class", "hidden");
	// 					return {
	// 						...tab,
	// 						visible: false,
	// 					};
	// 				})
	// 			);
	// 			break;
	// 		}
	// 		default: {
	// 			break;
	// 		}
	// 	}
	// };

	return (
		<div id="nav-bar">
			{/* <div className="flex gap-1 min-w-full">
				{tabs.map((tab) => {
					return (
						<button
							className={`p-3 ${
								tab.visible
									? "bg-slate-500 dark:bg-slate-900"
									: ""
							}`}
							key={tab.text}
							onClick={(event) => handleTabClick(event, tab)}
						>
							{tab.text}
						</button>
					);
				})}
			</div> */}
			<div className="flex items-center flex-wrap px-1 bg-slate-500 dark:bg-slate-900">
				<div id="home-content" className="flex gap-3">
					Home
				</div>
				<div id="insert-content" className="hidden">
					<div className="inline-flex">
						<button
							className="p-1 border border-slate-900 dark:bg-slate-500 rounded-l border-r-0"
							onClick={() => dispatch({ type: "CREATE_SLIDE" })}
						>
							Blank Slide
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
