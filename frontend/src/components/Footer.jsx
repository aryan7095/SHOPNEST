import React from 'react';
import { Link } from 'react-router-dom';

// Site-wide footer: branding, quick links, and copyright notice
const Footer = () => {
  return (
    <footer style={{
      background: '#09090b',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '40px 20px',
      marginTop: 'auto' // pushes footer to bottom when content is shorter than viewport (flex layout)
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        {/* Brand name and tagline */}
        <div>
          <h3 style={{ color: '#f97316', marginBottom: '10px' }}>ShopNest</h3>
          <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Premium E-Commerce Platform.</p>
        </div>
        
        {/* Quick navigation links to informational pages */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/about" style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>About Us</Link>
          <Link to="/return" style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Return Policy</Link>
          <Link to="/disclaimer" style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Disclaimer</Link>
        </div>
        
        {/* Dynamically computed current year in the copyright line */}
        <div style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} ShopNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
