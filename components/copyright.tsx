import { Typography } from '@mui/material';
import Link from './link';

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://scottabbey.com">
				Scott Abbey
			</Link>{' '}
			{new Date().getFullYear()}
		</Typography>
	);
}

export default Copyright;
