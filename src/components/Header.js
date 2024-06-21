import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import linkedinIcon from '../assets/images/linkedinrect.svg';
import githubIcon from '../assets/images/github.svg';
import instagramIcon from '../assets/images/instagramfilled.svg';

const Header = ({ jeffreychenhaColor }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full flex flex-row items-start justify-between mt-4 mb-10 pt-4 px-8 pb-4 box-border gap-4 text-left text-base text-blue font-newsreader bg-white">
      <div className="flex flex-col items-start justify-start cursor-pointer">
        <Link to="/" className={`${location.pathname === '/' ? 'text-blue' : 'text-black'} text-3xl font-bold no-underline`}>
          My React App
        </Link>
      </div>
      <div className="flex flex-row items-start justify-start gap-10 text-center text-base text-black font-newsreader">
        <div className="flex flex-col items-start justify-start pt-2">
          <Link
            to="/about"
            className={`relative leading-[21px] inline-block cursor-pointer text-xl ${isActive('/about') ? 'text-blue font-bold underline decoration-3' : 'no-underline'}`}
          >
            About Me
          </Link>
        </div>
        <div className="flex flex-col items-start justify-start pt-2">
          <Link
            to="/blogs"
            className={`relative leading-[21px] inline-block cursor-pointer text-xl ${isActive('/blogs') ? 'text-blue font-bold underline decoration-3' : 'no-underline'}`}
          >
            Blogs
          </Link>
        </div>
        <img
          className="h-10 w-10 cursor-pointer"
          loading="lazy"
          alt="LinkedIn"
          src={linkedinIcon}
          onClick={() => window.location.href = 'https://www.linkedin.com/in/jeffrey-chen-537155173/'}
        />
        <img
          className="h-10 w-10 cursor-pointer"
          loading="lazy"
          alt="GitHub"
          src={githubIcon}
          onClick={() => window.location.href = 'https://github.com/pewapplepie'}
        />
        <img
          className="h-10 w-10 cursor-pointer"
          loading="lazy"
          alt="Instagram"
          src={instagramIcon}
          onClick={() => window.location.href = 'https://www.instagram.com/mortyismaltipoo?utm_source=qr'}
        />
      </div>
    </header>
  );
};

Header.propTypes = {
  jeffreychenhaColor: PropTypes.string,
};

export default Header;
