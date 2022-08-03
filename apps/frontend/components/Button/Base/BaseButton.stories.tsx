import { ComponentMeta, ComponentStory } from '@storybook/react';
import BaseButton from './BaseButton';

export default {
	title: 'BaseButton',
	component: BaseButton,
} as ComponentMeta<typeof BaseButton>;

const Template: ComponentStory<typeof BaseButton> = (args) => (
	<BaseButton {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
	children: 'Button',
};
