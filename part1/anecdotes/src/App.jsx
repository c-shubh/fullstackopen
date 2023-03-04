import { useState } from "react";

/** inclusive `min`, exclusive `max`  */
function getRandomInt(min, max) {
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values */
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const Anecdote = ({ text, votes }) => {
  return (
    <p>
      {text} <br /> has {votes} votes
    </p>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const [selected, setSelected] = useState(0);

  const selectRandomAnecdote = () => {
    setSelected(getRandomInt(0, anecdotes.length));
  };

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected]++;
    setPoints(newPoints);
  };

  const anecdoteWithMostVotes = () => {
    const maxPoints = Math.max(...points);
    const maxPointsIdx = points.findIndex((e) => e === maxPoints);
    return { text: anecdotes[maxPointsIdx], votes: maxPoints };
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <div>
        <button onClick={handleVote}>Vote</button>
        <button onClick={selectRandomAnecdote}>Next anecdote</button>
      </div>

      <h2>Anecdote with most votes</h2>
      <Anecdote {...anecdoteWithMostVotes()} />
    </div>
  );
};

export default App;
