import { Node as ProsemirrorNode } from "prosemirror-model";
import { EditorView, Decoration } from "prosemirror-view";
import * as React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import Extension from "@shared/editor/lib/Extension";
import { ComponentProps } from "@shared/editor/types";
import { Editor } from "~/editor";

type Component = (props: ComponentProps) => React.ReactElement;

console.log(`67_editor/components/ComponentView.tsx`);

export default class ComponentView {
  component: Component;
  editor: Editor;
  extension: Extension;
  node: ProsemirrorNode;
  view: EditorView;
  getPos: () => number;
  decorations: Decoration<{
    [key: string]: any;
  }>[];

  isSelected = false;
  dom: HTMLElement | null;

  // See https://prosemirror.net/docs/ref/#view.NodeView
  constructor(
    component: Component,
    {
      editor,
      extension,
      node,
      view,
      getPos,
      decorations,
    }: {
      editor: Editor;
      extension: Extension;
      node: ProsemirrorNode;
      view: EditorView;
      getPos: () => number;
      decorations: Decoration<{
        [key: string]: any;
      }>[];
    }
  ) {
    this.component = component;
    this.editor = editor;
    this.extension = extension;
    this.getPos = getPos;
    this.decorations = decorations;
    this.node = node;
    this.view = view;
    this.dom = node.type.spec.inline
      ? document.createElement("span")
      : document.createElement("div");

    this.dom.classList.add(`component-${node.type.name}`);

    this.renderElement();
    window.addEventListener("theme-changed", this.renderElement);
    window.addEventListener("location-changed", this.renderElement);
  }

  renderElement = () => {
    console.log(`68_editor/components/ComponentView.tsx_renderElement`);
    const { theme } = this.editor.props;

    const children = this.component({
      theme,
      node: this.node,
      isSelected: this.isSelected,
      isEditable: this.view.editable,
      getPos: this.getPos,
    });

    ReactDOM.render(
      <ThemeProvider theme={theme}>{children}</ThemeProvider>,
      this.dom
    );
  };

  update(node: ProsemirrorNode) {
    console.log(`69_editor/components/ComponentView.tsx_update`);
    if (node.type !== this.node.type) {
      return false;
    }

    this.node = node;
    this.renderElement();
    return true;
  }

  selectNode() {
    console.log(`70_editor/components/ComponentView.tsx_selectNode`);
    if (this.view.editable) {
      this.isSelected = true;
      this.renderElement();
    }
  }

  deselectNode() {
    console.log(`70_editor/components/ComponentView.tsx_deselectNode`);
    if (this.view.editable) {
      this.isSelected = false;
      this.renderElement();
    }
  }

  stopEvent(event: Event) {
    console.log(`71_editor/components/ComponentView.tsx_stopEvent`);
    return event.type !== "mousedown" && !event.type.startsWith("drag");
  }

  destroy() {
    console.log(`72_editor/components/ComponentView.tsx_destroy`);
    window.removeEventListener("theme-changed", this.renderElement);
    window.removeEventListener("location-changed", this.renderElement);

    if (this.dom) {
      ReactDOM.unmountComponentAtNode(this.dom);
    }
    this.dom = null;
  }

  ignoreMutation() {
    console.log(`73_editor/components/ComponentView.tsx_ignoreMutation`);
    return true;
  }
}
