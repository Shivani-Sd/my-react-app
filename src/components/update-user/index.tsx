import { useState } from "react";

import { Friend, User } from "../../types";
import "./styles.css";

interface UpdateUserProps {
  user: User;
  users: User[];
  handleUpdateUser: (user: User) => void;
}

const UpdateUser: React.FC<UpdateUserProps> = ({
  user,
  users,
  handleUpdateUser,
}) => {
  const friends = users.filter((friend) => friend.id !== user.id);

  const [name, setName] = useState<string>(user.name);
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>(
    user.friends
  );

  const friends_id = selectedFriends.map((selectedFriend) => selectedFriend.id);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeFriends = (
    e: React.ChangeEvent<HTMLInputElement>,
    friend: Friend
  ) => {
    if (e.target.checked) {
      setSelectedFriends((prev) => [...prev, friend]);
    } else {
      setSelectedFriends((prev) =>
        prev.filter((selectedFriend) => selectedFriend.id !== friend.id)
      );
    }
  };

  return (
    <div>
      <div className="update-header">
        <input value={name} onChange={handleNameChange}></input>
        <button
          onClick={() =>
            handleUpdateUser({
              id: user.id,
              name: name,
              friends: selectedFriends,
            })
          }
        >
          Submit
        </button>
      </div>
      <ul className="select-friends">
        {friends?.map((friend: User) => (
          <li key={friend.id}>
            <div className="user-header">
              <div>{friend.name}</div>
              <input
                type="checkbox"
                checked={friends_id.includes(friend.id)}
                onChange={(e) =>
                  handleChangeFriends(e, {
                    id: friend.id,
                    name: friend.name,
                  })
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateUser;
