import React from 'react';

const Alert = (props) => {
    const id = localStorage.getItem("id");
    // console.log(id,"id to login")

    return (
        <>
            {id && (
                <div className="alert alert-primary" role="alert">
                    {props.message}
                </div>
            )}
        </>
    );
};

export default Alert;
