import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import LoginConfig from 'app/main/example/loginhh/LoginPageConfig.js';
import SetupConfig from 'app/main/example/SetupPage/SetupConfig';
import SetupCampaignConfig from 'app/main/example/SetupPage/SetupCampaignConfig';

const routeConfigs = [ExampleConfig, LoginConfig, SetupConfig, SetupCampaignConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		auth: ['admin_new'],
		component: () => <Redirect to="/setup/stripe" />
	},
	{
		path: '/dashboard',
		auth: ['admin_new'],
		component: () => <Redirect to="/setup/stripe" />
	},
	{
		path: '/',

		component: () => <Redirect to="/login" />
	}
];

export default routes;
