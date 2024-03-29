import * as React from "react";
import styled from "styled-components";
import BlockMenuItem, { Props as BlockMenuItemProps } from "./BlockMenuItem";

console.log(`78_editor/components/EmojiMenuItem.tsx`);

const Emoji = styled.span`
  font-size: 16px;
`;

type Props = {
  emoji: React.ReactNode;
  title: React.ReactNode;
};

const EmojiTitle = ({ emoji, title }: Props) => {
  console.log(`79_editor/components/EmojiMenuItem.tsx_EmojiTitle`);
  return (
    <p>
      <Emoji className="emoji">{emoji}</Emoji>
      &nbsp;&nbsp;
      {title}
    </p>
  );
};

type EmojiMenuItemProps = Omit<BlockMenuItemProps, "shortcut" | "theme"> & {
  emoji: string;
};

export default function EmojiMenuItem(props: EmojiMenuItemProps) {
  return (
    <BlockMenuItem
      {...props}
      title={<EmojiTitle emoji={props.emoji} title={props.title} />}
    />
  );
}
