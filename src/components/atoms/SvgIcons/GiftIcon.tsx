import * as React from "react";

function GiftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="72"
      height="72"
      fill="none"
      viewBox="0 0 72 72"
    >
      <path fill="url(#pattern0)" d="M0 0H72V72H0z" />
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.00195)" xlinkHref="#image0_510_2352" />
        </pattern>
        <image
          id="image0_510_2352"
          width="512"
          height="512"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA3XAAAN1wFCKJt4AAAFyWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuNTY2ZWJjNSwgMjAyMi8wNS8wOS0wNzoyMjoyOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjQgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wOC0xN1QxNTozNjowMiswNTozMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDgtMTdUMTU6NDI6MzcrMDU6MzAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDgtMTdUMTU6NDI6MzcrMDU6MzAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmRiYTg0MmNjLTRmZTgtMzI0Yy1hYmFiLTBkMDAyYTQ3YzFjMCIgeG1wTU06RG9jdW1lbnRJRD0i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IIWZmJyZiDx+3l8/JEnKlAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAxZACRJypAFQJKkDFkAJEnKkAVAkqQMWQAkScqQBUCSpAylUABmowNIkjRi4WNfCgXgougAkiSNWPjYl0IBOC86gCRJIxY+9lkAJEkavfCxzwIgSdLohY99FgBJkkYvfOyzAEiSNHrhY18KBeC70QEkSRqx8LEvhQLwVeCC6BCSJI3IBXRjX6jwAjAxObMZODU6hyRJI3JqP/aFCi8AvQ3RASRJGpEN0QEgnQLwOeCK6BCSJK2yK+jGvHBJFICJyZkZ4NPROSRJWmWf7se8cEkUgN67ogNIkrTKkhnrkikAE5Mz/w000TkkSVolTT/WJSGZAtB7PglskShJ0gqbpRvjkpFUAZiYnPkGUEfnkCRphdX9GJeMpApA7zjg2ugQkiStkGvpxrakJFcAJiZnzgROjM4hSdIKObEf25KSXAHovQDYGB1CkqRl2kg3piUnyQIwMTlzDfAI4JzoLJIkLdE5wCP6MS05SRYAgInJmQuBI3CFQEnS8FwBHNGPZUlKtgAATEzOfAd4It4aKEkajlngif0YlqykCwDAxOTMR4BnApuis0iStB2bgGf2Y1fSki8AABOTM28FHgpcGp1FkqStuBR4aD9mJW8QBQB+t1TwocCPorNIkrSFHwGHprTU7/YMpgAATEzO/JCuBHwmOoskSb3P0A3+P4wOshiDKgAAE5MzlwCHAc8FLo5NI0nK2MV0Y9Fh/dg0KIMrAAATkzObJiZnXg/cDng1cFVwJElSPq6iG3tuNzE58/qJyZlBXqQ+yAJwvYnJmUsmJmeOAQ4C3ot3CkiSVs8murHmoInJmWOG+K1/rrXRAVbCxOTML4Anz25c90rg0cAUcFdgIjKXJGnwZoFvABuAk1Nc03+pJmZnx3ONndmN6w6gW0lwCrgvsGNoIGke9z//7tERQp2279eiI0jzuRb4It2gf8rE5MzPY+OsjrEtAHPNbly3K3ALYL95fvYIjKbM3e3n97lrdIZIXz/gS9+MzqCsXQacN8/PuROTM2O/DH0WBUCSJN3QoC8ClCRJS2MBkCQpQxYASZIyZAGQJClDFgBJkjJkAZAkKUMWAEmSMmQBkCQpQxYASZIyZAGQJClDFgBJkjJkAZAkKUMWAEmSMmQBkCQpQxYASZIy9P8Ba/KK4IUziOwAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
}

const MemoGiftIcon = React.memo(GiftIcon);
export default MemoGiftIcon;
