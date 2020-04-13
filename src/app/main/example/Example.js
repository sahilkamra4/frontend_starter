import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React,{useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import * as Actions from 'app/store/actions';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import { useSelector } from 'react-redux';
import firebase from 'app/services/firebaseService'



const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function ExamplePage(props) {
	const classes = useStyles(props);
	const { t } = useTranslation('examplePage');
	const dispatch = useDispatch();
	const dialogstate = useSelector(({ fuse }) => fuse.dialog.state);
	useEffect(()=>{
		firebase.getRedirectCode()
	}	)
	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			// header={
			// 	<div className="p-24">
			// 		<h4>{t('TITLE')}</h4>
			// 	</div>
			// }
			// contentToolbar={
			// 	<div className="px-24">
			// 		<h4>Content Toolbar</h4>
			// 	</div>
			// }
			content={
				<div className="p-24">
					<h4>Content</h4>
					<br />
					{/* <DemoContent /> */}
				
					<Card style={{width:"100%"}} className="w-full overflow-hidden">
							<Input
								className="p-16 w-full"
								
								classes={{ root: 'text-14' }}
								placeholder="Write something.."
								multiline
								rows="6"
								margin="none"
								disableUnderline
							/>
							<AppBar
								className="card-footer flex flex-row border-t-1"
								position="static"
								color="default"
								elevation={0}
							>
								<div className="flex-1 items-center">
									<IconButton aria-label="Add photo">
										<Icon>photo</Icon>
									</IconButton>
									<IconButton aria-label="Mention somebody">
										<Icon>person</Icon>
									</IconButton>
									<IconButton aria-label="Add location">
										<Icon>location_on</Icon>
									</IconButton>
								</div>

								<div className="p-8">
									<Button variant="contained" color="primary" size="small" aria-label="post">
										POST
									</Button>
								</div>
							</AppBar>
						</Card>	
				<h1>Scheduled Tweets</h1>
				
				</div>


			}

		
		/>
	);
}

export default ExamplePage;
