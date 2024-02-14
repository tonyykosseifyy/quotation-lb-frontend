import React from "react";

const Trashcan = ({ fillColor, onClick }) => {
  return (
    <svg width='15' height='16' viewBox='0 0 15 16' fill='none' xmlns='http://www.w3.org/2000/svg' onClick={onClick} style={{ cursor: "pointer" }}>
      <path
        d='M7.6618 1.13362C7.30991 1.13351 6.96665 1.24253 6.6793 1.44565C6.39196 1.64877 6.17467 1.93599 6.05737 2.26775C6.00548 2.4072 5.90086 2.52066 5.76608 2.58367C5.63129 2.64668 5.47714 2.6542 5.33687 2.6046C5.19659 2.555 5.08143 2.45225 5.01622 2.31852C4.95101 2.18478 4.94097 2.03078 4.98826 1.88971C5.18391 1.33701 5.54604 0.858532 6.02482 0.52012C6.5036 0.181709 7.07549 0 7.6618 0C8.2481 0 8.81999 0.181709 9.29877 0.52012C9.77755 0.858532 10.1397 1.33701 10.3353 1.88971C10.3826 2.03078 10.3726 2.18478 10.3074 2.31852C10.2422 2.45225 10.127 2.555 9.98672 2.6046C9.84645 2.6542 9.6923 2.64668 9.55752 2.58367C9.42273 2.52066 9.31811 2.4072 9.26622 2.26775C9.14883 1.93605 8.93151 1.64889 8.64419 1.44579C8.35687 1.24268 8.01366 1.13362 7.6618 1.13362ZM0.667969 3.59091C0.667969 3.44051 0.727713 3.29628 0.834059 3.18993C0.940405 3.08359 1.08464 3.02384 1.23504 3.02384H14.0886C14.239 3.02384 14.3832 3.08359 14.4895 3.18993C14.5959 3.29628 14.6556 3.44051 14.6556 3.59091C14.6556 3.74131 14.5959 3.88554 14.4895 3.99189C14.3832 4.09823 14.239 4.15798 14.0886 4.15798H1.23504C1.08464 4.15798 0.940405 4.09823 0.834059 3.99189C0.727713 3.88554 0.667969 3.74131 0.667969 3.59091ZM3.06099 5.44333C3.05097 5.29323 2.98172 5.15327 2.8685 5.05423C2.75528 4.95518 2.60735 4.90517 2.45725 4.9152C2.30716 4.92523 2.1672 4.99447 2.06815 5.10769C1.96911 5.22091 1.9191 5.36884 1.92913 5.51894L2.27995 10.7753C2.34422 11.7446 2.39639 12.5279 2.51888 13.1433C2.64665 13.7822 2.8629 14.316 3.3105 14.7342C3.75735 15.153 4.30476 15.3337 4.95122 15.4177C5.57272 15.4993 6.35754 15.4993 7.32987 15.4993H7.99448C8.96605 15.4993 9.75163 15.4993 10.3731 15.4177C11.0188 15.3337 11.5662 15.153 12.0138 14.7342C12.4607 14.316 12.6769 13.7815 12.8047 13.1433C12.9272 12.5279 12.9786 11.7446 13.0436 10.7753L13.3945 5.51894C13.4045 5.36884 13.3545 5.22091 13.2554 5.10769C13.1564 4.99447 13.0164 4.92523 12.8663 4.9152C12.7162 4.90517 12.5683 4.95518 12.4551 5.05423C12.3419 5.15327 12.2726 5.29323 12.2626 5.44333L11.9148 10.6603C11.8468 11.6788 11.7984 12.388 11.6925 12.9211C11.5889 13.439 11.4453 13.7127 11.2389 13.9062C11.0317 14.0998 10.7489 14.2253 10.2257 14.2934C9.6866 14.3637 8.97588 14.3652 7.9544 14.3652H7.36919C6.34847 14.3652 5.63774 14.3637 5.0979 14.2934C4.57468 14.2253 4.29191 14.0998 4.08474 13.9062C3.87832 13.7127 3.73467 13.439 3.63108 12.9211C3.52523 12.388 3.47684 11.6788 3.40879 10.6603L3.06099 5.44333Z'
        fill={fillColor}
      />
      <path
        d='M5.71329 6.80739C5.86287 6.7924 6.01229 6.83742 6.12869 6.93256C6.24509 7.02769 6.31895 7.16516 6.33404 7.31473L6.71208 11.0952C6.72316 11.2427 6.67616 11.3887 6.58112 11.502C6.48607 11.6153 6.35051 11.6871 6.20333 11.7019C6.05616 11.7166 5.90903 11.6734 5.79333 11.5812C5.67762 11.4891 5.60251 11.3553 5.584 11.2086L5.20595 7.42814C5.19096 7.27856 5.23598 7.12914 5.33112 7.01274C5.42625 6.89634 5.56372 6.82248 5.71329 6.80739ZM10.1145 7.42814C10.1256 7.28064 10.0786 7.13465 9.98352 7.02132C9.88847 6.90798 9.75291 6.83626 9.60574 6.82147C9.45856 6.80667 9.31143 6.84997 9.19573 6.94212C9.08003 7.03427 9.00491 7.16798 8.9864 7.31473L8.60836 11.0952C8.59728 11.2427 8.64428 11.3887 8.73932 11.502C8.83437 11.6153 8.96993 11.6871 9.11711 11.7019C9.26428 11.7166 9.41141 11.6734 9.52711 11.5812C9.64281 11.4891 9.71793 11.3553 9.73644 11.2086L10.1145 7.42814Z'
        fill={fillColor}
      />
    </svg>
  );
};

export default Trashcan;
