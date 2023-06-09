import React from "react";

const Ellipsis = ({ onClick, paddingLeft, paddingRight }) => {
    return (
        <div style={{paddingLeft: paddingLeft, paddingRight: paddingRight}}>
          <svg
            width="15"
            height="4"
            viewBox="0 0 15 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
          >
            <path
                d="M2 4C3.10457 4 4 3.10457 4 2C4 0.895431 3.10457 0 2 0C0.895431 0 0 0.895431 0 2C0 3.10457 0.895431 4 2 4Z"
                fill="#535353"
            />
            <path
                d="M7.33203 4C8.4366 4 9.33203 3.10457 9.33203 2C9.33203 0.895431 8.4366 0 7.33203 0C6.22746 0 5.33203 0.895431 5.33203 2C5.33203 3.10457 6.22746 4 7.33203 4Z"
                fill="#535353"
            />
            <path
                d="M12.668 4C13.7725 4 14.668 3.10457 14.668 2C14.668 0.895431 13.7725 0 12.668 0C11.5634 0 10.668 0.895431 10.668 2C10.668 3.10457 11.5634 4 12.668 4Z"
                fill="#535353"
            />
          </svg>
        </div>
    );
};

export default Ellipsis;