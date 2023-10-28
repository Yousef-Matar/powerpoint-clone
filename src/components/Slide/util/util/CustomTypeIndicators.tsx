import React from "react";

const CustomTypeIndicators = () => {
	return (
		<div className="flex flex-wrap gap-1 absolute z-10 w-5 h-5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<div className=" w-5 h-5 opacity-50 hover:opacity-80 cursor-pointer bg-red-500">
				Image
			</div>
		</div>
	);
};

export default CustomTypeIndicators;
