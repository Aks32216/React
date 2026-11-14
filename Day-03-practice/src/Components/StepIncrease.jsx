const StepIncrease = ({ stepSet, step, isActive }) => {
  return (
    <button
      className={isActive ? "chip is-active" : "chip"}
      onClick={() => {
        stepSet(step);
      }}
    >
      {step}
    </button>
  );
};

export default StepIncrease;
