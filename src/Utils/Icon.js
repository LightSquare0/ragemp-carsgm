import IcomoonReact from "icomoon-react";
import lineawesome from "../../client_packages/lineawesome.json";

const Icon = ({ color, size, icon, className }) => {
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
