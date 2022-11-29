import * as React from "react";
import { Editor } from "../";

console.log(`74_editor/components/EditorContext.tsx`);

const EditorContext = React.createContext<Editor>({} as Editor);

export const useEditor = () => React.useContext(EditorContext);

export default EditorContext;
