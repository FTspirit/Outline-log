import * as React from "react";
import { MenuSeparator } from "reakit/Menu";
import styled from "styled-components";

console.log(`188_app/components/ContextMenu/Separator.tsx`);

export default function Separator(rest: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <MenuSeparator {...rest}>
      {(props) => <HorizontalRule {...props} />}
    </MenuSeparator>
  );
}

const HorizontalRule = styled.hr`
  margin: 0.5em 12px;
`;
