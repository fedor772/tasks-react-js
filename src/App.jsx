import "./App.css";
import { useState, useRef, useEffect } from "react";
import { Button, Overlay, Form, Alert } from "react-bootstrap";
import { useCookies } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["list"]);
  const target = useRef(null);

  function add() {
    if (value != "") {
      document.querySelector(".list").innerHTML += `<li>${value}</li>`;
      setCookie("list", document.querySelector(".list").innerHTML);
    }
  }

  function removeAll() {
    document.querySelector(".list").innerHTML = "";
    setShow(false);
    removeCookie("list");
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      add();
    }
  };

  useEffect(() => {
    if (cookies.list) {
      document.querySelector(".list").innerHTML = cookies.list;
    }
  }, []);

  return (
    <main>
      <div className="form">
        <Form.Control
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={add}>+</Button>
      </div>
      <ul className="list" onClick={(e) => e.target.remove()}></ul>
      <Button variant="danger" ref={target} onClick={() => setShow(!show)}>
        Удалить всё
      </Button>
      <Overlay target={target.current} show={show}>
        {() => (
          <div className="overlay">
            <Alert variant="danger" className="alert">
              Вы уверены, что хотите удалить все элементы?
              <div className="buttons">
                <Button onClick={removeAll}>Да</Button>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Нет
                </Button>
              </div>
            </Alert>
          </div>
        )}
      </Overlay>
    </main>
  );
}
