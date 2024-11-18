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

  const removeBodyClasses=()=>{
    document.body.classList.remove('bg-light')
    document.body.classList.remove('bg-dark')
    document.body.classList.remove('bg-warning')
    document.body.classList.remove('bg-danger')
    document.body.classList.remove('bg-success')
  }
  const toggleMode = (cls) => {
    removeBodyClasses();
    console.log(cls)
    document.body.classList.add('bg-'+cls)
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#1d3354';
      showAlert("Dark mode has been enabled", "success"); 
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
    }

  }
  return (
    <>
      <Router>
        <Navbar title="TextUtils"  aboutText="About"  mode={mode}  toggleMode={toggleMode} />
        <Alert alert={alert} />

        {/* <Navbar/>  */}

        {/* <Navbar title="TextUtils" aboutText="About" /> */}

        <div className="container my-3">
          <Routes>
            {/* --/users--->Component 1
            /users/home-->-->Component 2 
            -->exact is used to to complete maching not the partial matching--*/}
            
            <Route exact path="/about" element={<About mode={mode}/>} />

            <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Try TextUtils - Word Counter, Character Counter, Remove extra Spaces" mode={mode} />} />

            {/* <TextForm showAlert={showAlert} heading="Enter the text to analyze below" mode={mode} /> */}
            {/* <About /> */}

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
