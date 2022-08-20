import {useState} from "react";

function Navbar() {
    const [counter, setCounter] = useState(0)

    function btnAction() {
        setCounter(counter+1)
    }

    return (
        <nav className="navbar">
            <h1>Aqui é o Lucas</h1>
            <p>{counter}</p>
            <div className="links">
                <a href="/">Menu 1</a>
                <a href="/menu2">Menu 2</a>
                <button className='button' onClick={btnAction}>Clique</button>
            </div>
        </nav>
    );
}

export default Navbar