interface ChipProps {
  value: number;
}
export const Chip: React.FC<ChipProps> = ({ value }) => {
  const getColor = () => {
    switch (value) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-blue-500";
      default:
        return "bg-white";
    }
  };
  return <button className={`m-5 size-20 rounded-full ${getColor()}`} />;
};
