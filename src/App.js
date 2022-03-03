import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const List = (props) => {
  const { repos } = props;
  if (!repos || repos.length === 0) return <p>No repos, sorry</p>;
  return (
    <ul>
      <h2 className="list-head">Available Public Repositories</h2>
      {repos.map((repo) => {
        return (
          <li key={repo.id} className="list">
            <span className="repo-text">{repo.name} </span>
            <span className="repo-description">{repo.description}</span>
          </li>
        );
      })}
    </ul>
  );
};

function withListLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <p style={{ textAlign: 'center', fontSize: '30px' }}>
        Hold on, fetching data may take some time :)
      </p>
    );
  };
}

function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://api.github.com/users/atikur-rabbi/repos`;
    axios.get(apiUrl).then((repos) => {
      const allRepos = repos.data;
      setAppState({ loading: false, repos: allRepos });
    });
  }, [setAppState]);
  return (
    <div className="App">
      <div className="repo-container">
        <ListLoading isLoading={appState.loading} repos={appState.repos} />
      </div>
    </div>
  );
}

export default App;
