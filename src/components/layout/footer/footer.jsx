import React from 'react';
import PropTypes from 'prop-types';
import './footer.css';

const Footer = ({ className }) => {
  return (
    <footer className={`footer ${className}`}>
      <div className="footer-container">
        <p className="footer-text">© 2025 LogicSmart360 - All rights reserved</p>
      </div>
    </footer>
  );
};
Footer.propTypes = {
  className: PropTypes.string,
};
Footer.defaultProps = {
  className: "",
};


export default Footer;
