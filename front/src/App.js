import logo from './logo.svg';
import './App.css';
import api from './api';
import LoginForm from './login/login';
import Register from './register/register';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>LOGIN</p>
        {/* <LoginForm /> */}

        <p>SIGN UP</p>
        <Register />
      </header>
    </div>
  );
}

// Utilisez l'instance Axios configurée pour effectuer une requête
// api.get('/api/message')
// .then(response => {
//   console.log(response.data);
// })
// .catch(error => {
//   console.error(error);
// });

export default App;
