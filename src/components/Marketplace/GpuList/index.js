import GpuCard from './GpuCard';
import Pagination from '../../common/Pagination';
import { useState } from 'react';

const GpuList = ({
	instanceTypes,
	handleGpuSelection,
	selectedGpuType,
	selectedGpuCount,
}) => {
	const pageSize = 6;
	const [startIndex, setStartIndex] = useState(0);
	const instancesToDisplay = instanceTypes.slice(
		startIndex,
		startIndex + pageSize
	);

	const handleNext = () => {
		if (startIndex + pageSize < instanceTypes.length) {
			setStartIndex(startIndex + pageSize);
		}
	};

	const handlePrev = () => {
		if (startIndex - pageSize >= 0) {
			setStartIndex(startIndex - pageSize);
		}
	};

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8">
			<Pagination
				handlePrev={handlePrev}
				handleNext={handleNext}
				startIndex={startIndex}
				pageSize={pageSize}
				totalResults={instanceTypes.length}
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{instancesToDisplay.map(instance => (
					<GpuCard
						key={instance.configuration.gpu_type}
						type={instance.configuration.gpu_type}
						price={instance.hourly_price}
						maxGpus={instance.num_gpus}
						handleGpuSelection={handleGpuSelection}
						selectedGpuType={selectedGpuType}
						selectedGpuCount={selectedGpuCount}
					/>
				))}
			</div>
		</div>
	);
};

export default GpuList;
