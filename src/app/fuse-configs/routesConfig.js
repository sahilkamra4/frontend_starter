import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import LoginConfig from 'app/main/example/loginhh/LoginPageConfig.js'

const routeConfigs = [ExampleConfig,LoginConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/example" />
	},
	// {
	// 	path: '/login',
	// 	auth:['admin'],
	// 	component: () => <Redirect to="/example" />
	// }
];

export default routes;
