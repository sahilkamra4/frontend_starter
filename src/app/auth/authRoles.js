/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['admin', 'admin_new'],
	staff: ['admin', 'staff'],
	user: ['admin', 'staff', 'user'],
	admin_new: ['admin_new'],
	onlyGuest: []
};

export default authRoles;
