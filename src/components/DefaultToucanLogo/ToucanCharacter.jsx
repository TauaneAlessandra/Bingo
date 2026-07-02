import React from 'react';

const ToucanCharacter = () => (
  <>
    {/* Toucan Beak */}
    <path d="M 46 48 C 55 45, 68 52, 64 62 C 58 60, 48 56, 46 48 Z" fill="#f97316" />
    <path d="M 58 51 C 65 52, 68 52, 64 62 C 58 60, 56 57, 58 51 Z" fill="#ef4444" />
    
    {/* Toucan Face */}
    <circle cx="43" cy="50" r="10" fill="white" />
    <circle cx="41" cy="49" r="3" fill="black" />
    
    {/* Body/Shirt */}
    <path d="M 30 75 C 30 60, 50 60, 55 75 Z" fill="#dc2626" />
    {/* Straw details */}
    <line x1="28" y1="78" x2="32" y2="70" stroke="#ca8a04" strokeWidth="1.5" />
    <line x1="52" y1="78" x2="56" y2="70" stroke="#ca8a04" strokeWidth="1.5" />
  </>
);

export default ToucanCharacter;
