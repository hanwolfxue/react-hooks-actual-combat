import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
// import About from "./components/About";

const useSize = () => {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  });

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return size;
};

const App = () => {
  const [count, setCount] = useState(0);
  const counterRef = useRef();
  const size = useSize();
  const it = useRef();
  console.log("TCL: it -> it外面", it.current);

  const onClick = useCallback(() => {
    console.log(counterRef.current);
  }, []);

  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
    console.log("TCL: it -> it", it.current);
  }, []);

  useEffect(() => {
    console.log("TCL: it -> it", it.current);
    if (count > 3) {
      clearInterval(it.current);
    }
  }, []);

  return (
    <div>
      <div>{count}</div>
      {size.width}x{size.height}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        press down
      </button>
      {/* <About count={count} cb={onClick} ref={counterRef}/> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
