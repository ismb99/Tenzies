import { useState, useEffect } from "react";

export default function Die(props) {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    setRotate(360);
    const timer = setTimeout(() => setRotate(0), 300);
    return () => clearTimeout(timer);
  }, [props.value]);

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
    transform: `rotate(${rotate}deg)`,
  };

  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
