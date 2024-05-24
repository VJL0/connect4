import { Board } from "@/Components/Board";

export default function Home() {
  return (
    <main className="w-dvh h-dvh bg-cyan-700">
      <div className="flex h-full w-full items-center justify-around">
        <Board />
      </div>
    </main>
  );
}
