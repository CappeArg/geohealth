import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><h1>Hola mundo</h1></p>
        <p>
          Cuando necesitamos textos de prueba para rellenar contenido en nuestro código, podemos generar el conocido texto generado Lorem Ipsum.

          Aunque podemos copiar estos textos y copiarlos en nuestro código, muchos editores de código ya incluyen la forma de generar este conocido texto desde la propia interfaz del programa.

          En este post, vamos a ver como generar un texto Lorem Ipsum de la longitud que necesitemos en el editor de código Visual Studio Code.

          Debemos tener especificado el lenguaje que vamos a utilizar en el programa(abajo a la derecha en la interfaz del programa) y a continuación, escribir lorem y pulsar la tecla Tab.
        </p>
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

export default App;
