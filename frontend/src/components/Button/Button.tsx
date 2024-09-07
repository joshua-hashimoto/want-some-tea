import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";

export type ButtonProps = AntdButtonProps;

const Button: React.FC<ButtonProps> = ({ ...props }) => (
  <AntdButton type="primary" {...props} />
);

export default Button;
