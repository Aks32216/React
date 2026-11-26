const Sum = ({ n }) => {
  console.log("Dynamic Sum");
  const computedSum = () => {
    let sum = 0;
    for (let i = 0; i <= n; ++i) {
      sum += i;
    }
    return sum;
  };
  return (
    <div className="receipt">
      <p className="receipt__shop">SUM-O-MATIC</p>
      <p className="receipt__line">
        <span>Add up</span>
        <span>0 to {n}</span>
      </p>
      <p className="receipt__total">
        <span>Sum:</span>
        <strong>{computedSum()}</strong>
      </p>
      <p className="receipt__thanks">* thank you, come again *</p>
    </div>
  );
};

export default Sum;
