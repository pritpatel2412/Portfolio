import React from "react";

const Footer = () => {
  return (
    <footer
      className="relative w-full text-center py-16 bg-transparent border-t border-neutral-800"
      style={{ minHeight: '200px' }}
    >
      {/* Footer Text */}
      <p className="text-sm text-neutral-400 relative" style={{ zIndex: 10000 }}>
        © {new Date().getFullYear()} Prit Patel. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;