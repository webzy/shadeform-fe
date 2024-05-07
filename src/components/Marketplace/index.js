import GpuList from './GpuList';
import InstanceList from './InstanceList';
import { uniqBy } from 'lodash';
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';

const Marketplace = () => {
	const [selectedGpuType, setSelectedGpuType] = useState('');
	const [selectedGpuCount, setSelectedGpuCount] = useState(null);
	const [instanceTypes, setInstanceTypes] = useState([]);
	const { data, isPending, error } = useFetch(
		`${process.env.REACT_APP_BASE_URL}/instances/types`
	);

	if (data && instanceTypes.length === 0) {
		setInstanceTypes(data);
	}

	const uniqueGpuTypes = () => {
		const sortedData = instanceTypes.sort(
			(a, b) => b.configuration.num_gpus - a.configuration.num_gpus
		);
		const uniqueGpus = uniqBy(sortedData, 'gpu_type');
		return uniqueGpus;
	};

	const handleGpuSelection = (gpuType, gpuCount = null) => {
		setSelectedGpuType(gpuType);
		setSelectedGpuCount(gpuCount);
	};

	return (
		<>
			{isPending && <div>Loading....</div>}
			{error && (
				<p className="text-xl font-bold mt-10 mx-auto w-3/4">
					Something went wrong, please try again later
				</p>
			)}
			{instanceTypes.length > 0 && (
				<>
					<p className="mx-8 mt-8 text-xl font-bold">
						Welcome to our Marketplace!
					</p>
					<p className="mx-8 text-sm">
						Let's start by filtering between these options to display GPUs
					</p>
					<GpuList
						instanceTypes={uniqueGpuTypes()}
						handleGpuSelection={handleGpuSelection}
						selectedGpuType={selectedGpuType}
						selectedGpuCount={selectedGpuCount}
					/>
				</>
			)}
			{selectedGpuType && (
				<InstanceList
					selectedGpuCount={selectedGpuCount}
					selectedGpuType={selectedGpuType}
					instances={instanceTypes}
				/>
			)}
		</>
	);
};

export default Marketplace;
