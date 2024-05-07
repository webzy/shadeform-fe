import InstanceOverview from './InstanceOverview';
import InstanceTable from './InstanceTable';
import Pagination from '../common/Pagination';
import Spinner from '../common/Spinner';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Instances = () => {
	const [instances, setInstances] = useState(null);
	const [selectedInstance, setSelectedInstance] = useState(null);
	const navigate = useNavigate();
	const { data, isPending, error } = useFetch(
		`${process.env.REACT_APP_BASE_URL}/instances`
	);

	if (data && !instances) {
		setInstances(data);
	}

	const handleDelete = id => {
		fetch(`${process.env.REACT_APP_BASE_URL}/instance/${id}/delete`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(() => {
				const newInstances = instances.filter(instance => instance.id !== id);
				setSelectedInstance(null);
				setInstances(newInstances);
			})
			.catch(err => {
				console.error(err);
			});
	};

	return (
		<>
			{isPending && <Spinner />}
			{error && (
				<p className="text-xl font-bold mt-10 mx-auto w-3/4">
					Something went wrong, please try again later
				</p>
			)}
			{instances && (
				<>
					<p className="mx-8 my-6 text-xl font-bold">Running instances</p>
					{instances.length === 0 ? (
						<p className="mx-8 my-6 text-sm">
							You have no running instances. Visit the{' '}
							<span
								onClick={() => navigate('/')}
								className="text-blue-700 cursor-pointer"
							>
								Marketplace
							</span>{' '}
							to launch an instance
						</p>
					) : (
						<>
							<InstanceTable
								instances={instances}
								handleInstanceSelect={instance => setSelectedInstance(instance)}
							/>
							<InstanceOverview
								instance={selectedInstance}
								handleInstanceDeleted={handleDelete}
							/>
						</>
					)}
				</>
			)}
		</>
	);
};

export default Instances;
