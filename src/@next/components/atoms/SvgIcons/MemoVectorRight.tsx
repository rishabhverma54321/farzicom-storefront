import React from 'react'

const MemoVectorRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="8"
      fill="none"
      viewBox="0 0 5 8"
    >
      <path
        fill="#71D88A"
        d="M0 .397v7.15c0 .071.017.142.049.204a.367.367 0 00.13.146.291.291 0 00.345-.024l4.341-3.574c.18-.149.18-.505 0-.654L.524.071A.29.29 0 00.179.045a.366.366 0 00-.131.147A.455.455 0 000 .397z"
      ></path>
    </svg>
  );
}

export default React.memo(MemoVectorRight);