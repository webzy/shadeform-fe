import Pagination from '../common/Pagination';
import { useState } from 'react';

const InstanceTable = ({ instances, handleInstanceSelect }) => {
	const pageSize = 6;
	const [search, setSearch] = useState('');
	const [startIndex, setStartIndex] = useState(0);

	const handleSearch = e => {
		setSearch(e.target.value);
		handleInstanceSelect(null);
	};

	const handleNext = () => {
		if (startIndex + pageSize < filteredInstances().length) {
			setStartIndex(startIndex + pageSize);
			handleInstanceSelect(null);
		}
	};

	const handlePrev = () => {
		if (startIndex - pageSize >= 0) {
			setStartIndex(startIndex - pageSize);
			handleInstanceSelect(null);
		}
	};

	const filteredInstances = () => {
		if (!search) return instances;

		return instances.filter(
			instance =>
				instance.cloud.toLowerCase().includes(search.toLowerCase()) ||
				instance.name.toLowerCase().includes(search.toLowerCase())
		);
	};

	return (
		<div className="overflow-x-auto mx-auto w-11/12">
			<input
				type="text"
				name="search"
				placeholder="Search..."
				value={search}
				onChange={handleSearch}
				className="mx-8 p-2 mb-4 border rounded-lg"
			/>
			<table className="w-full table-auto bg-gray-300 font-light text-gray-500 text-sm rounded-lg">
				<thead>
					<tr className="text-left">
						<th className="px-4 py-2 font-light">Cloud</th>
						<th className="px-4 py-2 font-light">Name</th>
						<th className="px-4 py-2 font-light">IP Address</th>
						<th className="px-4 py-2 font-light">Region</th>
						<th className="px-4 py-2 font-light">Instance Type</th>
						<th className="px-4 py-2 font-light">Launch Type</th>
						<th className="px-4 py-2 font-light">Status</th>
					</tr>
				</thead>
				<tbody>
					{filteredInstances()
						.slice(startIndex, startIndex + pageSize)
						.map(instance => {
							return (
								<tr
									key={instance.id}
									onClick={() => handleInstanceSelect(instance)}
									className="bg-gray-100 border-y text-left hover:bg-gray-200 cursor-pointer"
								>
									<td className="px-4 py-2 ">{instance.cloud}</td>
									<td className="px-4 py-2">{instance.name}</td>
									<td className="px-4 py-2">{instance.ip}</td>
									<td className="px-4 py-2">{instance.region}</td>
									<td className="px-4 py-2">{instance.shade_instance_type}</td>
									<td className="px-4 py-2">vm</td>
									<td className="px-4 py-2">
										<div className="inline-flex items-center px-2 py-1 bg-green-400 text-green-700 rounded">
											Active
										</div>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
			<Pagination
				handlePrev={handlePrev}
				handleNext={handleNext}
				startIndex={startIndex}
				pageSize={pageSize}
				totalResults={filteredInstances().length}
			/>
		</div>
	);
};

export default InstanceTable;
