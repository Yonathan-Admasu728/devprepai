import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';

const Logo = () => {
  const router = useRouter();

  return (
    <div className="logoNav" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
      <Image
        src="/logo-h.png" 
        alt="Logo"
        width={63} 
        height={32}
        loading="lazy"
      />
    </div>
  );
};

export default Logo;
