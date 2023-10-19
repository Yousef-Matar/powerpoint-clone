import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../util/Debounce";

const SingleSlide = (props: { slide: slide; navigation: boolean }) => {
	const dispatch = useDispatch();
	const [initialSlide, setInitialSlide] = useState(props.slide);
	const selectSlide = (slideID: string) => {
		dispatch({ type: "SELECT_SLIDE", payload: slideID });
	};
	const updateSlide = (slide: slide) => {
		setInitialSlide(slide);
		updateStore(slide);
	};
	const _updateStore = (slide: slide) => {
		dispatch({ type: "UPDATE_SLIDE", payload: slide });
	};
	const updateStore = useDebounce(_updateStore, 300);
	useEffect(() => {
		setInitialSlide(props.slide);
	}, [props.slide]);

	return (
		<div
			className={`bg-white dark:bg-black rounded p-3 ${
				props.navigation
					? `h-[25vh] overflow-hidden cursor-pointer ${
							initialSlide.active &&
							"border-4 border-slate-900 dark:border-slate-500"
					  }`
					: "h-full"
			}`}
			{...(props.navigation &&
				!initialSlide.active && {
					onClick: () => selectSlide(initialSlide.id),
				})}
			title={props.navigation ? initialSlide.header : undefined}
		>
			<ContentEditable
				className={`w-full bg-transparent rounded text-3xl ${
					!props.navigation && "p-5 border border-dashed"
				}`}
				style={{ zoom: props.navigation ? "0.6" : "1" }}
				html={
					initialSlide.header.length
						? initialSlide.header
						: props.navigation
						? ""
						: "Click to add title"
				}
				disabled={props.navigation}
				onChange={(event) =>
					updateSlide({
						...initialSlide,
						header: event.currentTarget.innerHTML,
					})
				}
			/>
			<ContentEditable
				className={`w-full bg-transparent rounded text-xl ${
					!props.navigation && "p-5 border border-dashed"
				}`}
				style={{ zoom: props.navigation ? "0.6" : "1" }}
				html={
					initialSlide.subHeader.length
						? initialSlide.subHeader
						: props.navigation
						? ""
						: "Click to add subtitle"
				}
				disabled={props.navigation}
				onChange={(event) =>
					updateSlide({
						...initialSlide,
						subHeader: event.currentTarget.innerHTML,
					})
				}
			/>
		</div>
	);
};

export default SingleSlide;
