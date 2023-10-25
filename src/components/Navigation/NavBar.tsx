import React, { useState } from "react";
import { useDispatch } from "react-redux";
const NavBar = () => {
	const dispatch = useDispatch();
	const [activeTab, setActiveTab] = useState<Nullable<string>>("home");
	const tabs = [
		{ key: "home", text: "Home" },
		{ key: "insert", text: "Insert" },
	];
	const handleTabClick = (clickEventCount: number, clickedTabKey: string) => {
		switch (clickEventCount) {
			case 1: {
				setActiveTab(clickedTabKey);
				break;
			}
			// case 2: {
			// 	setActiveTab(null);
			// 	break;
			// }
			default: {
				break;
			}
		}
	};
	return (
		<div id="nav-bar">
			<div className="bg-neutral-600 p-1 flex gap-1">
				{tabs.map((tab) => {
					return (
						<button
							className={`p-1 rounded ${
								activeTab === tab.key ? "bg-neutral-900" : ""
							}`}
							key={tab.key}
							onClick={(event) =>
								handleTabClick(event.detail, tab.key)
							}
						>
							{tab.text}
						</button>
					);
				})}
			</div>
			<div
				className="items-center flex-wrap w-full p-1 bg-neutral-900"
				style={{ display: activeTab != null ? "flex" : "none" }}
			>
				<div
					className="gap-3"
					style={{ display: activeTab === "home" ? "flex" : "none" }}
				>
					<button
						className="p-1 rounded focus:bg-neutral-600 hover:bg-neutral-500"
						onClick={(event) => console.log(event)}
					>
						Home
					</button>
				</div>
				<div
					className="gap-3"
					style={{
						display: activeTab === "insert" ? "flex" : "none",
					}}
				>
					<button
						className="p-1 rounded focus:bg-neutral-600 hover:bg-neutral-500"
						onClick={() => dispatch({ type: "CREATE_SLIDE" })}
					>
						New Slide
					</button>
					<button
						className="p-1 rounded focus:bg-neutral-600 hover:bg-neutral-500"
						onClick={() => dispatch({ type: "CREATE_SLIDE_ELEMENT" })}
					>
						Insert Element
					</button>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
