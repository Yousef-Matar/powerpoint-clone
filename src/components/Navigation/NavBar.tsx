import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const useDidMount = () => {
	const [didMount, setDidMount] = useState(false);
	useEffect(() => {
		setDidMount(true);
	}, []);

	return didMount;
};
const NavBar = () => {
	const didMount = useDidMount();
	const dispatch = useDispatch();
	const [tabs, setTabs] = useState([
		{ text: "Home", visible: true },
		{ text: "Insert", visible: false },
	]);
	const [slideType, setSlideType] = useState("text");
	const createSlide = () => {
		dispatch({ type: "CREATE_SLIDE", payload: slideType });
	};
	const handleTabClick = (
		clickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		clickedTab: NavTab
	) => {
		switch (clickEvent.detail) {
			case 1: {
				setTabs(
					[...tabs].map((tab) => {
						if (tab.text === clickedTab.text) {
							document
								.getElementById(
									`${tab.text.toLowerCase()}-content`
								)
								?.setAttribute("class", "flex gap-3");
							return {
								...tab,
								visible: true,
							};
						} else {
							document
								.getElementById(
									`${tab.text.toLowerCase()}-content`
								)
								?.setAttribute("class", "hidden");
							return {
								...tab,
								visible: false,
							};
						}
					})
				);
				break;
			}
			case 2: {
				setTabs(
					[...tabs].map((tab) => {
						document
							.getElementById(`${tab.text.toLowerCase()}-content`)
							?.setAttribute("class", "hidden");
						return {
							...tab,
							visible: false,
						};
					})
				);
				break;
			}
			default: {
				break;
			}
		}
	};
	useEffect(() => {
		if (didMount) createSlide();
	}, [slideType]);

	return (
		<div id="nav-bar">
			<div className="flex gap-1 min-w-full">
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
			</div>
			<div className="flex items-center flex-wrap px-1 bg-slate-500 dark:bg-slate-900">
				<div id="home-content" className="flex gap-3">
					Home Tab
				</div>
				<div id="insert-content" className="hidden">
					<div className="inline-flex">
						<button
							className="p-1 border border-slate-900 dark:bg-slate-500 rounded-l border-r-0"
							onClick={createSlide}
						>
							New Slide
						</button>
						<select
							className="p-1 border border-slate-900 dark:bg-slate-500 rounded-r border-l-0 w-5 text-sm"
							onChange={(event) =>
								setSlideType(event.target.value)
							}
						>
							<option value="text">Title Slide</option>
							<option value="image">Image Slide</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
