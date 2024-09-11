import * as React from "react";

function ProfileSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 26 20" fill="none" {...props}>
      <path
        d="M25.466 18.503c-2.704-2.704-6.425-4.262-10.304-4.684 2.697-.91 4.647-3.463 4.647-6.464 0-3.761-3.06-6.82-6.82-6.82-3.761 0-6.821 3.059-6.821 6.82 0 3.003 1.952 5.558 4.653 6.466-3.873.425-7.587 1.982-10.287 4.682a.387.387 0 00.547.548c6.126-6.127 17.71-6.127 23.838 0a.387.387 0 10.547-.548zM6.942 7.355a6.053 6.053 0 016.046-6.047 6.053 6.053 0 016.046 6.047 6.054 6.054 0 01-6.046 6.047 6.053 6.053 0 01-6.046-6.047z"
        fill="#616161"
      />
    </svg>
  );
}

const Profile = React.memo(ProfileSVG);
export default Profile;
