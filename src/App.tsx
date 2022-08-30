import React, { useState } from 'react';
import './App.css';

export function Todo() {

  type Todo = Readonly< {
    id: number;
    text: string;
    done: boolean;
    place?: Place;
  }>

  type Place = 'home' | 'work' | {custom: string}


  const initialTodos: Todo[] = [
    { id: 1, text: "make basic todo", done: false, place: 'home'},
    { id: 2, text: "first make a type", done: true, place: 'work'},
    { id: 3, text: "then make a function", done: false, place: {custom: 'tent'}},
  ]

  const [todos, setTodos] = useState(initialTodos)

  //takes a todo and flips todo.done property
  function toggleTodo(todo: Todo){

    console.log("toggleTodo")

    setTodos((prev): Todo[] => {
      return [...prev.map(item => item.id === todo.id? {...item, done: !item.done}: item)]
    })
  }

  // takes todos array, flips all todo.done to true, sets todos array - so no return Type 
  function completeAll(todos: readonly Todo[]){

    setTodos((prev) : Todo[] => {
      return [...prev.map((item): Todo => ({...item, done: true}))]
    })

  }

  
  function placeToString(place: Place ): string{
    if(place === 'work'){
      return '💼 Work'
    }else if(place === 'home'){
      return '🏠 Home'
    }else{
      return '⚾' + place.custom
    }
  }
  



  return(
    <div>
      <h1>My Todo</h1>

      {todos.map(todo => <>
      <h3
        className={`${todo.done? 'isDone': 'normal'}`}
        onClick = {() => toggleTodo(todo)}
      >{todo.text}
      {"------------"}
      <span>{placeToString(todo.place?? "home")}</span>
      {/* 
      // Argument of type 'Place | undefined' is not assignable to parameter of type 'Place'. 
      // placeToString() expects a Place type, and cannot accect undefined, which we had in our 
      // place?: Place logic, so this fix of using ??  nullish coalescing 
      */}
      </h3>
      
      </>)}

      <button onClick={() => completeAll(todos)}>MArk as completed</button>

    </div>
  )
}


function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;
