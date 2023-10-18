import React from "react";
import SlideView from "./util/SlideLayout/SlideView";
import SlideNavigation from "./util/SlideNavigation/SlideNavigation";

const LayoutView = () => {
	return (
		<div className="flex flex-1">
			<SlideNavigation />
			<div className="border-r border-slate-600"></div>
			<SlideView />
		</div>
	);
};

export default LayoutView;
