import "./App.css";
import { ButtonBox } from "./components/ButtonBox/ButtonBox";
import Container from "./components/Container/Container";
import Screen from "./components/Screen/Screen";
import CircleButton from "./components/CircleButton/CircleButton";
import { useEffect, useRef, useState } from "react";
import CELLS from "vanta/dist/vanta.cells.min.js";

function App() {
  const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

  const removeSpaces = (num) => num.toString().replace(/\s/g, "");

  const [calculate, setCalculate] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CELLS({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          color1: 0x56887,
          color2: 0x15195f,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const buttons = [
    ["AC", "±", "%", "÷"],
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calculate.num).length < 16) {
      setCalculate({
        ...calculate,
        num:
          calculate.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calculate.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calculate.num + value)))
            : toLocaleString(calculate.num + value),
        res: !calculate.sign ? 0 : calculate.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalculate({
      ...calculate,
      num: !calculate.num.toString().includes(".")
        ? calculate.num + value
        : calculate.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalculate({
      ...calculate,
      sign: value,
      res: !calculate.res && calculate.num ? calculate.num : calculate.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calculate.sign && calculate.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "x"
          ? a * b
          : a / b;

      setCalculate({
        ...calculate,
        res:
          calculate.num === "0" && calculate.sign === "÷"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calculate.res)),
                  Number(removeSpaces(calculate.num)),
                  calculate.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalculate({
      ...calculate,
      num: calculate.num ? toLocaleString(removeSpaces(calculate.num) * -1) : 0,
      res: calculate.res ? toLocaleString(removeSpaces(calculate.res) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calculate.num ? parseFloat(calculate.num) : 0;
    let res = calculate.res ? parseFloat(calculate.res) : 0;

    setCalculate({
      ...calculate,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalculate({
      ...calculate,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <div className="App" ref={myRef}>
      <Container>
        <Screen value={calculate.num ? calculate.num : calculate.res} />
        <ButtonBox>
          {buttons.flat().map((button, id) => (
            <CircleButton
              key={id}
              value={button}
              onClick={
                button === "AC"
                  ? resetClickHandler
                  : button === "±"
                  ? invertClickHandler
                  : button === "%"
                  ? percentClickHandler
                  : button === "="
                  ? equalsClickHandler
                  : button === "÷" ||
                    button === "x" ||
                    button === "-" ||
                    button === "+"
                  ? signClickHandler
                  : button === "."
                  ? commaClickHandler
                  : numClickHandler
              }
            />
          ))}
        </ButtonBox>
      </Container>
    </div>
  );
}

export default App;
