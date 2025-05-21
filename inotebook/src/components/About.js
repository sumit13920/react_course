import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/noteContext';

const About = () => {
  const context = useContext(NoteContext);
  useEffect(()=>{
    context.update()
    //eslint-disable-next-line
  },[])
  return (
    <div>
      This is About {context.state?.name || 'No name provided'} and he is in class {context.state?.class || 'No class provided'}
    </div>
  );
};

export default About;
