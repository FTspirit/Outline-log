import * as React from "react";
import { DefaultTheme, useTheme } from "styled-components";

console.log(`122_editor/components/WithTheme.tsx`);

type Props = {
  children: (theme: DefaultTheme) => React.ReactElement;
};

export default function WithTheme({ children }: Props) {
  const theme = useTheme();
  return children(theme);
}
