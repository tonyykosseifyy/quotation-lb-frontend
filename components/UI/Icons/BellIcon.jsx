import React from "react";

const BellIcon = ({ hasNewNotification }) => {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 17 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.4816 9.81351V8.18527H13.2224V10.0742C13.2224 10.2412 13.2888 10.4013 13.4068 10.5193L15.1113 12.2238V13.2224H1.25927V12.2238L2.9637 10.5193C3.08178 10.4013 3.14814 10.2412 3.14818 10.0742V7.55563C3.14643 6.67086 3.37819 5.8013 3.82006 5.03477C4.26193 4.26824 4.89826 3.63189 5.66477 3.18999C6.43129 2.7481 7.30084 2.5163 8.18561 2.51803C9.07038 2.51975 9.93903 2.75493 10.7038 3.19981V1.79257C10.1045 1.5272 9.46698 1.35805 8.81491 1.29138V0H7.55563V1.29075C6.00331 1.44875 4.56471 2.17673 3.51801 3.33391C2.47131 4.4911 1.89086 5.99529 1.88891 7.55563V9.81351L0.184483 11.5179C0.0663955 11.636 3.5661e-05 11.7961 0 11.9631V13.852C0 14.019 0.0663364 14.1791 0.184416 14.2972C0.302496 14.4153 0.462646 14.4816 0.629636 14.4816H5.03709V15.1113C5.03709 15.9462 5.36877 16.747 5.95917 17.3374C6.54957 17.9278 7.35032 18.2594 8.18527 18.2594C9.02022 18.2594 9.82097 17.9278 10.4114 17.3374C11.0018 16.747 11.3335 15.9462 11.3335 15.1113V14.4816H15.7409C15.9079 14.4816 16.068 14.4153 16.1861 14.2972C16.3042 14.1791 16.3705 14.019 16.3705 13.852V11.9631C16.3705 11.7961 16.3041 11.636 16.1861 11.5179L14.4816 9.81351ZM10.0742 15.1113C10.0742 15.6122 9.87517 16.0927 9.52093 16.4469C9.16669 16.8012 8.68624 17.0002 8.18527 17.0002C7.6843 17.0002 7.20385 16.8012 6.84961 16.4469C6.49537 16.0927 6.29636 15.6122 6.29636 15.1113V14.4816H10.0742V15.1113Z"
                fill="var(--primary-text-clr)"
            />
            <path
                d="M14.4814 6.926C15.8724 6.926 17 5.79841 17 4.40746C17 3.01651 15.8724 1.88892 14.4814 1.88892C13.0905 1.88892 11.9629 3.01651 11.9629 4.40746C11.9629 5.79841 13.0905 6.926 14.4814 6.926Z"
                fill={hasNewNotification ? "#4472C4" : ""}
                stroke={!hasNewNotification ? "var(--primary-text-clr)" : ""}
            />
        </svg>
    );
};

export default BellIcon;
