import UserPosts from "./Components/UserPosts";
import UsersList from "./Components/UsersList";
import React from "react";

const App = () => {
  const [selectedUser, setSelectedUser] = React.useState(null);

  return (
    <>
      <UsersList
        onSelectUser={(user) => {
          setSelectedUser(user);
        }}
        onClearUser={() => setSelectedUser(null)}
        selectedUser={selectedUser}
      />
      {selectedUser && <UserPosts user={selectedUser} />}
    </>
  );
};

export default App;
