import React from "react";
import StepIncrease from "./StepIncrease";

const Counter = () => {
  const [stepCount, setStepCount] = React.useState(0);
  const [stepIncrease, setStepIncrease] = React.useState(1);

  const allowedSteps = [1, 5, 10, 15, 20];

  function handleIncrementStep() {
    setStepCount((prev) => prev + stepIncrease);
  }

  function handleDecrementStep() {
    setStepCount((prev) => {
      if (prev - stepIncrease < 0) {
        return 0;
      } else {
        return prev - stepIncrease;
      }
    });
  }

  function handleStepIncrease(step) {
    setStepIncrease(step);
  }

  return (
    <section className="pedo">
      <p className="pedo-title">Step counter</p>
      <div className="flip" aria-label={`${stepCount} steps`}>
        {String(stepCount)
          .padStart(4, "0")
          .split("")
          .map((digit, i) => {
            return (
              <span className="flip-tile" key={i}>
                {digit}
              </span>
            );
          })}
      </div>

      <div className="pedo-controls">
        <button
          className="round round-minus"
          aria-label="Decrease steps"
          disabled={stepCount === 0}
          onClick={handleDecrementStep}
        >
          -
        </button>
        <button
          className="round round-plus"
          aria-label="Increase steps"
          onClick={handleIncrementStep}
        >
          +
        </button>
      </div>

      <p className="pedo-hint">Step size</p>
      <div className="chips">
        {allowedSteps.map((step) => {
          return (
            <StepIncrease
              key={step}
              stepSet={handleStepIncrease}
              step={step}
              isActive={step === stepIncrease}
            ></StepIncrease>
          );
        })}
      </div>
    </section>
  );
};

export default Counter;
