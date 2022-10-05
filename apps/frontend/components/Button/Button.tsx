import { styled } from '../../stitches.config';

export const Button = styled('button', {
	all: 'unset',
	alignItems: 'center',
	boxSizing: 'border-box',
	userSelect: 'none',
	'&::before': {
		boxSizing: 'border-box',
	},
	'&::after': {
		boxSizing: 'border-box',
	},
	display: 'inline-flex',
	flexShrink: 0,
	justifyContent: 'center',
	lineHeight: 1,
	WebkitTapHighlightColor: 'rgba(0,0,0,0)',
	height: '$5',
	px: '$sizes$2',
	fontFamily: '$display',
	fontWeight: '$normal',
	fontVariantNumeric: 'tabular-nums',
	'&:disabled': {
		backgroundColor: '$mauve2',
		boxShadow: 'inset 0 0 0 1px $colors$mauve7',
		color: '$mauve8',
		pointerEvents: 'none',
	},
	variants: {
		size: {
			'1': {
				borderRadius: '$1',
				height: '$5',
				padding: '0 $sizes$2',
				fontSize: '$1',
				lineHeight: '$sizes$5',
			},
			'2': {
				borderRadius: '$2',
				height: '$6',
				padding: '0 $sizes$3',
				fontSize: '$3',
				lineHeight: '$sizes$6',
			},
			'3': {
				borderRadius: '$2',
				height: '$7',
				padding: '0 $sizes$4',
				fontSize: '$4',
				lineHeight: '$sizes$7',
			},
		},
		variant: {
			gray: {
				backgroundColor: '$loContrast',
				boxShadow: 'inset 0 0 0 1px $colors$mauve7',
				color: '$hiContrast',
				'@hover': {
					'&:hover': {
						boxShadow: 'inset 0 0 0 1px $colors$mauve8',
					},
				},
				'&:active': {
					backgroundColor: '$mauve2',
					boxShadow: 'inset 0 0 0 1px $colors$mauve8',
				},
				'&:focus': {
					boxShadow:
						'inset 0 0 0 1px $colors$mauve8, 0 0 0 1px $colors$mauve8',
				},
				'&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
					{
						backgroundColor: '$mauve4',
						boxShadow: 'inset 0 0 0 1px $colors$mauve8',
					},
			},
			blue: {
				backgroundColor: '$blue2',
				boxShadow: 'inset 0 0 0 1px $colors$blue7',
				color: '$blue11',
				'@hover': {
					'&:hover': {
						boxShadow: 'inset 0 0 0 1px $colors$blue8',
					},
				},
				'&:active': {
					backgroundColor: '$blue3',
					boxShadow: 'inset 0 0 0 1px $colors$blue8',
				},
				'&:focus': {
					boxShadow:
						'inset 0 0 0 1px $colors$blue8, 0 0 0 1px $colors$blue8',
				},
				'&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
					{
						backgroundColor: '$blue4',
						boxShadow: 'inset 0 0 0 1px $colors$blue8',
					},
			},
			green: {
				backgroundColor: '$green2',
				boxShadow: 'inset 0 0 0 1px $colors$green7',
				color: '$green11',
				'@hover': {
					'&:hover': {
						boxShadow: 'inset 0 0 0 1px $colors$green8',
					},
				},
				'&:active': {
					backgroundColor: '$green3',
					boxShadow: 'inset 0 0 0 1px $colors$green8',
				},
				'&:focus': {
					boxShadow:
						'inset 0 0 0 1px $colors$green8, 0 0 0 1px $colors$green8',
				},
				'&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
					{
						backgroundColor: '$green4',
						boxShadow: 'inset 0 0 0 1px $colors$green8',
					},
			},
			red: {
				backgroundColor: '$loContrast',
				boxShadow: 'inset 0 0 0 1px $colors$red7',
				color: '$red11',
				'@hover': {
					'&:hover': {
						boxShadow: 'inset 0 0 0 1px $colors$red8',
					},
				},
				'&:active': {
					backgroundColor: '$red3',
					boxShadow: 'inset 0 0 0 1px $colors$red8',
				},
				'&:focus': {
					boxShadow:
						'inset 0 0 0 1px $colors$red8, 0 0 0 1px $colors$red8',
				},
				'&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
					{
						backgroundColor: '$red4',
						boxShadow: 'inset 0 0 0 1px $colors$red8',
					},
			},
		},
	},
	defaultVariants: {
		size: '1',
		variant: 'gray',
	},
});
