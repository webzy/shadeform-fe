import { useEffect, useState } from 'react';

import InstanceCard from './InstanceCard';
import Pagination from '../../common/Pagination';

const InstanceList = ({ selectedGpuCount, selectedGpuType, instances }) => {
	const pageSize = 6;
	const availableGpuCounts = [];
	const availableCloudProviders = [];
	const initialFilters = {
		search: '',
		cloud: '',
		availability: '',
		gpuCount: selectedGpuCount || '',
	};
	const instancesByGpu = instances.filter(
		instance => instance.gpu_type === selectedGpuType
	);

	const [filters, setFilters] = useState({ ...initialFilters });
	const [startIndex, setStartIndex] = useState(0);

	const handleNext = () => {
		if (startIndex + pageSize < filterInstances().length) {
			setStartIndex(startIndex + pageSize);
		}
	};

	const handlePrev = () => {
		if (startIndex - pageSize >= 0) {
			setStartIndex(startIndex - pageSize);
		}
	};

	useEffect(() => {
		setFilters({ ...initialFilters });
	}, [selectedGpuCount, selectedGpuType]);

	const handleFilterChange = e => {
		const updatedFilters = { ...filters, [e.target.name]: e.target.value };
		setFilters(updatedFilters);
	};

	const filterInstances = () => {
		return instancesByGpu.filter(instance => {
			if (
				filters.search &&
				!instance.cloud.includes(filters.search.toLowerCase())
			) {
				return false;
			}

			if (filters.cloud && filters.cloud !== instance.cloud) {
				return false;
			}

			if (
				filters.availability === 'true' &&
				!instance.availability.some(
					region => region.available.toString() === filters.availability
				)
			) {
				return false;
			}

			if (
				filters.availability === 'false' &&
				!instance.availability.every(
					region => region.available.toString() === filters.availability
				)
			) {
				return false;
			}

			if (
				filters.gpuCount &&
				parseInt(filters.gpuCount) !== instance.num_gpus
			) {
				return false;
			}

			return true;
		});
	};

	instancesByGpu.forEach(instance => {
		if (!availableGpuCounts.includes(instance.configuration.num_gpus)) {
			availableGpuCounts.push(instance.configuration.num_gpus);
		}

		if (!availableCloudProviders.includes(instance.cloud)) {
			availableCloudProviders.push(instance.cloud);
		}
	});

	return (
		<div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8 bg-gray-100">
			<div className="py-4">
				<input
					type="text"
					name="search"
					placeholder="Search..."
					value={filters.search}
					onChange={handleFilterChange}
					className="p-2 mb-2 mr-2 border rounded-lg"
				/>
				<select
					name="gpuCount"
					value={filters.gpuCount}
					onChange={handleFilterChange}
					className="p-2 mb-2 mr-2 border rounded-lg"
				>
					<option value="">Num GPUs</option>
					{availableGpuCounts
						.sort((a, b) => a - b)
						.map(count => (
							<option key={count} value={count} onClick={handleFilterChange}>
								{count}
							</option>
						))}
				</select>
				<select
					name="cloud"
					value={filters.cloud}
					onChange={handleFilterChange}
					className="p-2 mb-2 mr-2 border rounded-lg"
				>
					<option value="">Cloud Provider</option>
					{availableCloudProviders.sort().map(provider => (
						<option
							key={provider}
							value={provider}
							onClick={handleFilterChange}
						>
							{provider}
						</option>
					))}
				</select>
				<select
					name="availability"
					value={filters.availability}
					onChange={handleFilterChange}
					className="p-2 mb-2 mr-2 border rounded-lg"
				>
					<option value="">Availability</option>
					<option value={true}>Available</option>
					<option value={false}>Unavailable</option>
				</select>
			</div>
			<Pagination
				handlePrev={handlePrev}
				handleNext={handleNext}
				startIndex={startIndex}
				pageSize={pageSize}
				totalResults={filterInstances().length}
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{filterInstances()
					.slice(startIndex, startIndex + pageSize)
					.map(instance => (
						<InstanceCard
							key={`${instance.cloud}-${instance.shade_instance_type}`}
							instance={instance}
						/>
					))}
			</div>
		</div>
	);
};

export default InstanceList;
