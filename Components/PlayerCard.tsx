import Image from "next/image";

interface PlayerCardProps {
  team: number;
  player: string;
  streak: number;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  team,
  player,
  streak,
}) => {
  return (
    <div className="flex h-80 w-60 flex-col items-center justify-between rounded-lg border p-10">
      {team === 0 ? (
        <Image src={"/redChip.png"} width={100} height={100} alt="" />
      ) : (
        <Image src={"/blueChip.png"} width={100} height={100} alt="" />
      )}
      <div>{player}</div>
      <div>{streak} - Win</div>
    </div>
  );
};
