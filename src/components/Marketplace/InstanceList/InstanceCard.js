import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const InstanceCard = ({ instance }) => {
	const tabs = [
		{ title: 'GPU', id: 0 },
		{ title: 'Specs', id: 1 },
	];
	const availability = instance.availability.reduce(
		(total, num) => total + (num.available ? 1 : 0),
		0
	);
	const [selectedTab, setSelectedTab] = useState(tabs[0]);
	const navigate = useNavigate();

	const displayGPUData = () => {
		return (
			<>
				<div className="flex justify-between items-center px-4 py-2 rounded-t-lg">
					<p className="text-l font-bold">{instance.cloud}</p>
					<div
						className={`w-2 h-2 rounded-full ${
							availability > 0 ? 'bg-green-500' : 'bg-red-500'
						}`}
					></div>
				</div>
				<div className="px-4 py-2">
					<div className="grid grid-cols-2 gap-x-16 gap-y-3">
						<p className="text-gray-500 text-sm">Price/hr</p>
						<p className="text-black-800 text-sm justify-self-end font-bold">
							${(instance.hourly_price / 100).toFixed(2)}
						</p>
						<p className="text-gray-500  text-sm">Type</p>
						<p className="text-black-800 text-sm justify-self-end font-bold">
							{instance.shade_instance_type}
						</p>
						<p className="text-gray-500  text-sm">Availability</p>
						<p className="text-black-800 text-sm justify-self-end font-bold w-20 pl-2">
							{availability
								? `${availability} Region${availability > 1 ? 's' : ''}`
								: 'Unavailable'}
						</p>
						<div></div>
					</div>
				</div>
			</>
		);
	};

	const displaySpecsData = () => {
		return (
			<div className="px-4 py-2">
				<div className="grid grid-cols-2 gap-x-16 gap-y-3">
					<p className="text-gray-500 text-sm w-24">Total VRAM</p>
					<p className="text-black-800 text-sm justify-self-end font-bold">
						{instance.configuration.vram_per_gpu_in_gb} GB
					</p>
					<p className="text-gray-500  text-sm w-24">Memory In GB</p>
					<p className="text-black-800 text-sm justify-self-end font-bold">
						{instance.configuration.memory_in_gb} GB
					</p>
					<p className="text-gray-500  text-sm w-24">VCPU</p>
					<p className="text-black-800 text-sm justify-self-end font-bold">
						{instance.configuration.vcpus}
					</p>
					<p className="text-gray-500  text-sm w-24">Storage</p>
					<p className="text-black-800 text-sm justify-self-end font-bold">
						{instance.configuration.storage_in_gb} GB
					</p>
					<p className="text-gray-500  text-sm w-24">NVLink</p>
					<p className="text-black-800 text-sm justify-self-end font-bold w-28 pl-2">
						{instance.nvlink ? 'Supported' : 'Not Supported'}
					</p>
					<div></div>
				</div>
			</div>
		);
	};

	const generateLaunchUrl = () => {
		return encodeURI(
			`/launch?cloud=${instance.cloud}&shadeInstanceType=${instance.shade_instance_type}`
		);
	};

	return (
		<div className="bg-white rounded-lg overflow-hidden border mb-10">
			<div className="w-28 mx-auto flex justify-center items-center m-4 bg-white rounded-lg border">
				{tabs.map(tab => (
					<button
						key={tab.id}
						onClick={() => setSelectedTab(tab)}
						className={`rounded-lg text-sm px-2 py-1 disabled:opacity-50 ${
							tab.id === selectedTab.id
								? 'bg-gray-800 text-white'
								: 'text-gray-700'
						}`}
					>
						{tab.title}
					</button>
				))}
			</div>
			{selectedTab.id === 0 ? displayGPUData() : displaySpecsData()}
			{availability > 0 && (
				<div
					onClick={() => navigate(generateLaunchUrl())}
					className="bg-blue-600 justify-self-end rounded-full px-2 w-16 ml-auto m-2 py-1 text-sm text-white cursor-pointer border transition duration-100"
				>
					Launch
				</div>
			)}
		</div>
	);
};

export default InstanceCard;
