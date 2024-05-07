const availableGPUCounts = [1, 2, 4, 8];

const GpuCard = ({
	type,
	price,
	maxGpus,
	handleGpuSelection,
	selectedGpuType,
	selectedGpuCount,
}) => {
	const handleGpuCountSelection = (e, num) => {
		e.stopPropagation();

		if (num <= maxGpus) {
			handleGpuSelection(type, num);
		} else {
			handleGpuSelection(type);
		}
	};

	return (
		<div
			onClick={() => handleGpuSelection(type)}
			className={`bg-white rounded-lg overflow-hidden hover:border-gray-800 hover:shadow-xl cursor-pointer border transition duration-100 ${
				selectedGpuType === type ? 'border-gray-800 shadow-xl' : ''
			}`}
		>
			<div className="flex justify-between items-center px-4 py-2 rounded-t-lg">
				<p className="text-xl font-bold">NVIDIA</p>
				<div className="bg-gray-200 rounded-full px-2 py-1 text-sm text-black">
					{type}
				</div>
			</div>
			<div className="px-4 py-6">
				<div className="grid grid-cols-2 gap-x-16 gap-y-3">
					<p className="text-gray-500 text-sm">Type</p>
					<p className="text-black-800  text-sm justify-self-end">
						{type.replace('_', ' ')}
					</p>
					<p className="text-gray-500  text-sm w-24">Available Price</p>
					<p className="text-black-800  text-sm justify-self-end">
						${(price / 100).toFixed(2)}/h
					</p>
					<p className="text-gray-500  text-sm">Best Price</p>
					<p className="text-black-800  text-sm justify-self-end">
						${(price / 100).toFixed(2)}/h
					</p>
					<p className="text-gray-500  text-sm">No. of GPU's</p>
					<div className="text-sm flex  flex-row space-x-2 justify-center items-center relative justify-self-end">
						{availableGPUCounts.map(num => (
							<div
								key={num}
								onClick={e => handleGpuCountSelection(e, num)}
								className={`box-border h-6 w-6 p-2 border border-solid rounded flex justify-center items-center ${
									num <= maxGpus
										? 'hover:border-gray-800 text-black-800 cursor-pointer'
										: 'text-gray-500 cursor-not-allowed'
								} ${
									selectedGpuCount === num && selectedGpuType === type
										? 'border-gray-800'
										: ''
								}`}
							>
								{num}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GpuCard;
