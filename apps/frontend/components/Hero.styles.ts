import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
	hero: {
		filter: 'brightness(0.5)',
		objectPosition: '85% 0',
	},
	heroText: {
		...theme.fn.focusStyles(),
		backgroundColor: theme.fn.rgba(theme.fn.primaryColor(), 0.1),
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
	},
}));
