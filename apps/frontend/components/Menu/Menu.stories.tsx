import { ComponentMeta, ComponentStory } from '@storybook/react';
import { styled } from '../../stitches.config';
import { Menu } from './Menu';

export default {
	title: 'Menu',
	component: Menu,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof Menu>;

const Container = styled('div', {
	all: 'unset',
	backgroundColor: '$purple9',
	boxSizing: 'border-box',
	display: 'flex',
	justifyContent: 'flex-end',
	margin: 0,
	padding: '$2',
	width: '100%',
});

const Template: ComponentStory<typeof Menu> = (args) => (
	<Container>
		<Menu {...args} />
	</Container>
);

export const Default = Template.bind({});
