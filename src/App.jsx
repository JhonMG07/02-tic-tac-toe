import { useState } from "react";

const TURNS = {
  X: "x",
  O: "o",
};

const Squere = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null); // null= no hay ganaador y false = hay empate

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;

      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const updateBoard = (index) => {
    //Si ya hay algo en esa posicion no actualizar
    if (board[index] || winner) return;

    //los datos siempre deben ser nuevos (principio de inmutabilidad. Usar siempre set para modificar un estado)
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard); // las actualizaciones son asincronas

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      alert(`El ganador es ${newWinner}`);
      setWinner(newWinner);
    }
  };

  return (
    <main className="board">
      <h1>tic tac toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Squere key={index} index={index} updateBoard={updateBoard}>
              {/*Tener en cuenta el momento de pasar la funcion o la ejecucion de la funcion */}
              {board[index]}
            </Squere>
          );
        })}
      </section>

      <section className="turn">
        <Squere isSelected={turn === TURNS.X}>{TURNS.X}</Squere>
        <Squere isSelected={turn === TURNS.O}>{TURNS.O}</Squere>
      </section>
    </main>
  );
}

export default App;
