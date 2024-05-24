"use client";
import { useState } from "react";
import { Chip } from "./Chip";
import { PlayerCard } from "./PlayerCard";

const ROWS = 6;
const COLUMNS = 7;
const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;

const initializeBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLUMNS).fill(EMPTY));

const directions = [
  { r: 0, c: 1 }, // Horizontal
  { r: 1, c: 0 }, // Vertical
  { r: 1, c: 1 }, // Diagonal /
  { r: 1, c: -1 }, // Diagonal \
];

const countInDirection = (
  board: any[][],
  currentPlayer: any,
  row: number,
  column: number,
  dr: number,
  dc: number,
) => {
  let count = 0;
  for (let i = 1; i < 4; i++) {
    const r = row + dr * i;
    const c = column + dc * i;
    if (
      r >= 0 &&
      r < ROWS &&
      c >= 0 &&
      c < COLUMNS &&
      board[r][c] === currentPlayer
    ) {
      count++;
    } else {
      break;
    }
  }
  return count;
};

const checkWin = (
  board: any[][],
  currentPlayer: number,
  row: number,
  column: any,
) => {
  return directions.some(({ r: dr, c: dc }) => {
    const count =
      1 +
      countInDirection(board, currentPlayer, row, column, dr, dc) +
      countInDirection(board, currentPlayer, row, column, -dr, -dc);
    return count >= 4;
  });
};

export const Board: React.FC = () => {
  const [board, setBoard] = useState(initializeBoard);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);
  const [winner, setWinner] = useState<number | null>(null);

  const dropChip = (column: number) => {
    if (winner !== null) return; // Prevent further moves if there's a winner

    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][column] === EMPTY) {
        const newBoard = board.map((r, rowIndex) =>
          rowIndex === row
            ? r.map((cell, colIndex) =>
                colIndex === column ? currentPlayer : cell,
              )
            : r,
        );
        setBoard(newBoard);

        if (checkWin(newBoard, currentPlayer, row, column)) {
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer(currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1);
        }
        return;
      }
    }
    alert("Column is full! Try a different column.");
  };

  return (
    <>
      <PlayerCard player={"Player 1"} streak={0} team={0} />
      <div>
        <div className="flex flex-col">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((value, colIndex) => (
                <div key={colIndex} onClick={() => dropChip(colIndex)}>
                  <Chip value={value} />
                </div>
              ))}
            </div>
          ))}
        </div>
        {winner && <p>Player {winner} wins!</p>}
      </div>
      <PlayerCard player={"Player 2"} streak={0} team={1} />
    </>
  );
};
