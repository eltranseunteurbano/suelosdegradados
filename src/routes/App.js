import React from 'react';
import moment from 'moment';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as routes from './Routes';
import { ContextProvider } from '../context/Context';

import Home from '../components/Home';

moment.locale('es');

const App = () => {
	return (
		<BrowserRouter>
			<ContextProvider>
				<Switch>
					<Route exact path={routes.HOME} component={Home} />
				</Switch>
			</ContextProvider>
		</BrowserRouter>
	);
};

export default App;
