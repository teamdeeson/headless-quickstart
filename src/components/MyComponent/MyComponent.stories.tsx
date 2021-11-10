import { Story } from "@storybook/react";
import MyComponent, { MyComponentProps } from ".";

export default {
  title: "components/MyComponent",
  component: MyComponent,
};

const Template: Story<MyComponentProps> = (args) => <MyComponent {...args} />;

export const Standard = Template.bind({});
Standard.args = { field1: "foo", field2: "foo" };
