import { useState } from "react";

const TURNS = {
  X: "x",
  O: "o",
};

const Squere = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  const handleClick =()=>{
    updateBoard();
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  //estado para saber de quien es el turno
  const [turn, setTurn] = useState(TURNS.X);

  const updateBoard = () => {
    const newTurn = turn === TURNS.X? TURNS.O: TURNS.X;

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
