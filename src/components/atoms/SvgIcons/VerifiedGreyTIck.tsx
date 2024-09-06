import * as React from "react";

function VerifiedGreyTick(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.03513 16.2861L2.45902 15.7283C2.22482 15.6818 2.03747 15.5616 1.89696 15.3676C1.75644 15.1743 1.7018 14.9614 1.73302 14.729L1.99063 12.1029L0.234192 10.1042C0.078064 9.93381 0 9.7324 0 9.5C0 9.2676 0.078064 9.06619 0.234192 8.89576L1.99063 6.89712L1.73302 4.271C1.7018 4.0386 1.75644 3.82572 1.89696 3.63236C2.03747 3.43839 2.22482 3.31816 2.45902 3.27168L5.03513 2.71392L6.39344 0.436396C6.51835 0.234982 6.69009 0.103289 6.90867 0.0413156C7.12724 -0.0206578 7.34582 -0.0129111 7.5644 0.0645556L10 1.08712L12.4356 0.0645556C12.6542 -0.0129111 12.8728 -0.0206578 13.0913 0.0413156C13.3099 0.103289 13.4817 0.234982 13.6066 0.436396L14.9649 2.71392L17.541 3.27168C17.7752 3.31816 17.9625 3.43839 18.103 3.63236C18.2436 3.82572 18.2982 4.0386 18.267 4.271L18.0094 6.89712L19.7658 8.89576C19.9219 9.06619 20 9.2676 20 9.5C20 9.7324 19.9219 9.93381 19.7658 10.1042L18.0094 12.1029L18.267 14.729C18.2982 14.9614 18.2436 15.1743 18.103 15.3676C17.9625 15.5616 17.7752 15.6818 17.541 15.7283L14.9649 16.2861L13.6066 18.5636C13.4817 18.765 13.3099 18.8967 13.0913 18.9587C12.8728 19.0207 12.6542 19.0129 12.4356 18.9354L10 17.9129L7.5644 18.9354C7.34582 19.0129 7.12724 19.0207 6.90867 18.9587C6.69009 18.8967 6.51835 18.765 6.39344 18.5636L5.03513 16.2861ZM8.36066 12.1494C8.5324 12.3198 8.75098 12.405 9.01639 12.405C9.28181 12.405 9.50039 12.3198 9.67213 12.1494L13.6534 8.19856C13.8408 8.01264 13.9344 7.7917 13.9344 7.53575C13.9344 7.28042 13.8408 7.0598 13.6534 6.87388C13.466 6.68796 13.2437 6.595 12.9864 6.595C12.7285 6.595 12.5059 6.68796 12.3185 6.87388L9.01639 10.1507L7.65808 8.82604C7.47073 8.65561 7.2484 8.57412 6.9911 8.58156C6.73318 8.58961 6.51835 8.67885 6.34661 8.84928C6.17486 9.01971 6.08899 9.23661 6.08899 9.5C6.08899 9.76339 6.17486 9.98029 6.34661 10.1507L8.36066 12.1494Z"
        fill="#A5A5A5"
      />
    </svg>
  );
}

const MemoVerifiedGreyTick = React.memo(VerifiedGreyTick);
export default MemoVerifiedGreyTick;
