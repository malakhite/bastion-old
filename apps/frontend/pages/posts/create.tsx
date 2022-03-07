import { useState } from 'react';
import { Alert, Paper, Textarea, TextInput } from '@mantine/core';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function CreatePost() {
	// const { data, error } = useSWR(
	// 	`http://localhost:3333/api/v1/user/`,
	// 	fetcher,
	// );

	// if (error) {
	// 	return (
	// 		<Alert title="Bummer!" color="red">
	// 			Something terrible happened! You made a mistake and there is no
	// 			going back, your data was lost forever!
	// 		</Alert>
	// 	);
	// }

	return (
		<Paper
			padding="md"
			shadow="xs"
			style={{
				height: '100%',
			}}
		>
			<form
				action={`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/posts`}
				method="post"
				style={{ height: '100%' }}
			>
				<TextInput label="Title" />
				<TextInput label="Slug" />
				<Textarea
					label="Content"
					styles={{
						input: {
							fontFamily: 'monospace',
							height: '100%',
						},
						root: {
							height: '100%',
						},
						wrapper: {
							height: '100%',
						},
					}}
				/>
			</form>
		</Paper>
	);
}

export default CreatePost;
