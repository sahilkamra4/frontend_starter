import FuseSearch from '@fuse/core/FuseSearch';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import React from 'react';
import { useSelector } from 'react-redux';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const useStyles = makeStyles(theme => ({
	separator: {
		width: 1,
		height: 64,
		backgroundColor: theme.palette.divider
	}
}));

function ToolbarLayout1(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const toolbarTheme = useSelector(({ fuse }) => fuse.settings.toolbarTheme);

	const handleSetupCampaign = () => {
		console.log(props);
		props.history.push('/setup/campaign');
		// props.history.push('/setup/stripe');
	};
	const handleSetupStripe = () => {
		props.history.push('/setup/stripe');
	};
	const handleCodeIntegration = () => {
		props.history.push('/dashboard');
	};

	const classes = useStyles(props);
	console.log(props);
	console.log(toolbarTheme.palette.background.default);
	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className="flex relative z-10"
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.default }}
				elevation={0}
			>
				<Toolbar className="p-0">
					{config.navbar.display && config.navbar.position === 'left' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton className="w-64 h-64 p-0" />
							{/* <div className={classes.separator} /> */}
						</Hidden>
					)}
					<Grid container style={{ justifyContent: 'center' }}>
						<Grid item lg={6} md={6} sm={6} style={{ background: 'yellow', height: '50px' }}>
							<div className="flex">
								<div
									style={{
										display: 'flex',

										flexGrow: '2',
										justifyContent: 'center'
									}}
								>
									<Link onClick={handleSetupStripe}>Setup Stripe</Link>
								</div>
								<div
									style={{
										display: 'flex',

										flexGrow: '2',
										justifyContent: 'center'
									}}
								>
									<Link onClick={handleSetupCampaign}>Setup Campaign</Link>
								</div>
								<div
									style={{
										display: 'flex',

										flexGrow: '2',
										justifyContent: 'center'
									}}
								>
									<Link onClick={handleCodeIntegration}> Code Integration Links to dashboard</Link>
								</div>
								<div
									style={{
										display: 'flex',

										flexGrow: '2',
										justifyContent: 'center'
									}}
								>
									Setup Complete
								</div>
							</div>
						</Grid>
					</Grid>

					<div className="flex flex-1">
						{/* <Hidden mdDown>
							<FuseShortcuts className="px-16" />
						</Hidden> */}
					</div>

					<div className="flex">
						{/* <UserMenu /> */}

						{/* <div className={classes.separator} /> */}

						{/* <FuseSearch /> */}

						{/* <div className={classes.separator} /> */}

						{/* <LanguageSwitcher /> */}

						{/* <div className={classes.separator} /> */}

						{/* <QuickPanelToggleButton /> */}
					</div>

					{config.navbar.display && config.navbar.position === 'right' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton />
						</Hidden>
					)}
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(withRouter(ToolbarLayout1));
