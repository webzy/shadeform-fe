import { useRef, useState } from 'react';

import Spinner from '../common/Spinner';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const Launch = () => {
	const toggleRef = useRef(null);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [launchError, setLaunchError] = useState('');
	const [selectedInstance, setSelectedInstance] = useState({});
	const [settings, setSettings] = useState({
		cloud: searchParams.get('cloud'),
		shadeInstanceType: searchParams.get('shadeInstanceType'),
		region: '',
		shadeCloud: false,
		name: '',
	});

	const { data, isPending, error } = useFetch(
		`${process.env.REACT_APP_BASE_URL}/instances/types`
	);

	const handleSettingsChange = e => {
		const updatedSettings = { ...settings, [e.target.name]: e.target.value };
		setSettings(updatedSettings);
	};

	const handleSubmit = () => {
		if (!settings.name) {
			setLaunchError('Machine name is required');
			return;
		}

		fetch(`${process.env.REACT_APP_BASE_URL}/instance`, {
			method: 'POST',
			body: JSON.stringify({ ...settings, os: getOSSystem() }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				navigate('/instances');
			})
			.catch(err => {
				console.error(err);
				setLaunchError('failed to create instance');
			});
	};

	const getOSSystem = () => {
		// default to first os since this field is not required
		let os = selectedInstance.configuration.os_options[0].split('_');
		return os.slice(0, os.length - 2).join(' + ');
	};

	if (data && Object.keys(selectedInstance).length === 0) {
		const targetInstance = data.filter(instance => {
			return (
				instance.cloud === searchParams.get('cloud') &&
				instance.shade_instance_type === searchParams.get('shadeInstanceType')
			);
		})[0];

		const firstAvailableRegion = targetInstance.availability.find(
			location => location.available
		).region;

		setSelectedInstance(targetInstance);
		setSettings({
			...settings,
			cloud: targetInstance.cloud,
			region: firstAvailableRegion,
		});
	}

	if (!searchParams.get('cloud') || !searchParams.get('shadeInstanceType')) {
		navigate('/');
	}

	return (
		<>
			{isPending && <Spinner />}
			{error && (
				<p className="text-xl font-bold mt-10 mx-auto w-3/4">
					Something went wrong, please try again later
				</p>
			)}
			{Object.keys(selectedInstance).length > 0 && (
				<>
					<p className="mx-8 mt-8 text-xl font-bold">Launch your instance!</p>
					<p className="mx-8 text-sm">
						Configure your settings and click launch below
					</p>
					<div className="flex-row lg:w-1/2 md:w-3/4 sm:w-4/5 mx-auto">
						<div className="p-6">
							<div className="bg-gray-100 p-4 rounded-lg">
								<h2 className="text-lg font-bold">{selectedInstance.cloud}</h2>
								<p className="text-sm text-gray-600">
									{selectedInstance.shade_instance_type} |{' '}
									{selectedInstance.configuration.vram_per_gpu_in_gb}GB VRAM
								</p>
								<div className="flex justify-between">
									<div className="my-4">
										<label
											className="block text-gray-700 text-sm font-bold mb-2"
											htmlFor="name"
										>
											Machine Name *
										</label>
										<input
											name="name"
											type="text"
											placeholder="Enter name"
											onChange={handleSettingsChange}
											className="border rounded-lg w-full py-2 px-3 text-gray-700"
										/>
									</div>
									<div className="my-4 w-40">
										<label
											className="block text-gray-700 text-sm font-bold mb-2"
											htmlFor="region"
										>
											Region
										</label>
										<select
											name="region"
											value={settings.region}
											onChange={handleSettingsChange}
											className="p-2 mb-2 mr-2 border w-full rounded-lg"
										>
											{selectedInstance.availability.map(location => (
												<option
													key={location.region}
													value={location.region}
													onClick={handleSettingsChange}
												>
													{location.region}
												</option>
											))}
										</select>
									</div>
									<div className="my-4">
										<label
											className="block text-gray-700 text-sm font-bold mb-2"
											htmlFor="toggle"
										>
											ShadeCloud
										</label>
										<label class="inline-flex items-center cursor-pointer mt-2">
											<input
												ref={toggleRef}
												name="shadeCloud"
												type="checkbox"
												value=""
												class="sr-only peer"
												checked={settings.shadeCloud}
												onClick={() =>
													setSettings({
														...settings,
														shadeCloud: toggleRef.current.checked,
													})
												}
											/>
											<div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
										</label>
									</div>
								</div>
							</div>
						</div>

						<div className="p-6">
							<div className="bg-gray-100 p-4 rounded-lg border-black border">
								<p className="text-md font-bold mb-4">Review</p>
								<div className="grid grid-cols-2 gap-8">
									<div className="flex-row space-y-6 text-sm text-gray-500">
										<p>Name</p>
										<p>Region</p>
										<p>ShadeCloud</p>
										<p>OS</p>
										<p>Cloud</p>
										<p>Compute Type</p>
										<p>Shadeform SKU</p>
										<p>Cloud SKU</p>
										<p>vCPUs</p>
										<p>Memory</p>
										<p>GPUs</p>
										<p>Interconnect</p>
										<p>Storage</p>
										<p>Hourly Price</p>
										<p>Boot Time</p>
									</div>
									<div className="flex-row space-y-6 text-sm text-gray-800">
										<p>{settings.name || 'Required'}</p>
										<p>{settings.region}</p>
										<p>{settings.shadeCloud ? 'Enabled' : 'Disabled'}</p>
										<p>{getOSSystem()}</p>
										<p>{selectedInstance.cloud}</p>
										<p>vm</p>
										<p>{selectedInstance.shade_instance_type}</p>
										<p>{selectedInstance.cloud_instance_type}</p>
										<p>{selectedInstance.configuration.vcpus}</p>
										<p>{selectedInstance.configuration.memory_in_gb}GB</p>
										<p>
											{selectedInstance.configuration.num_gpus} x{' '}
											{selectedInstance.configuration.gpu_type}
										</p>
										<p>{selectedInstance.configuration.interconnect}</p>
										<p>{selectedInstance.configuration.storage_in_gb}GB</p>
										<p>${(selectedInstance.hourly_price / 100).toFixed(2)}</p>
										<p>1 second</p>
									</div>
								</div>
								<button
									onClick={handleSubmit}
									className="rounded-lg text-sm px-2 py-1 bg-blue-600 text-white mt-8 hover:bg-blue-700 w-full"
								>
									Launch
								</button>
								<p className="mt-2 text-sm text-red-400">{launchError}</p>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Launch;
