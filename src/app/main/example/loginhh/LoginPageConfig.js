import React from 'react';
import Login from './LoginPage';

const LoginPageConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	// auth:null,
	routes: [
		{
			path: '/login',
			// component: React.lazy(() => import('./LoginPage'))
			component:Login
		}
	]
};

export default LoginPageConfig;
