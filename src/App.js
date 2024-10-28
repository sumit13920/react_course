import './App.css';
import Navbar from './component/Navbar';
import Alert from './component/Alert';
import TextForm from './TextForm';
import React, { useState } from 'react';
import About from './component/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');// whether dark mode is enabled or not.
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#1d3354';
      showAlert("Dark mode has been enabled", "success");
      document.title = "TextUtils - Dark Mode";
      //***--This function is used to alternatly show these messages at the set interval of time.--***
      // setInterval(()=>{
      //   document.title = 'TextUtils is Amazing';
      // },2000);
      // setInterval(()=>{
      //   document.title = 'Visit TextUtils Now';
      // },1500);
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
      document.title = "TextUtils - Light Mode";
    }

  }
  return (
    <>
      <Router>
        <Navbar title="TextUtils" aboutText="About" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />

        {/* <Navbar/>  */}

        {/* <Navbar title="TextUtils"  /> */}
        <div className="container my-3">
          <Routes>
            {/* --/users--->Component 1
            /users/home-->-->Component 2 
            -->exact is used to to complete maching not the partial matching--*/}
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Enter the text to analyze below" mode={mode} />} />

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
