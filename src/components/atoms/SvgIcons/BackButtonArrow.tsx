
import * as React from "react";

function BackArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8.82826 19.1171L0.35315 10.642C0.224739 10.5136 0.133567 10.3745 0.0796345 10.2247C0.025702 10.0748 -0.000836007 9.91433 2.00644e-05 9.74312C2.00644e-05 9.5719 0.0269866 9.41139 0.0809191 9.26158C0.134852 9.11177 0.225595 8.97265 0.35315 8.84424L8.82826 0.369133C9.06368 0.133713 9.35817 0.0108674 9.71173 0.000594572C10.0653 -0.00967829 10.37 0.113168 10.626 0.369133C10.8828 0.604553 11.0168 0.899042 11.0279 1.2526C11.0391 1.60616 10.9158 1.91092 10.6581 2.16688L4.36599 8.45901H18.7159C19.0797 8.45901 19.3849 8.58229 19.6315 8.82883C19.878 9.07538 20.0009 9.38014 20 9.74312C20 10.1069 19.8771 10.4121 19.6315 10.6587C19.3858 10.9052 19.0806 11.0281 18.7159 11.0272H4.36599L10.6581 17.3194C10.8935 17.5548 11.0168 17.8544 11.0279 18.2182C11.0391 18.5821 10.9158 18.8817 10.6581 19.1171C10.4227 19.3739 10.1231 19.5023 9.75924 19.5023C9.39541 19.5023 9.08508 19.3739 8.82826 19.1171Z" fill="white"/>
    </svg>
  );
}

const MemoBackArrow = React.memo(BackArrow);
export default MemoBackArrow;

