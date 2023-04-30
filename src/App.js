import { useState } from "react";
import "./App.css"
import Board from "./components/Board";

const App = () => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null) }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xISNext, setxISNext] = useState(true);

  function calculateWinner(squares) {
    const lines = [
      //이길 수 있는 모든 경우의 수 나열
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const current = history [ stepNumber ];
  const winner = calculateWinner(current.squares);
  // 값을 game-info 에서도 사용해야하니까 
  // 하위 컴포넌트인 board -> 상위 컴포넌트 app으로 가져와줌.

  let status;

  if (winner) {
      status = 'Winner: ' + winner;
  }else{
      status = `Next player : ${xISNext ? 'X' : 'O' }`;
  }

  const handleClick = (i) => {
    // 리액트에서는 불변성을 지켜야하기에 이렇게 얕은 복사를 통해 새로 만들어준다.
    // 클릭 할 때마다 새로 생성
    const newHistory = history.slice(0,stepNumber + 1);
    // newHistory : 시간을 되돌려 미래의 기록들을 지워줌.
    const newCurrent = newHistory[newHistory.length-1]; // 현재의 상태를 받음
    const newSquares = current.squares.slice();

    if(calculateWinner(newSquares) || newSquares[i]){
        //     승자가 정해졌거나        중복 클릭일때 
        //      더이상 클릭이 안되게
        return;
    }

    newSquares[i] = xISNext ? 'X' : 'O';
    setHistory([...newHistory, {squares : newSquares }]);
    // ...history : 원래 있던 내용
    // 새로 만들어진 square를 history 마지막에 추가
    
    setxISNext(prev => !prev )

    setStepNumber(newHistory.length);
}
const jumpTo = (step) => {
  // 이 함수가 실행되면 그 뒤에 move들은 모두 지워야함!!
  setStepNumber(step);
  setxISNext(step % 2 === 0); // 짝수일때 true -> 돌아갔을때 x인지 o인지?
}

const moves = history.map((step, move) => {
    const desc = move ?
    'Go to move #' + move :
    'Go to game start';
    return (
      <li key = {move}> {/*JSX문법 : key 속성 (유니크한 값을 가져야함.)
      ( react는 가상 돔을 사용하기에 key를 통해 변경된 항목을 찾음)
      index 사용은 비추천! -> 만약 리스트가 추가되거나 제거되면 리스트의 인덱스가 바뀌게 되기에
      */} 

        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
})

  return (
    <div className="game">
      <div className="game-board">
        <Board squares = {current.squares} onClick = {(i) => handleClick(i)}/>
      </div>
      <div className="game-info">
        <div className='status'>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
