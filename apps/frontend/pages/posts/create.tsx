import styles from './create.module.scss';

export default function CreatePost() {
	return (
		<div className={styles.formContainer}>
			<h2>Create Post</h2>
			<form className={styles.createPostForm}>
				<div className={styles.metaContainer}>
					<div className={styles.titleInput}>
						<label htmlFor="title">Title:</label>
						<input type="text" id="title" name="title" />
					</div>
					<div className={styles.publishDate}>
						<label htmlFor="publish">Publish Date:</label>
						<input
							type="datetime-local"
							id="publish"
							name="publish"
						/>
					</div>
				</div>
				<div className={styles.textInput}>
					<label htmlFor="text">Text:</label>
					<textarea autoComplete="off" rows={40} />
				</div>
			</form>
		</div>
	);
}
