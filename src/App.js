import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Instances from './components/Instances';
import Launch from './components/Launch';
import Marketplace from './components/Marketplace';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Marketplace />} />
				<Route path="/launch" element={<Launch />} />
				<Route path="/instances" element={<Instances />} />
				<Route
					path="/*"
					element={
						<h1 style={{ marginTop: '40%', marginLeft: '40%' }}>
							404 Page not found
						</h1>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
