import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error(
            `Failed to create user: Received status code ${response.status}`
          );
        }
      })
      .then((json) => {
        console.log(JSON.stringify(json));
        setCharacters([...characters, json]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  function removeOneCharacter(index) {
    deleteUser(index)
      .then((response) => {
        if (response.status !== 204) {
          throw new Error(
            `Failed to create user: Received status code ${response.status}`
          );
        }
      })
      .then(() => {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteUser(index) {
    const promise = fetch(
      "Http://localhost:8000/users/" + characters[index]._id,
      {
        method: "DELETE",
      }
    );
    return promise;
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;
