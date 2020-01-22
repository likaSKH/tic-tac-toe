import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Index from "./components/Index";
import Provider from "./Provider";
import "@fortawesome/fontawesome-free/css/all.css";
 class App extends Component {
  render() {
    return (
      <Provider>
        <div className="app">
          <Index></Index>
        </div>
      </Provider>
    );
  }
}

export default App;