import styled from 'styled-components';
import { useEffect, useState } from 'react';


const BIRD_SIZE = 20;
const GAME_WIDTH = 500;
const GAME_HEIGTH = 500;
const GRAVITY = 2;
const JUMP_HEIGHT = 100;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_GAP = 200;



function App() {
const [birdPosition, setbirdposition] = useState(250);
const [gamestarted, setgamestarted] = useState(false);
const [obstacleHeight, setobstacleHeight] = useState(200);
const [obstacleLeft, setobstacleLeft] = useState(GAME_WIDTH - OBSTACLE_WIDTH);
const [score, setScore] = useState(0);

const bottomObstacleHeight = GAME_HEIGTH - OBSTACLE_GAP - obstacleHeight;

useEffect(() => {
  let timeId;
  if(gamestarted && birdPosition < GAME_HEIGTH - BIRD_SIZE){
    let timeId = setInterval(() => {
      setbirdposition(birdPosition => birdPosition + GRAVITY)
    }, 24)
    return () => 
      clearInterval(timeId);
    };
  }, [birdPosition, gamestarted]);


useEffect(() => {
  let obstacleId;
  if(gamestarted && obstacleLeft >= -OBSTACLE_WIDTH){
   obstacleId = setInterval(() => {
    setobstacleLeft((obstacleLeft) => obstacleLeft - 3);
   }, 24);

   return()=> {
    clearInterval(obstacleId);
   };
  }
  else {
    setobstacleLeft(GAME_WIDTH - OBSTACLE_WIDTH);
    setobstacleHeight(Math.floor(Math.random() * (GAME_HEIGTH - OBSTACLE_GAP))
    );
    setScore(score => score + 1)
  };
}, [gamestarted, obstacleLeft]);


useEffect(()=> {
  const topCollision = birdPosition >= 0 && birdPosition < obstacleHeight;
  const bottomcollision = birdPosition <= 500 && birdPosition  >= 500 - bottomObstacleHeight;

  if(obstacleLeft >= 0 && obstacleLeft <= OBSTACLE_WIDTH && (topCollision || bottomcollision)){
    setgamestarted(false);
  }
}, [birdPosition, obstacleHeight, bottomObstacleHeight, obstacleLeft]);



const handleClick = () => {
  let newBirdPostion = birdPosition - JUMP_HEIGHT;
  if(!gamestarted){
    setgamestarted(true);
  }
  else if(newBirdPostion < 0) {
    newBirdPostion(0)
  }
  else{
    setbirdposition(newBirdPostion);
  }
  setbirdposition(newBirdPostion);
};

{
  return (
    <div className="App">
      <Div onClick={handleClick}>
      <GameBox heigth={GAME_HEIGTH} width={GAME_WIDTH}>
      <Obstacle
        top={0}
        width={OBSTACLE_WIDTH}
        height={obstacleHeight}
        left={obstacleLeft}
      />
      <Obstacle
        top={GAME_HEIGTH - (obstacleHeight + bottomObstacleHeight)}
        width={OBSTACLE_WIDTH}
        height={bottomObstacleHeight}
        left={obstacleLeft}
      />
        <Bird size={BIRD_SIZE} top={birdPosition}/>
      </GameBox>
      <span> {score} </span>
      </Div>
    </div>
  );
}}

export default App;

const Bird = styled.div`
position: absolute;
background-color: red;
height: ${(props) => props.size}px;
width: ${(props) => props.size}px;
top: ${(props) => props.top}px;
border-radius: 50%;
`;

const Div = styled.div`
display: flex;
width: 100%;
justify-content: center;
& span {
  color: white;
  font-size: 24px;
  position: absolute;
}
`;

const GameBox = styled.div`
height: ${(props) => props.heigth}px;
width: ${(props) => props.width}px;
background-color: blue;
overflow: hidden;
`;

const Obstacle = styled.div`
position: relative;
top: ${(props) => props.top}px;
background-color: green;
width: ${(props) => props.width}px;
height: ${(props) => props.height}px;
left: ${(props) => props.left}px;
`;
