import { useState } from 'react';
import {
	Alert,
	Autocomplete,
	Button,
	Checkbox,
	Group,
	LoadingOverlay,
	MediaQuery,
	Paper,
	Textarea,
	TextInput,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function CreatePost() {
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [updateSlugAutomatically, setUpdateSlugAutomatically] =
		useState(true);
	const [author, setAuthor] = useState('');

	const [publishDate, setPublishDate] = useState<Date>();
	const [content, setContent] = useState('');

	const handleSubmit = async () => {
		const author_id = data.find((a) => a.name === author).id;
		const response = await fetch(
			`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/v1/post/`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNjb3R0QHNjb3R0YWJiZXkuY29tIiwic3ViIjoiOTljMDllNGUtYWQ0NS00M2RiLWE2MGItMzhlZmNhM2VlZGM5Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ2NzcxMzQ4LCJleHAiOjE2NDY3NzQ5NDh9.yjafDJ9svoWLOfpj_snFz8HCDbm7vdOFX2gvuVW6Y44',
				},
				body: JSON.stringify({
					title,
					slug,
					author_id,
					content,
					published_at: publishDate,
					is_published: publishDate < new Date(),
				}),
			},
		);
	};

	const { data, error } = useSWR(
		`http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/v1/user/`,
		fetcher,
	);

	if (!error && !data) {
		return <LoadingOverlay visible />;
	}

	if (error) {
		return (
			<Alert title="Bummer!" color="red">
				Something terrible happened! You made a mistake and there is no
				going back, your data was lost forever!
			</Alert>
		);
	}

	const authors = data.map((user) => user.name);

	return (
		<Paper padding="md" shadow="sm">
			<MediaQuery largerThan="sm" styles={{ flexDirection: 'row' }}>
				<Group direction="column" mt="md" grow>
					<TextInput
						label="Title"
						value={title}
						onChange={(event) => {
							setTitle(event.currentTarget.value);
							if (updateSlugAutomatically) {
								const slugValue = event.currentTarget.value
									.trim()
									.toLowerCase()
									.replace(/(\W+)/g, '-');
								setSlug(slugValue);
							}
						}}
					/>
					<Group direction="column" grow>
						<TextInput
							label="Slug"
							value={slug}
							onChange={(event) => {
								setUpdateSlugAutomatically(false);
								setSlug(event.currentTarget.value);
							}}
						/>
						<Checkbox
							label="Update slug automatically"
							checked={updateSlugAutomatically}
							onChange={(event) =>
								setUpdateSlugAutomatically(
									event.currentTarget.checked,
								)
							}
						/>
					</Group>
				</Group>
			</MediaQuery>
			<Group mt="md">
				<Autocomplete
					label="Author"
					data={authors}
					value={author}
					onChange={setAuthor}
				/>
				<Group>
					<DatePicker
						label="Publish Date"
						value={publishDate}
						onChange={(event) => {
							if (publishDate && event) {
								const hours = publishDate.getHours();
								const minutes = publishDate.getMinutes();
								setPublishDate(
									new Date(event.setHours(hours, minutes)),
								);
							} else {
								setPublishDate(event);
							}
						}}
					/>
					<TimeInput
						label="Publish Time"
						value={publishDate}
						onChange={(event) => {
							if (publishDate && event) {
								const hours = event.getHours();
								const minutes = event.getMinutes();
								setPublishDate(
									new Date(
										publishDate.setHours(hours, minutes),
									),
								);
							} else {
								setPublishDate(event);
							}
						}}
					/>
				</Group>
			</Group>
			<Textarea
				label="Content"
				minRows={10}
				mt="md"
				onChange={(event) => setContent(event.currentTarget.value)}
				styles={{
					input: {
						fontFamily: 'monospace',
					},
				}}
				value={content}
			/>
			<Group mt="md" position="right">
				<Button
					color="red"
					styles={(theme) => ({ root: { width: 100 } })}
					type="reset"
					variant="outline"
				>
					Discard
				</Button>
				<Button
					onClick={() => handleSubmit()}
					styles={(theme) => ({ root: { width: 100 } })}
					type="submit"
				>
					Save
				</Button>
			</Group>
		</Paper>
	);
}

export default CreatePost;
