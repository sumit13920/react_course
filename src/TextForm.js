import React, { useState } from 'react'


export default function TextForm(props) {

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText)
    }

    const handleLowClick = () => {
        let newText = text.toLowerCase();
        setText(newText)
    }

    
    const handleClearclick = () => {
        let newText = '';
        setText(newText)
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
    }

     //Credits: Coding Wala
     const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
    }

    const [text, setText] = useState('Enter text here');
    // text = "new text"; // Wrong way to change the state
    // setText( "new text"); // correct way to change the state
    return (
        <>
            <div className="container" style={{color:props.mode === 'dark'?'white':'#1d3354'}}>
                <h1>{props.heading} </h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnchange} style={{backgroundColor:props.mode === 'dark'?'gray':'white',color:props.mode === 'dark'?'white':'#1d3354'}} id="myBox" rows="8"></textarea>
                </div>
                <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convery to Uppercase</button>

                <button className="btn btn-primary mx-2" onClick={handleLowClick}>Convery to Lowercase</button>

                <button className="btn btn-primary mx-2" onClick={handleClearclick}>Clear Text</button>

                <button className="btn btn-primary mx-2" onClick={handleCopy}>Copy Text</button>

                <button className="btn btn-primary mx-2" onClick={handleExtraSpaces}>Remove Extra Spaces</button>

            </div>

            <div className="container" my-3 style={{color:props.mode === 'dark'?'white':'#1d3354'}}>
                <h2>Your text summary</h2>
                <p>{text.split(" ").length} words and {text.length} characters</p>
                <p>{.008 * text.split(" ").length} Minutes read </p>
                <h2>Preview</h2>
                <p>{text.length>0?text:"Enter something in the textbox above to preview it here"}</p>
            </div>
        </>
    )
}
