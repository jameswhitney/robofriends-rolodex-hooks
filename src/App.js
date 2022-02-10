import React, { useState, useEffect } from "react";
import CardList from "./components/cardlist.component";
import SearchBox from "./components/searchbox.component";
import Scroll from "./components/scroll.component";
import Spinner from "./components/spinner.component";
import ErrorBoundary from "./components/errorboundary.component";

function App() {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resp) => resp.json())
      .then((robots) => {
        return setRobots(robots);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSearchChange = (event) => {
    return setSearchField(event.target.value);
  };

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLocaleLowerCase());
  });
  return !robots.length ? (
    <Spinner />
  ) : (
    <div className="tc">
      <h1>Robofriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
}

export default App;
