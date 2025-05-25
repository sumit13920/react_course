import React  from 'react';
// import NoteContext from '../context/notes/noteContext';

const About = () => {
  return (
    <div>
      <div className="container my-5">
  <h2 className="mb-3">About iNotes</h2>
  <p>
    Welcome to <strong>iNotes</strong> – your personal digital notebook built for speed,
    simplicity, and staying organized. Whether you’re jotting down quick ideas,
    planning your next big project, or just managing daily tasks, iNotes is here to make your life easier.
  </p>

  <p>
    With iNotes, you can:
    <ul>
      <li>Create, edit, and delete notes easily</li>
      <li>Tag your notes for better organization</li>
      <li>Access your notes anywhere, anytime (if deployed with backend)</li>
    </ul>
  </p>

  <p>
    This app is built using <strong>React.js</strong> for a smooth and fast UI experience, and it's
    styled with <strong>Bootstrap</strong> to keep things responsive and modern. It’s designed to
    help students, professionals, and anyone who just needs a simple, reliable note-taking app.
  </p>

  <p>
    iNotes is part of my learning journey as an aspiring developer – so it’s not just a project,
    it’s a piece of my growth story. ❤️
  </p>

  <p className="text-muted">
    Built with 💻 by Sumit — Just a village boy chasing big tech dreams 🚀
  </p>
</div>
    </div>
  );
};

export default About;
