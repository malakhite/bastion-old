import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { keyframes, styled } from '../../stitches.config';
import { Button } from '../Button/Button';

const slideUpAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateY(2px)' },
	'100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateX(-2px)' },
	'100%': { opacity: 0, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateY(-2px)' },
	'100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateX(2px)' },
	'100%': { opacity: 0, transform: 'translateX(0)' },
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
	fill: '$purple2',
});
const StyledButton = styled(Button, {
	// '@bp1': {
	// 	display: 'none',
	// },
});
const StyledContent = styled(DropdownMenuPrimitive.Content, {
	alignItems: 'end',
	backgroundColor: '$purple2',
	borderRadius: '$2',
	boxSizing: 'border-box',
	display: 'flex',
	flexDirection: 'column',
	gap: '$1',
	margin: '0 $1',
	padding: '$1',
	boxShadow:
		'0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
	'@media (prefers-reduced-motion: no-preference)': {
		animationDuration: '400ms',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		willChange: 'transform, opacity',
		'&[data-state="open"]': {
			'&[data-side="top"]': { animationName: slideDownAndFade },
			'&[data-side="right"]': { animationName: slideLeftAndFade },
			'&[data-side="bottom"]': { animationName: slideUpAndFade },
			'&[data-side="left"]': { animationName: slideRightAndFade },
		},
	},
});
const StyledItem = styled(DropdownMenuPrimitive.Item, {
	all: 'unset',
	alignItems: 'center',
	borderRadius: '$2',
	color: '$purple11',
	display: 'flex',
	fontFamily: '$display',
	fontSize: '$2',
	height: '$5',
	justifyContent: 'end',
	lineHeight: '$m',
	padding: '0 $sizes$2',
	position: 'relative',
	userSelect: 'none',

	'&[data-highlighted]': {
		backgroundColor: '$purple9',
		color: '$purple1',
	},
});
const StyledMenu = styled(DropdownMenuPrimitive.Root, {});
const StyledLink = styled('a', {
	color: 'inherit',
	textDecoration: 'none',
	width: '100%',
});

const menuLinks = [
	{
		label: 'About me',
		href: '/about',
	},
	{
		label: 'Blog',
		href: '/posts',
	},
	{
		label: 'Projects',
		href: '/projects',
	},
];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MenuProps {}

export function Menu(props: MenuProps) {
	return (
		<StyledMenu>
			<DropdownMenuPrimitive.Trigger asChild>
				<StyledButton aria-label="Open menu">
					<HamburgerMenuIcon />
				</StyledButton>
			</DropdownMenuPrimitive.Trigger>
			<DropdownMenuPrimitive.Portal>
				<StyledContent>
					{menuLinks.map((link) => (
						<Link href={link.href} passHref key={link.href}>
							<StyledLink>
								<StyledItem>{link.label}</StyledItem>
							</StyledLink>
						</Link>
					))}
					<StyledArrow />
				</StyledContent>
			</DropdownMenuPrimitive.Portal>
		</StyledMenu>
	);
}
