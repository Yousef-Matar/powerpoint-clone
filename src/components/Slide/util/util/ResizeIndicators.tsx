import React from "react";

const ResizeIndicators = (props: {
	zIndex: number;
	resizeFunction: Function;
}) => {
	return (
		<>
			<div
				className="resize-indicator top-left bg-neutral-800 absolute  w-2 h-2 rounded-full cursor-nwse-resize -left-1 -top-1"
				style={{ zIndex: props.zIndex + 1 }}
				onMouseDown={(event) => {
					event.stopPropagation();
					props.resizeFunction(event);
				}}
			/>
			<div
				className="resize-indicator middle-left bg-neutral-800 absolute  w-2 h-2 rounded-full cursor-ew-resize -left-1 top-[calc(50%-4px)]"
				style={{ zIndex: props.zIndex + 1 }}
				onMouseDown={(event) => {
					event.stopPropagation();
					props.resizeFunction(event);
				}}
			/>
			<div
				className="resize-indicator top-middle bg-neutral-800 absolute  w-2 h-2 rounded-full cursor-ns-resize left-[calc(50%-4px)] -top-1"
				style={{ zIndex: props.zIndex + 1 }}
				onMouseDown={(event) => {
					event.stopPropagation();
					props.resizeFunction(event);
				}}
			/>
			<div
				className="resize-indicator bottom-left bg-neutral-800 absolute  w-2 h-2 rounded-full cursor-nesw-resize -left-1 -bottom-1"
				style={{ zIndex: props.zIndex + 1 }}
				onMouseDown={(event) => {
					event.stopPropagation();
					props.resizeFunction(event);
				}}
			/>
			<div
				className="resize-indicator top-right bg-neutral-800 absolute  w-2 h-2 rounded-full cursor-nesw-resize -right-1 -top-1"
				style={{ zIndex: props.zIndex + 1 }}
				onMouseDown={(event) => {
					event.stopPropagation();
					props.resizeFunction(event);
				}}
			/>
			<div
				className="resize-indicator bottom-middle bg-neutral-800 absolute  w-2 h-2 rounded-full cursor-ns-resize left-[calc(50%-4px)] -bottom-1"
				style={{ zIndex: props.zIndex + 1 }}
				onMouseDown={(event) => {
					event.stopPropagation();
					props.resizeFunction(event);
				}}
			/>
			<div
				className="resize-indicator middle-right bg-neutral-800 absolute  w-2 h-2 rounded-full cursor-ew-resize -right-1 top-[calc(50%-4px)]"
				style={{ zIndex: props.zIndex + 1 }}
				onMouseDown={(event) => {
					event.stopPropagation();
					props.resizeFunction(event);
				}}
			/>
			<div
				className="resize-indicator bottom-right bg-neutral-800 absolute  w-2 h-2 rounded-full cursor-nwse-resize -right-1 -bottom-1"
				style={{ zIndex: props.zIndex + 1 }}
				onMouseDown={(event) => {
					event.stopPropagation();
					props.resizeFunction(event);
				}}
			/>
		</>
	);
};

export default ResizeIndicators;
