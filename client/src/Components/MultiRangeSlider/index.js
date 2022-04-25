import React, { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./index.css";

const MultiRangeSlider = ({ min, max, handleRangeChange, initMin }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );
  useEffect(() => {
    setMinVal(initMin);
  }, []);
  // Get min and max values when their state changes
  useEffect(() => {
    range.current.style.left = `${getPercent(minVal)}%`;
    range.current.style.width = `${getPercent(maxVal) - getPercent(minVal)}%`;
    handleRangeChange(minVal, maxVal);
  }, [minVal, maxVal]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          setMinVal(Math.min(event.target.value, maxVal - 1));
        }}
        className={classnames("thumb thumb--zindex-3", {
          "thumb--zindex-5": minVal > max - 100,
        })}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          setMaxVal(event.target.value, minVal + 1);
        }}
        className="thumb thumb--zindex-4"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{minVal}</div>
        <div className="slider__right-value">{maxVal}</div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
