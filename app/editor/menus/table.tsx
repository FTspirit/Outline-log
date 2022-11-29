import { TrashIcon } from "outline-icons";
import { MenuItem } from "@shared/editor/types";
import { Dictionary } from "~/hooks/useDictionary";

export default function tableMenuItems(dictionary: Dictionary): MenuItem[] {
  console.log(`128_editor/menus/table.tsx_imageMenuItems`);
  return [
    {
      name: "deleteTable",
      tooltip: dictionary.deleteTable,
      icon: TrashIcon,
      active: () => false,
    },
  ];
}
