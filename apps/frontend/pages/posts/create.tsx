import { useState } from 'react';

import RichText from '../../components/RichText';

export function CreatePost() {
	const [value, onChange] = useState('');
	return <RichText value={value} onChange={onChange} />;
}

export default CreatePost;
