import React, { useState } from 'react'


export default function TextForm(props) {
    
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("converted to uppercase!","Success");
    }

    const handleLowClick = () => {
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("converted to lowercase!","Success");
    }

    
    const handleClearclick = () => {
        let newText = '';
        setText(newText)
        props.showAlert(" Text cleared!","Success");
    }


    const handleOnchange = (event) => {
        setText(event.target.value);
    }

     //Credits: A
    const handleCopy = () => {
        console.log("I am copy");
        var text = document.getElementById("myBox");
        text.select();
        // text.setSelectionRange(0, 9999);
        navigator.clipboard.writeText(text.value);
        document.getSelection().removeAllRanges();
        props.showAlert(" Copied to Clipboard!","Success");
    }

     //Credits: Coding Wala
     const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert(" Extra spaces removed!","Success");
    }

    const [text, setText] = useState('Enter text here');
    // text = "new text"; // Wrong way to change the state
    // setText( "new text"); // correct way to change the state
    return (
        <>
            <div className="container" style={{color:props.mode === 'dark'?'white':'#1d3354'}}>
                <h1 ClassName='mb-4'>{props.heading} </h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnchange} style={{backgroundColor:props.mode === 'dark'?'#13466e':'white',color:props.mode === 'dark'?'white':'#1d3354'}} id="myBox" rows="8"></textarea>
                </div>
                <button disabled ={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>

                <button disabled ={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>Convert to Lowercase</button>

                <button disabled ={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearclick}>Clear Text</button>

                <button disabled ={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>

                <button disabled ={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>

            </div>

            <div className="container my-3" style={{color:props.mode === 'dark'?'white':'#1d3354'}}>
                <h2>Your text summary</h2>
                <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
                <p>{.008 * text.split(" ").length} Minutes read </p>
                <h2>Preview</h2>
                <p>{text.length>0?text:"Nothing to preview!"}</p>
            </div>
        </>
    )
}
