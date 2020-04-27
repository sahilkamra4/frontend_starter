import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import LoginConfig from 'app/main/example/loginhh/LoginPageConfig.js'
import SetupConfig from 'app/main/example/SetupPage/SetupConfig'

const routeConfigs = [ExampleConfig,LoginConfig,SetupConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		
		component: () => <Redirect to="/example" />
	},
	{
		path: '/example',
		
		component: () => <Redirect to="/setup" />
	}
	// {
	// 	path: '/login',
	// 	auth:['admin'],
	// 	component: () => <Redirect to="/example" />
	// }
];

export default routes;
