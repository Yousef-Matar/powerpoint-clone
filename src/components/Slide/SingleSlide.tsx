import React from "react";
import { useDispatch } from "react-redux";

const SingleSlide = (props: { slide: slide; navigation?: boolean }) => {
	const dispatch = useDispatch();
	const selectSlide = (slideID: string) => {
		dispatch({ type: "SELECT_SLIDE", payload: slideID });
	};
	return (
		<div
			className={`bg-white dark:bg-black rounded p-3 ${
				props.navigation
					? `h-[25vh] overflow-hidden cursor-pointer ${
							props.slide.active &&
							"border-4 border-slate-900 dark:border-slate-500"
					  }`
					: "h-full"
			}`}
			{...(props.navigation &&
				!props.slide.active && {
					onClick: () => selectSlide(props.slide.id),
				})}
		>
			<div style={{ zoom: props.navigation ? "0.6" : "1" }}>
				{props.slide.header}
			</div>
			<div style={{ zoom: props.navigation ? "0.5" : "1" }}>
				{props.slide.subHeader}
			</div>
		</div>
	);
};

export default SingleSlide;
