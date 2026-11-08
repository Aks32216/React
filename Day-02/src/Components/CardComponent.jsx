const CardComponent = (props) => {
  console.log(props.children);
  return (
    <>
      <div className="card">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    </>
  );
};

export default CardComponent;
