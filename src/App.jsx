import { use, useRef, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";


function App() {
  const [arr, setArr] = useState([]);
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Preface />} />
        <Route path="/start" element={<Layout arr={arr} setArr={setArr} />} />
      </Routes>
    </BrowserRouter>
  </div>

}

function AddToDo({ arr, setArr }) {

  let inputRef = useRef();

  function add() {
    let val = inputRef.current.value;
    inputRef.current.value = "";
    if (val === "") {
      inputRef.current.focus();
    } else {
      if (arr.length >= 8) {
        alert("You can only enter 8 Todos");
        return;
      } else {
        setArr([...arr, { id: arr.length + 1, text: val }]);
      }
    }

  }

  function deleteTodo(info) {
    let newArr = arr.filter(item => item.id != info);
    setArr(newArr);
  }

  const compo = arr.map(element => <SingleTodo itemId={element.id} ele={element.text} func={deleteTodo} />);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', position: "relative", top: 70 }}>
        <input ref={inputRef} style={{ paddingLeft: 9, width: 300, height: 30, position: "relative", fontFamily: "sans-serif", backgroundColor: "rgb(20, 18, 19)", borderRadius: 34, border: "1px solid rgba(79, 67, 73, 1)", color: "white", fontWeight: 600, fontSize: 18 }} type="text" placeholder="Write your Todos here...." className="myInput"></input>
        <button onClick={add} style={{ position: "relative", left: -25, borderRadius: 25, height: 34.6, backgroundColor: "cyan", border: "1px solid cyan", fontFamily: 'sans-serif', fontWeight: 700, cursor: "pointer" }}>
          Add Todo
        </button>
      </div>

      <div style={{ position: "relative", top: 150, width: 470, display: "flex", flexDirection: "column", gap: 5 }}>
        {compo}
      </div>

    </>
  )
}

function SingleTodo({ itemId, ele, func }) {
  return (
    <div style={{ height: 37, fontFamily: "sans-serif", backgroundColor: "rgb(20, 18, 19)", borderRadius: 34, border: "1px solid rgba(79, 67, 73, 1)", color: "white", fontWeight: 600, fontSize: 18 }}>
      <img src="src/assets/OIP.jpeg" style={{ width: 20, position: "relative", top: -4.5, left: 390, cursor: "pointer" }} onClick={() => func(itemId)}></img>
      <input className="check" type="checkbox" style={{ margin: 5, position: "relative", left: -8 }}></input>
      <span style={{ position: "relative", top: -8, left: -2, border: "2px solid blue" }}>{ele}</span>
    </div>
  )

}

function Preface() {
  return <div style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 50, margin: 40 }}>
    <div style={{ color: "cyan", fontFamily: "sans-serif", fontSize: 40 }}>
      Welcome to the To-Do App!
    </div>
    <button style={{ all: 'unset', fontSize: 25, fontFamily: "monospace", backgroundColor: "rgb(20, 18, 19)", borderRadius: 34, border: "1px solid white", height: 49, width: 350, textAlign: "center", position: "relative", top: 10 }}>
      <Link style={{ color: "cyan", textDecoration: 'none', position: "relative", left: "7px" }} to={'/start'}>
        Let's get started....
      </Link>
    </button>
    <img src="src/ToDo.webp" style={{ borderRadius: 100, position: "relative", top: 50 }} />
  </div>
}

function Layout({ arr, setArr }) {
  return (
    <>
      <div style={{ color: "white", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontFamily: "sans-serif", fontSize: 40 }}>
          Can you achieve your Goals?
        </div>
        <Link to={'/'} style={{ color: "cyan", textDecoration: 'none', position: "relative", top: 600 }}>
          <button style={{ all: 'unset', fontSize: 20, fontFamily: "monospace", cursor: "pointer", backgroundColor: "rgb(20, 18, 19)", borderRadius: 34, border: "1px solid white", width: 150, height: 35, textAlign: "center" }}>Go back</button>
        </Link>
        <AddToDo arr={arr} setArr={setArr} />
      </div>
    </>


  )
}

export default App
