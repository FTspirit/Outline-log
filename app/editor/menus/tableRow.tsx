import { TrashIcon, InsertAboveIcon, InsertBelowIcon } from "outline-icons";
import { EditorState } from "prosemirror-state";
import { MenuItem } from "@shared/editor/types";
import { Dictionary } from "~/hooks/useDictionary";

console.log(`131_editor/menus/tableRow.tsx`);

export default function tableRowMenuItems(
  state: EditorState,
  index: number,
  dictionary: Dictionary
): MenuItem[] {
  console.log(`132_editor/menus/tableRow.tsx_tableRowMenuItems`);
  return [
    {
      name: "addRowAfter",
      tooltip: dictionary.addRowBefore,
      icon: InsertAboveIcon,
      attrs: { index: index - 1 },
      active: () => false,
      visible: index !== 0,
    },
    {
      name: "addRowAfter",
      tooltip: dictionary.addRowAfter,
      icon: InsertBelowIcon,
      attrs: { index },
      active: () => false,
    },
    {
      name: "separator",
    },
    {
      name: "deleteRow",
      tooltip: dictionary.deleteRow,
      icon: TrashIcon,
      active: () => false,
    },
  ];
}
