import { useEffect, useRef, useState } from "react";
import { UUID } from "crypto";
import Cookies from 'js-cookie'
import axios from "axios";

import { Friend, User } from "./types";
import { BASE_URL } from "./constants";
import UpdateUser from "./components/update-user";
import "./App.css";

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken');

function App() {
  const selected_friends: Friend[] = [];

  const inputRef = useRef<HTMLInputElement>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [add, setAdd] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const handleAddUser = () => {
    setAdd(true);
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
  };

  const handleAddFriend = (friend: Friend) => {
    selected_friends.push({
      id: friend.id,
      name: friend.name,
    });
  };

  const handleUpdateUser = (user: User) => {
    updateUser(user);
    setEditUser(null);
  };

  const getAllUsers = () => {
    axios
      .get(`${BASE_URL}users/`)
      .then(function (response) {
        setUsers(response.data.users);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const addUser = () => {
    axios
      .post(`${BASE_URL}users/add/`, {
        name: inputRef.current?.value,
        friends: selected_friends,
      })
      .then(function (response) {
        getAllUsers();
        setAdd(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const updateUser = (user: User) => {
    axios
      .post(`${BASE_URL}users/update/`, { ...user })
      .then(function (response) {
        getAllUsers();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const deleteUser = (id: UUID) => {
    axios
      .post(`${BASE_URL}users/delete/${id}/`)
      .then(function (response) {
        setUsers(response.data.users);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div id="App">
      {editUser ? (
        <UpdateUser
          user={editUser}
          users={users}
          handleUpdateUser={handleUpdateUser}
        />
      ) : (
        <>
          <div id="App-header">
            <button onClick={handleAddUser}>Add User</button>
            {add && (
              <>
                <input placeholder="Type user name" ref={inputRef} />
                <button onClick={addUser}>Submit</button>
              </>
            )}
          </div>
          <ul className="users">
            {users?.map((user: User) => (
              <li key={user.id}>
                <div className="user-header">
                  <div>{user.name}</div>
                  {add ? (
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleAddFriend({ id: user.id, name: user.name })
                      }
                    />
                  ) : (
                    <>
                      <button onClick={() => deleteUser(user.id)}>
                        delete
                      </button>
                      <button onClick={() => handleEditUser(user)}>edit</button>
                    </>
                  )}
                </div>
                <div>Friends: </div>
                <ul>
                  {user.friends.map((friend: Friend) => (
                    <li key={friend.id}>{friend.name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
