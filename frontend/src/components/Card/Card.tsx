import { Card as AntdCard, CardProps as AntdCardProps } from "antd";

type CardProps = AntdCardProps;

const _Card: React.FC<CardProps> = ({ ...props }) => (
  <Card css={{ width: "100%", maxWidth: 800, height: "auto" }} {...props} />
);

const Card = _Card as React.FC<CardProps> & {
  Grid: typeof AntdCard.Grid;
  Meta: typeof AntdCard.Meta;
};

export default Card;
