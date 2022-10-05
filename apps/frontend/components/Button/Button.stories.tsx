import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './Button';

export default {
	title: 'Button',
	component: Button,
	argTypes: {
		variant: {
			options: ['gray', 'blue', 'green', 'red'],
			control: { type: 'inline-radio' },
		},
		size: {
			options: ['1', '2', '3'],
			control: { type: 'inline-radio' },
		},
	},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
	<Button {...args}>Button</Button>
);

export const Default = Template.bind({});
