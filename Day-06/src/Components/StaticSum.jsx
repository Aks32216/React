import React from "react";

const StaticSum = React.memo(({ n }) => {
  console.log("Static Sum");
  return (
    <div className="receipt receipt--static">
      <p className="receipt__shop">FIXED-O-MATIC</p>
      <p className="receipt__line">
        <span>Input</span>
        <span>always {n}</span>
      </p>
      <p className="receipt__total">
        <span>StaticSum:</span>
        <strong>{n}</strong>
      </p>
      <span className="receipt__stamp">React.memo</span>
    </div>
  );
});

export default StaticSum;
