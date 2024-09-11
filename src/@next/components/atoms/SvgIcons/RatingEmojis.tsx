import * as React from "react";

function RatingFive(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 53 53" fill="none" {...props}>
      <path
        className="rating-bg"
        d="M51.667 26.166C51.667 12.267 40.4 1 26.501 1 12.602 1 1.335 12.267 1.335 26.166c0 13.9 11.267 25.166 25.166 25.166 13.9 0 25.166-11.267 25.166-25.166z"
        stroke="#1D2136"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <path
        d="M14.003 28.848a92.544 92.544 0 0124.996 0S39.44 40 26.478 40c-12.963 0-12.475-11.152-12.475-11.152z"
        fill="#1D2136"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.713 10.765a3.576 3.576 0 00-2.61 2.905 3.62 3.62 0 00-3.697-1.296 3.21 3.21 0 00-2.348 3.967c.635 2.453 3.801 3.732 8.377 6.446 2.714-4.576 4.871-7.22 4.245-9.682a3.199 3.199 0 00-3.967-2.34zM34.954 10.765a3.2 3.2 0 00-3.967 2.34c-.626 2.462 1.54 5.106 4.245 9.682 4.585-2.714 7.751-3.993 8.377-6.446a3.2 3.2 0 00-2.348-3.967 3.593 3.593 0 00-3.689 1.296 3.6 3.6 0 00-2.61-2.905h-.008z"
        fill="#1D2136"
      />
    </svg>
  );
}

function RatingFour(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 53 53" fill="none" {...props}>
      <path
        className="rating-bg"
        d="M51.832 26.166C51.832 12.267 40.565 1 26.666 1 12.766 1 1.5 12.267 1.5 26.166c0 13.9 11.267 25.166 25.166 25.166 13.899 0 25.166-11.267 25.166-25.166z"
        stroke="#1D2136"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <path
        d="M16.901 21.372c1.317 0 2.384-1.748 2.384-3.906 0-2.157-1.067-3.906-2.384-3.906-1.316 0-2.383 1.75-2.383 3.906 0 2.157 1.067 3.906 2.383 3.906zM35.778 21.372c1.316 0 2.383-1.748 2.383-3.906 0-2.157-1.067-3.906-2.383-3.906-1.317 0-2.384 1.75-2.384 3.906 0 2.157 1.067 3.906 2.384 3.906zM15.002 28.845a85.59 85.59 0 0123.996 0S39.445 40 26.996 40c-12.448 0-11.994-11.155-11.994-11.155z"
        fill="#1D2136"
      />
    </svg>
  );
}

function RatingThree(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 53 53" fill="none" {...props}>
      <path
        className="rating-bg"
        d="M26.833 51.332c13.899 0 25.166-11.267 25.166-25.166C51.999 12.267 40.732 1 26.833 1 12.933 1 1.667 12.267 1.667 26.166c0 13.9 11.267 25.166 25.166 25.166z"
        stroke="#1D2136"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <path
        d="M20.482 19.163a3.62 3.62 0 00-3.723-2.453 3.862 3.862 0 00-3.715 2.453M39.029 19.163a3.61 3.61 0 00-3.715-2.453 3.846 3.846 0 00-3.714 2.453"
        stroke="#000"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.43 30.716s6.733 4.158 13.753 0"
        stroke="#1D2136"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </svg>
  );
}

function RatingTwo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 54 53" fill="none" {...props}>
      <path
        className="rating-bg"
        d="M26.995 51.332c13.9 0 25.166-11.267 25.166-25.166C52.161 12.267 40.894 1 26.995 1 13.096 1 1.83 12.267 1.83 26.166c0 13.9 11.267 25.166 25.166 25.166z"
        stroke="#1D2136"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <path
        d="M17.243 21.373c1.317 0 2.384-1.749 2.384-3.906s-1.067-3.906-2.384-3.906c-1.316 0-2.383 1.749-2.383 3.906s1.067 3.906 2.383 3.906zM36.112 21.373c1.316 0 2.384-1.749 2.384-3.906s-1.068-3.906-2.384-3.906c-1.316 0-2.384 1.749-2.384 3.906s1.068 3.906 2.384 3.906z"
        fill="#000"
      />
      <path
        d="M20.793 33.421a6.09 6.09 0 016.15-4.636 6.237 6.237 0 016.263 4.636"
        stroke="#1D2136"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </svg>
  );
}

function RatingOne(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 53 53" fill="none" {...props}>
      <path
        className="rating-bg"
        d="M26.166 51.332c13.9 0 25.166-11.267 25.166-25.166C51.332 12.267 40.065 1 26.166 1 12.267 1 1 12.267 1 26.166c0 13.9 11.267 25.166 25.166 25.166z"
        stroke="#1D2136"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <path
        d="M20.677 41.885s4.62-3.87 10.978 0"
        stroke="#1D2136"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M16.727 33.56c1.317 0 2.384-1.748 2.384-3.906 0-2.157-1.067-3.905-2.384-3.905-1.316 0-2.383 1.748-2.383 3.905 0 2.158 1.067 3.906 2.383 3.906z"
        fill="#000"
      />
      <path
        d="M13.744 24.044l6.107 4.21"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.988 29.654c0 2.158-1.07 3.906-2.383 3.906-1.314 0-2.419-1.748-2.419-3.906 0-2.157 1.062-3.914 2.384-3.914 1.322 0 2.418 1.757 2.418 3.915z"
        fill="#000"
      />
      <path
        d="M37.918 24.044l-6.107 4.21"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoRatingOne = React.memo(RatingOne);

const MemoRatingTwo = React.memo(RatingTwo);

const MemoRatingThree = React.memo(RatingThree);

const MemoRatingFour = React.memo(RatingFour);

const MemoRatingFive = React.memo(RatingFive);

export {
  MemoRatingOne as RatingOne,
  MemoRatingTwo as RatingTwo,
  MemoRatingThree as RatingThree,
  MemoRatingFour as RatingFour,
  MemoRatingFive as RatingFive,
};
