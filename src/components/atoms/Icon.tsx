type IconProps = {
  name: string;
  style?: string;
};

export default function Icon({ name, style }: IconProps) {
  return <span className={`material-symbols-outlined ${style}`}>{name}</span>;
}
