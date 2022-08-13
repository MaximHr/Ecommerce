import React from 'react';
import Link from 'next/link';

const Canceled = () => {
  return (
    <div style={{minHeight: '70vh', paddingTop: '5rem', textAlign: 'center'}}>
        <h1>The transaction was declined</h1>
        <Link href='/'>
            <button className="btn">Try Again</button>
        </Link>
    </div>
  )
}

export default Canceled;