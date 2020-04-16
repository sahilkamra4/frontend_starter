import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import FuseUtils from '@fuse/utils';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as Actions from 'app/store/actions';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FuseNavBadge from '../FuseNavBadge';

const useStyles = makeStyles(theme => ({
	item: props => ({
		height: 40,
		width: 'calc(100% - 46px)',
		// width: 'calc(100% - 26px)',
		borderRadius: '10px 10px 10px 10px',
		// paddingRight: 12,
		
		paddingLeft: props.itemPadding > 80 ? 80 : props.itemPadding,
		// paddingLeft:"5%",
		
		marginLeft:"7%",//added by me
		marginTop:"5px",
		// marginRight:"55px",
		// fontWeight:900,
		
		// paddingLeft: props.itemPadding > 80 ? 80 : 40,
		// paddingLeft:12,
		
		'&.active': {
			// backgroundColor: theme.palette.secondary.main,
			// backgroundColor:"green",
			backgroundImage:"linear-gradient(90deg,#55c3b7 0,#5fd0a5 48%,#66da90 100%);",
			color:"#FFF",
			// marginRight:"30px",
			// fontWeight:900,
			// color: `${theme.palette.secondary.contrastText}!important`,
			pointerEvents: 'none',
			transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
			'& .list-item-text-primary': {
				color: '#FFF',
				// fontWeight:900,

			},
			'& .list-item-icon': {
				color: '#FFF',
				fontWeight:900,
				
				
			}
		},
		'& .list-item-icon': {
			// marginLeft: 16,
			color:"rgba(125,125,131,.8)" ,
			// fontWeight:900,
			marginRight:16
			//hover added by me
			// '&:hover': {
				
			// 	color:"#5fd0a5"
			// },
			
		},
		'& .list-item-text': {},
		color: theme.palette.text.primary,
		
		cursor: 'pointer',
		textDecoration: 'none!important',
		
	})
}));

function FuseNavVerticalItem(props) {
	const userRole = useSelector(({ auth }) => auth.user.role);
	const dispatch = useDispatch();

	const theme = useTheme();
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));
	const { item, nestedLevel } = props;
	console.log(nestedLevel)
	const classes = useStyles({
		// itemPadding: nestedLevel > 0 ? 40 + nestedLevel * 16 : 24
		itemPadding: nestedLevel > 0 ? 40 + nestedLevel * 16 : 20
	});
	const { t } = useTranslation('navigation');

	const hasPermission = useMemo(() => FuseUtils.hasPermission(item.auth, userRole), [item.auth, userRole]);

	if (!hasPermission) {
		return null;
	}

	return (
		<ListItem
			button
			component={NavLinkAdapter}
			to={item.url}
			activeClassName="active"
			className={clsx(classes.item, 'list-item')}
			onClick={ev => mdDown && dispatch(Actions.navbarCloseMobile())}
			exact={item.exact}
			
		>
			{item.icon && (
				<Icon className="list-item-icon text-16 flex-shrink-0" color="action">
					{item.icon}
				</Icon>
			)}

			<ListItemText
				className="list-item-text"
				primary={item.translate ? t(item.translate) : item.title}
				classes={{ primary: 'text-14 list-item-text-primary',}}
				// style={{fontWeight:900,fontSize:"13px",color:"#FFF",'&.active':{color:"#FFF"}}}
			/>

			{item.badge && <FuseNavBadge badge={item.badge} />}
		</ListItem>
	);
}

FuseNavVerticalItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string,
		icon: PropTypes.string,
		url: PropTypes.string
	})
};

FuseNavVerticalItem.defaultProps = {};

const NavVerticalItem = withRouter(React.memo(FuseNavVerticalItem));

export default NavVerticalItem;
