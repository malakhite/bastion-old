import { useState } from 'react';
import ProtectedWrapper from '../../../components/Protected/Protected';
import { Role } from '../../../lib/api/users';
import styles from './create.module.scss';

export default function CreatePost() {
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [autoSlug, setAutoSlug] = useState(true);
	const [publishDate, setPublishDate] = useState('');
	const [text, setText] = useState('');

	return (
		<ProtectedWrapper minRole={Role.ADMIN}>
			<div className={styles.formContainer}>
				<h2>Create Post</h2>
				<form className={styles.createPostForm}>
					<div className={styles.metaContainer}>
						<label htmlFor="title">Title:</label>
						<input
							type="text"
							id="title"
							name="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<label htmlFor="slug">Slug:</label>
						<input
							type="text"
							id="slug"
							name="slug"
							value={slug}
							disabled={autoSlug}
							onChange={(e) => setSlug(e.target.value)}
						/>
						<div></div>
						<div></div>
						<label htmlFor="autoSlug">
							Generate slug from title:
						</label>
						<input
							type="checkbox"
							id="autoSlug"
							name="autoSlug"
							checked={autoSlug}
							onChange={(e) => setAutoSlug(!autoSlug)}
						/>
						<label htmlFor="publish">Publish Date:</label>
						<input
							type="datetime-local"
							id="publish"
							name="publish"
							value={publishDate}
							onChange={(e) => setPublishDate(e.target.value)}
						/>
					</div>
					<div className={styles.textInput}>
						<label htmlFor="text">Text:</label>
						<textarea
							autoComplete="off"
							rows={40}
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
					</div>
				</form>
			</div>
		</ProtectedWrapper>
	);
}
