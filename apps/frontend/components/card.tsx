import { Bookmark, Heart, Share } from 'tabler-icons-react';
import {
	Card,
	Image,
	Text,
	ActionIcon,
	Group,
	Center,
	Avatar,
	createStyles,
} from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
	card: {
		position: 'relative',
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},

	title: {
		display: 'block',
		marginTop: theme.spacing.md,
		marginBottom: theme.spacing.xs / 2,
	},

	action: {
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[6]
				: theme.colors.gray[0],
		...theme.fn.hover({
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[1],
		}),
	},

	footer: {
		marginTop: theme.spacing.md,
	},
}));

interface ArticleCardProps {
	image: {
		src: string;
		alt: string;
	};
	link: string;
	title: string;
	description: string;
	author: {
		name: string;
		image: string;
	};
}

export default function ArticleCard({
	className,
	image,
	link,
	title,
	description,
	author,
	...others
}: ArticleCardProps &
	Omit<React.ComponentPropsWithoutRef<'div'>, keyof ArticleCardProps>) {
	const { classes, cx, theme } = useStyles();

	return (
		<Card
			withBorder
			radius="md"
			className={cx(classes.card, className)}
			{...others}
		>
			<Card.Section>
				<Link href={link}>
					<a>
						<Image src={image.src} height={180} alt={image.alt} />
					</a>
				</Link>
			</Card.Section>

			<Link href={link} passHref>
				<Text className={classes.title} weight={500} component="a">
					{title}
				</Text>
			</Link>

			<Text size="sm" color="dimmed" lineClamp={4}>
				{description}
			</Text>

			<Group position="apart" className={classes.footer}>
				<Center>
					<Avatar src={author.image} size={24} radius="xl" mr="xs" />
					<Text size="sm" inline>
						{author.name}
					</Text>
				</Center>

				<Group spacing={8} mr={0}>
					<ActionIcon className={classes.action}>
						<Heart size={16} color={theme.colors.red[6]} />
					</ActionIcon>
					<ActionIcon className={classes.action}>
						<Bookmark size={16} color={theme.colors.yellow[7]} />
					</ActionIcon>
					<ActionIcon className={classes.action}>
						<Share size={16} />
					</ActionIcon>
				</Group>
			</Group>
		</Card>
	);
}
