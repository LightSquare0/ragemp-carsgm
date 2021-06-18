import IcomoonReact from "icomoon-react";
import lineawesome from "./line-awesome-selection.json";

interface Props {
  color?: string,
  size: string | number,
  icon: string,
  className?: string
}

const Icon: React.FC<Props> = ({ color, size, icon, className }) => {
  return (
    <IcomoonReact
      className={className}
      iconSet={lineawesome}
      size={size}
      color={color}
      icon={icon}
    />
  );
};

export default Icon;
