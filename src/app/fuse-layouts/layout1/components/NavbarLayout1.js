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
import Box from '@material-ui/core/Box';


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
		display:"none",
		
		
	},
	normalTitle:{
		display:"flex",
		fontSize:"28px",
		color:"#5fd0a5",
		fontWeight:800
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
			

				<Hidden mdDown>
					<Grid container alignItems="center" style={{background:"",marginLeft:"0px",width:"100%"}}>
					<Grid item lg={2} md={2} sm={2} xs={2} style={{background:""}}>
					<img className={clsx(
							(
							(config.navbar.folded && classes.title)
						&& (!navbarStatus.foldedOpen && classes.title))
					)}
						style={{marginLeft:""}}
						src="assets/images/logos/premiumlogo (1)/logo_2.svg" alt="logo" />
						</Grid>
						<Grid item lg={4} md={4} sm={4} xs={4} >
					
						<Typography className={clsx(
							(
							(config.navbar.folded && classes.title)
						&& (!navbarStatus.foldedOpen && classes.title) ),
						(
							(!config.navbar.folded && classes.normalTitle)
						&& (navbarStatus.foldedOpen && classes.normalTitle) )
							)} style={{color:"black",
							fontWeight:800,fontSize:"22px"}} >Publicity</Typography>
							</Grid>
							<Grid  item lg={5} md={5} sm={5} xs={5} style={{background:""}}>

							<Typography className={clsx(
							(
							(config.navbar.folded && classes.title)
						&& (!navbarStatus.foldedOpen && classes.title) ),
						(
							(!config.navbar.folded && classes.normalTitle)
						&& (navbarStatus.foldedOpen && classes.normalTitle) )
					
							)} style={{color:"#5fd0a5",
							fontSize:"22px",
							fontWeight:800,marginLeft:"8px"}}>Bandit</Typography>


							</Grid>
						
						
							{/* <Typography className={clsx(
							(
							(config.navbar.folded && classes.title)
						&& (!navbarStatus.foldedOpen && classes.title) )
					
							)} style={{}}> Publicity</Typography>
						<Typography className={clsx(
							(
							(config.navbar.folded && classes.title)
						&& (!navbarStatus.foldedOpen && classes.title) )
					
							)} style={{display: 'inline-block',fontSize:"12px",fontWeight:800,color:"#55c3b7"}}> Bandit</Typography>
						 */}
						
						<Grid item lg={1} md={1} sm={1} xs={1} style={{display:"flex",justifyContent:"flex-end",background:""}}>
						<NavbarFoldedToggleButton className="w-40 h-40 p-0" />
						</Grid>
						
					</Grid>

					
				</Hidden>
				
						
				<Hidden lgUp>
				<Grid container alignItems="center">
				<Grid item lg={2} md={2} sm={2} xs={2} style={{background:""}}>
					<img className={clsx(
							(
							(config.navbar.folded && classes.title)
						&& (!navbarStatus.foldedOpen && classes.title))
					)}
						style={{marginLeft:""}}
						src="assets/images/logos/premiumlogo (1)/logo_2.svg" alt="logo" />
						</Grid>
						<Grid item lg={4} md={4} sm={4} xs={4} >
					
						<Typography className={clsx(
							(
							(config.navbar.folded && classes.title)
						&& (!navbarStatus.foldedOpen && classes.title) ),
						(
							(!config.navbar.folded && classes.normalTitle)
						&& (navbarStatus.foldedOpen && classes.normalTitle) )
							)} style={{color:"black",
							fontWeight:800,fontSize:"22px"}} >Publicity</Typography>
							</Grid>
							<Grid  item lg={5} md={5} sm={5} xs={5} style={{background:""}}>

							<Typography className={clsx(
							(
							(config.navbar.folded && classes.title)
						&& (!navbarStatus.foldedOpen && classes.title) ),
						(
							(!config.navbar.folded && classes.normalTitle)
						&& (navbarStatus.foldedOpen && classes.normalTitle) )
					
							)} style={{color:"#5fd0a5",
							fontSize:"22px",
							fontWeight:800,marginLeft:"8px"}}>Bandit</Typography>


							</Grid>
						
						
					
					
						<Grid item lg={1} md={1} sm={1} xs={1} style={{display:"flex",justifyContent:"flex-end"}}>
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
