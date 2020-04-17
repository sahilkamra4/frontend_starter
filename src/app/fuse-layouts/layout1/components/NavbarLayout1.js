import FuseScrollbars from '@fuse/core/FuseScrollbars';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import NavbarFoldedToggleButton from 'app/fuse-layouts/shared-components/NavbarFoldedToggleButton';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';
import UserNavbarHeader from 'app/fuse-layouts/shared-components/UserNavbarHeader';
import clsx from 'clsx';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme=>({
	content: {
		overflowX: 'hidden',
		overflowY: 'auto',
		'-webkit-overflow-scrolling': 'touch',
		background:
			'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100% 40px, 100% 10px',
		backgroundAttachment: 'local, scroll'
	},
	title:{
		display:"none"
		
	}


}));

function NavbarLayout1(props) {
	const classes = useStyles();
	const theme = useTheme();
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const navbarStatus=useSelector(({ fuse }) => fuse.navbar)
	console.log(config)
	return (
		<div className={clsx('flex flex-col overflow-hidden h-full', props.className)}>
			<AppBar
				color="primary"
				position="static"
				elevation={0}
				className="flex flex-row items-center flex-shrink h-64 min-h-64 px-12"
				style={{backgroundColor:"#FFF"}}
			>
				<div className="flex flex-1 mx-8">
					{/* <Logo /> */}
				</div>

				<Hidden mdDown>
					<Grid container alignItems="center">
						<Grid item lg={8} md={8} sm={8} xs={8}>
						<Typography className={clsx(
							(
							(config.navbar.folded && classes.title)
						&& (!navbarStatus.foldedOpen && classes.title) )
					
							)} style={{color:"black"}}>TweetKing</Typography>
						</Grid>
						<Grid item lg={3} md={3} sm={3} xs={3} style={{display:"flex",justifyContent:"flex-end"}}>
						<NavbarFoldedToggleButton className="w-40 h-40 p-0" />
						</Grid>
						
					</Grid>

					
				</Hidden>
				
						
				<Hidden lgUp>
				<Grid container alignItems="center">
						<Grid item lg={8} md={8} sm={8} xs={8}>
						<Typography className={clsx(
							(
								((config.navbar.folded && classes.title) && 
								(!navbarStatus.mobileOpen && classes.title))
								   )
					
							)} style={{color:"black"}}>TweetKing</Typography>
						</Grid>
						<Grid item lg={3} md={3} sm={3} xs={3} style={{display:"flex",justifyContent:"flex-end"}}>
					<NavbarMobileToggleButton className="w-40 h-40 p-0">
						<Icon >{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}"</Icon>
					</NavbarMobileToggleButton>
					</Grid>
						
						</Grid>
	
				</Hidden>
			</AppBar>

			<FuseScrollbars className={clsx(classes.content)} option={{ suppressScrollX: true }}>
				<UserNavbarHeader />

				<Navigation layout="vertical" />
			</FuseScrollbars>
		</div>
	);
}

export default React.memo(NavbarLayout1);
