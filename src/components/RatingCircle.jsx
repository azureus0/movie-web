import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const RatingCircle = ({ value, size = "w-10 h-10", strokeWidth = 10 }) => {
  const color =
    value >= 70 ? "#22c55e" : value >= 50 ? "#eab308" : "#ef4444";

  return (
    <div className={`${size} p-[2px] flex-shrink-0`}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        background
        backgroundPadding={4}
        strokeWidth={strokeWidth} 
        styles={buildStyles({
          textSize: "26px",
          pathColor: color,
          textColor: "#ffffff",
          trailColor: "#1f2937",
          backgroundColor: "transparent",
        })}
      />
    </div>
  );
};

export default RatingCircle;
