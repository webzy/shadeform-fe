const InstanceOverview = ({ instance, handleInstanceDeleted }) => {
	if (!instance) {
		return (
			<div className="flex mx-auto mt-10 w-11/12 bg-gray-100 rounded-lg h-lvh">
				<p className="mx-auto font-bold text-lg mt-20">
					Select an instance to view details
				</p>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto mx-auto mt-10 w-11/12 bg-gray-100 rounded-lg mb-10">
			<div className="flex justify-between items-center px-4 py-2 rounded-t-lg">
				<div>
					<p className="text-md">{instance.name}</p>
					<p className="text-xs">
						{instance.shade_instance_type} |{' '}
						{instance.configuration.vram_per_gpu_in_gb}GB VRAM |{' '}
						{instance.configuration.vcpus} vCPU |{' '}
						{instance.configuration.memory_in_gb}GB RAM |{' '}
						{instance.configuration.storage_in_gb}GB SSD
					</p>
				</div>
				<div
					onClick={() => handleInstanceDeleted(instance.id)}
					className="bg-red-500 rounded-lg px-4 py-2 text-xs text-white cursor-pointer"
				>
					Delete Instance
				</div>
			</div>
			<p className="mt-3 text-md px-4 font-semibold">Overview</p>
			<hr className="w-5/6 ml-4 my-3" />
			<div className="grid grid-cols-2 px-4 gap-x-16">
				<p className="text-gray-500 text-sm">Name</p>
				<p className="text-gray-500 text-sm justify-center">Region</p>
				<p className="text-gray-800 text-sm mb-3">{instance.name}</p>
				<p className="text-gray-800 text-sm mb-3">{instance.region}</p>
				<p className="text-gray-500 text-sm">Base OS</p>
				<p className="text-gray-500 text-sm justify-center">ShadeCloud</p>
				<p className="text-gray-800 text-sm mb-3">
					{instance.configuration.os}
				</p>
				<p className="text-gray-800 text-sm mb-3">
					{instance.shade_cloud ? 'Enabled' : 'Disabled'}
				</p>
			</div>
			<p className="mt-3 text-md px-4 font-semibold">Connection Info</p>
			<hr className="w-5/6 ml-4 my-3" />
			<div className="grid grid-cols-2 px-4 gap-x-16">
				<p className="text-gray-500 text-sm">IP</p>
				<p className="text-gray-500 text-sm justify-center">SSH String</p>
				<p className="text-gray-800 text-sm mb-3">{instance.ip}</p>
				<p className="text-gray-800 text-sm mb-3">pending...</p>
				<p className="text-gray-500 text-sm">SSH Key</p>
				<p className="text-gray-500 text-sm justify-center"></p>
				<p className="text-gray-800 text-sm mb-3">shadeform-managed-key</p>
			</div>
			<p className="mt-3 text-md px-4 font-semibold">Instance Usage</p>
			<hr className="w-5/6 ml-4 my-3" />
			<div className="grid grid-cols-2 px-4 gap-x-16">
				<p className="text-gray-500 text-sm">Status</p>
				<p className="text-gray-500 text-sm justify-center">Hourly Cost</p>
				<p className="text-gray-800 text-sm mb-3">
					<span className="inline-flex items-center px-2 bg-green-400 text-green-700 rounded">
						Active
					</span>
				</p>
				<p className="text-gray-800 text-sm mb-3">
					${(instance.hourly_price / 100).toFixed(2)}
				</p>
				<p className="text-gray-500 text-sm">Created At</p>
				<p className="text-gray-500 text-sm justify-center">Cost Estimate</p>
				<p className="text-gray-800 text-sm mb-3">
					{new Date(instance.created_at).toLocaleString()}
				</p>
				<p className="text-gray-800 text-sm mb-3">${instance.cost_estimate}</p>
			</div>
			<p className="mt-3 text-md px-4 font-semibold">Machine Config</p>
			<hr className="w-5/6 ml-4 my-3" />
			<div className="grid grid-cols-2 px-4 gap-x-16">
				<p className="text-gray-500 text-sm">Cloud</p>
				<p className="text-gray-500 text-sm justify-center">Shadeform SKU</p>
				<p className="text-gray-800 text-sm mb-3">{instance.cloud}</p>
				<p className="text-gray-800 text-sm mb-3">
					{instance.shade_instance_type}
				</p>
				<p className="text-gray-500 text-sm">Cloud SKU</p>
				<p className="text-gray-500 text-sm justify-center">vCPUs</p>
				<p className="text-gray-800 text-sm mb-3">
					{instance.cloud_instance_type}
				</p>
				<p className="text-gray-800 text-sm mb-3">
					{instance.configuration.vcpus}
				</p>
				<p className="text-gray-500 text-sm">Memory</p>
				<p className="text-gray-500 text-sm justify-center">GPUs</p>
				<p className="text-gray-800 text-sm mb-3">
					{instance.configuration.memory_in_gb} GB
				</p>
				<p className="text-gray-800 text-sm mb-3">
					{instance.configuration.num_gpus} x {instance.configuration.gpu_type}
				</p>
				<p className="text-gray-500 text-sm">Interconnect</p>
				<p className="text-gray-500 text-sm justify-center">Volumes</p>
				<p className="text-gray-800 text-sm mb-3">
					{instance.configuration.interconnect}
				</p>
				<p className="text-gray-800 text-sm mb-3">
					{instance.configuration.storage_in_gb} GB
				</p>
			</div>
		</div>
	);
};

export default InstanceOverview;
