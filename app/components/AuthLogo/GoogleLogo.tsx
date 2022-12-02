import * as React from "react";

type Props = {
  size?: number;
  fill?: string;
  className?: string;
};

console.log(`181_app/components/AuthLogo/GoogleLogo.tsx`);

function GoogleLogo({ size = 34, fill = "#FFF", className }: Props) {
  return (
    <svg
      fill={fill}
      width={size}
      height={size}
      viewBox="0 0 34 34"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g>
        <path d="M32.6162791,13.9090909 L16.8837209,13.9090909 L16.8837209,20.4772727 L25.9395349,20.4772727 C25.0953488,24.65 21.5651163,27.0454545 16.8837209,27.0454545 C11.3581395,27.0454545 6.90697674,22.5636364 6.90697674,17 C6.90697674,11.4363636 11.3581395,6.95454545 16.8837209,6.95454545 C19.2627907,6.95454545 21.4116279,7.80454545 23.1,9.19545455 L28.0116279,4.25 C25.0186047,1.62272727 21.1813953,0 16.8837209,0 C7.52093023,0 0,7.57272727 0,17 C0,26.4272727 7.52093023,34 16.8837209,34 C25.3255814,34 33,27.8181818 33,17 C33,15.9954545 32.8465116,14.9136364 32.6162791,13.9090909 Z" />
      </g>
    </svg>
  );
}

export default GoogleLogo;
