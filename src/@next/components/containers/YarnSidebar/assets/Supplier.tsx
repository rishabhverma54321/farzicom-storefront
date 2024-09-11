import * as React from "react";

function SupplierSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="56px" height="20px" viewBox="0 0 56 20" fill="none" {...props}>
      <rect
        x={0.824}
        y={0.741}
        width={54.352}
        height={18.765}
        rx={7.765}
        fill="#A33A34"
      />
      <path
        d="M9.221 12.736c1.103 0 2.105-.56 2.105-1.673 0-1.066-.916-1.334-1.438-1.476l-.961-.268c-.362-.097-.775-.242-.775-.64 0-.418.47-.698 1.006-.686.551.014 1.047.331 1.162.898l.965-.168c-.238-.995-1.013-1.558-2.116-1.569-1.092-.007-1.96.533-1.96 1.569 0 .946.72 1.233 1.196 1.371l1.386.41c.406.123.596.32.596.618 0 .496-.536.772-1.11.772-.648 0-1.188-.362-1.345-.999l-.931.142c.167 1.054 1.047 1.699 2.22 1.699zm6.005 0c1.278 0 2.16-.831 2.16-2.105V7.259h-.909v3.35c0 .797-.585 1.281-1.252 1.281-.652 0-1.251-.473-1.251-1.282v-3.35l-.91.008v3.365c0 1.278.883 2.105 2.162 2.105zm5.031-.112V10.75h1.32c.096 0 .29-.008.428-.03.924-.142 1.367-.83 1.367-1.714 0-.887-.436-1.572-1.367-1.718a3.073 3.073 0 00-.429-.03H19.36v5.366h.898zm0-4.523h1.282c.1 0 .235.007.34.033.446.116.588.53.588.872 0 .343-.142.756-.589.868-.104.03-.238.037-.339.037h-1.282v-1.81zm5.691 4.523V10.75h1.32c.096 0 .29-.008.428-.03.924-.142 1.367-.83 1.367-1.714 0-.887-.436-1.572-1.367-1.718a3.073 3.073 0 00-.429-.03H25.05v5.366h.898zm0-4.523h1.282c.1 0 .235.007.34.033.446.116.588.53.588.872 0 .343-.142.756-.589.868-.104.03-.238.037-.339.037h-1.282v-1.81zm8.136 4.523v-.842h-2.37V7.259h-.898v5.365h3.268zm2.535 0V7.259h-.898v5.365h.898zm2.945-.842v-1.517h2.12v-.842h-2.12V8.101h2.568v-.842h-3.466v5.365h3.466v-.842h-2.568zm7.5-1.192c.612-.272.906-.861.906-1.584 0-.887-.436-1.572-1.367-1.718a3.073 3.073 0 00-.429-.03h-2.217v5.366h.898V10.75h1.274l.91 1.874h1.017l-.991-2.034zm-.927-2.49c.1 0 .234.008.339.034.447.116.589.53.589.872 0 .343-.142.756-.59.868-.104.03-.238.037-.338.037h-1.282v-1.81h1.282z"
        fill="#fff"
      />
    </svg>
  );
}

const Supplier = React.memo(SupplierSVG);
export default Supplier;
