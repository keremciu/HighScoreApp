import React from "react";
// import "./styles.css";

export default function App() {
 let [user,setUser] = React.useState('');
 let [userScore,setUserScore] = React.useState(0);
 let [counter,setCounter] = React.useState(0);
 const changeHandler = (e) => setUser(e.target.value);
 const clickHandler = () => {
   // api call goes here
   fetch('/cobalt-api',{method : 'POST', body : JSON.stringify({user,userScore})});
   setCounter(0);
 }
   const handleScore = () => { if(counter < 10) { setCounter((count) => (count + 1));
     setUserScore(Math.floor(Math.random() * 200 - 100)); } }
     return (<div className="App">
          <label htmlFor="username"> name </label>
          <input name="username" value={user} onChange={changeHandler} />
          <button onClick={clickHandler}> send</button>
          <button onClick={handleScore}> generate score </button>
          <p> counter {counter}</p>
          <p> {userScore} </p>
     </div> );
   }
