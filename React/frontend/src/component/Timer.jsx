import { useEffect, useState } from "react";

export default function Timer(props) {
  const [time, settime] = useState(10);

  useEffect(() => {
    if (time === 0) {
      props.OnGameLost();
      return;
    }
    if (props.GameOver) {
      return;
    }
    const timer = setTimeout(() => {
      settime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  if (props.GameOver) {
    return <h2>{time === 0 ? "Time Out!" : `Time Out in ${time}s`}</h2>;
  }

  return <h2>{time}s</h2>;
}
