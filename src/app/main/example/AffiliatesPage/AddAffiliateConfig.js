import i18next from 'i18next';
import CampaignsEdit from './CampaignsEdit';
// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';
import { authRoles } from 'app/auth';

// i18next.addResourceBundle('en', 'examplePage', en);
// i18next.addResourceBundle('tr', 'examplePage', tr);
// i18next.addResourceBundle('ar', 'examplePage', ar);

const SetupConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: true
				}
				// toolbar: {
				// 	display: true
				// }
			}
		}
	},
	auth: authRoles.admin,
	routes: [
		{
			path: '/campaigns/cid/edit',
			component: CampaignsEdit
		}
	]
};

export default SetupConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default ExampleConfig;

*/
