import React from 'react';

const Pagination = ({
	handlePrev,
	handleNext,
	startIndex,
	pageSize,
	totalResults,
}) => {
	return (
		<div className="flex justify-center items-center mx-4 my-2">
			{startIndex !== 0 && (
				<button
					onClick={handlePrev}
					className="text-sm px-4 py-2 text-gray-700 disabled:opacity-50"
				>
					&lt; Previous
				</button>
			)}
			{startIndex + pageSize < totalResults && (
				<button
					onClick={handleNext}
					className="text-sm px-4 py-2 text-gray-700 disabled:opacity-50"
				>
					Next &gt;
				</button>
			)}
		</div>
	);
};

export default Pagination;
