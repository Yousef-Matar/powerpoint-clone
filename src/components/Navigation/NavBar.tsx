import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { slideElementType } from "../../constants/SlideElementTypes.enum";
import { createSlide, createSlideElement } from "../../store/actions/actions";
import HomeSection from "./util/HomeSection";
const NavBar = () => {
	const dispatch = useDispatch();
	const imageUploaderRef = useRef<HTMLInputElement | null>(null);
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
	const handleImageUpload = () => {
		if (imageUploaderRef.current?.files) {
			dispatch(
				createSlideElement({
					type: slideElementType.image,
					content: URL.createObjectURL(
						imageUploaderRef.current.files?.[0]
					),
					size: { width: 50, height: 50 },
				})
			);
		}
		if (imageUploaderRef.current) {
			imageUploaderRef.current.value = "";
		}
	};
	return (
		<div id="nav-bar">
			<>
				<input
					ref={imageUploaderRef}
					type="file"
					id="image-upload"
					className="hidden"
					accept="image/*"
					onChange={handleImageUpload}
				/>
			</>
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
					<HomeSection />
				</div>
				<div
					className="gap-3"
					style={{
						display: activeTab === "insert" ? "flex" : "none",
					}}
				>
					<button
						className="p-1 rounded focus:bg-neutral-600 hover:bg-neutral-500"
						onClick={() => dispatch(createSlide())}
					>
						New Slide
					</button>
					<button
						className="p-1 rounded focus:bg-neutral-600 hover:bg-neutral-500"
						onClick={() => dispatch(createSlideElement())}
					>
						Insert Element
					</button>
					<button
						className="p-1 rounded focus:bg-neutral-600 hover:bg-neutral-500"
						onClick={() => imageUploaderRef.current?.click()}
					>
						Insert Image
					</button>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
