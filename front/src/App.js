import logo from './logo.svg';
import './App.css';
import api from './api';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// Utilisez l'instance Axios configurée pour effectuer une requête
api.get('/api/message')
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});

export default App;
