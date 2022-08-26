import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './Button';

export default {
	title: 'Button',
	component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
	<Button {...args}>Button</Button>
);

export const Default = Template.bind({});

export const Blue = Template.bind({});
Blue.args = { ...Default.args, variant: 'blue' };

export const Green = Template.bind({});
Green.args = { ...Default.args, variant: 'green' };

export const Red = Template.bind({});
Red.args = { ...Default.args, variant: 'red' };
