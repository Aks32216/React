import CardComponent from "./Components/CardComponent.jsx";
import NavBar from "./Components/NavBar.jsx";

const App = () => {
  const items = [
    {
      id: 1,
      name: "Card 1",
      description: "This is card 1",
    },
    {
      id: 2,
      name: "Card 2",
      description: "This is card 2",
    },
    {
      id: 3,
      name: "Card 3",
      description: "This is card 3",
    },
    {
      id: 4,
      name: "Card 4",
      description: "This is card 4",
    },
    {
      id: 5,
      name: "Card 5",
      description: "This is card 5",
    },
  ];
  return (
    <>
      <NavBar></NavBar>
      <h1>Hello World</h1>
      {/* reusable components */}
      {items.map((item) => {
        return (
          <CardComponent
            key={item.id}
            title={item.name}
            description={item.description}
          />
        );
      })}
    </>
  );
};

export default App;
