import React, { useState } from "react";

const HomeSection = () => {
	const [textConfig, setTextConfig] = useState({
		boldActive: false,
		italicActive: false,
		underlineActive: false,
	});
	return (
		<>
			<button
				className={`p-1 rounded hover:bg-neutral-500 ${
					textConfig.boldActive && "bg-neutral-600"
				}`}
				onMouseDown={(event) => {
					event.preventDefault();
					document.execCommand("bold", false, undefined);
					if (document.queryCommandState("Bold")) {
						setTextConfig({
							...textConfig,
							boldActive: true,
						});
					} else {
						setTextConfig({
							...textConfig,
							boldActive: false,
						});
					}
				}}
			>
				Bold
			</button>
			<button
				className={`p-1 rounded hover:bg-neutral-500 ${
					textConfig.italicActive && "bg-neutral-600"
				}`}
				onMouseDown={(event) => {
					event.preventDefault();
					document.execCommand("italic", false, undefined);
					if (document.queryCommandState("Italic")) {
						setTextConfig({
							...textConfig,
							italicActive: true,
						});
					} else {
						setTextConfig({
							...textConfig,
							italicActive: false,
						});
					}
				}}
			>
				Italic
			</button>
			<button
				className={`p-1 rounded hover:bg-neutral-500 ${
					textConfig.underlineActive && "bg-neutral-600"
				}`}
				onMouseDown={(event) => {
					event.preventDefault();
					document.execCommand("underline", false, undefined);
					if (document.queryCommandState("Underline")) {
						setTextConfig({
							...textConfig,
							underlineActive: true,
						});
					} else {
						setTextConfig({
							...textConfig,
							underlineActive: false,
						});
					}
				}}
			>
				Underline
			</button>
		</>
	);
};

export default HomeSection;
