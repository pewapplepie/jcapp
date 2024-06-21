import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl">
        My React App
      </Link>
      <nav>
        <Link className="mr-4" to="/about">About</Link>
        <Link to="/blogs">Blogs</Link>
      </nav>
    </header>
  );
};

export default Header;
