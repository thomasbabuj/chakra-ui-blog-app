import { Box } from "@chakra-ui/react";
import isHotkey from "is-hotkey";
import React, { useCallback, useMemo, useState } from "react";
import { Descendant, Editor, Node, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import { Element } from "./Elements";
import { Leaf } from "./Leaf";
import { Toolbar, toggleMark } from "./Toolbar";
import { PostBody } from "@/atoms/postsAtom";

//https://codesandbox.io/s/chakra-slatejs-ptpfm?file=/src/index.tsx
export interface RichTextBlockProps {
  editorContent: PostBody[] | Descendant[];
  passCurrentContentToParent: (
    content: PostBody[] | Descendant[] | null
  ) => void;
}

// @refresh reset
const HOTKEYS: { [hotkey: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export const RichTextBlock: React.FC<RichTextBlockProps> = ({
  editorContent,
  passCurrentContentToParent,
}) => {
  const [value, setValue] = useState<PostBody[] | Descendant[]>(editorContent);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const divRef = React.useRef<HTMLDivElement>(null);

  //focus selection
  const [focused, setFocused] = React.useState(false);
  const savedSelection = React.useRef(editor.selection);

  passCurrentContentToParent(value);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  const onBlur = React.useCallback(() => {
    setFocused(false);
    savedSelection.current = editor.selection;
  }, [editor]);

  const onFocus = React.useCallback(() => {
    setFocused(true);
    if (!editor.selection && value?.length) {
      Transforms.select(
        editor,
        savedSelection.current ?? Editor.end(editor, [])
      );
    }
  }, [editor]);

  const focusEditor = React.useCallback(
    (e: React.MouseEvent) => {
      if (e.target === divRef.current) {
        ReactEditor.focus(editor);
        e.preventDefault();
      }
    },
    [editor]
  );
  const youtubeRegex =
    /^(?:(?:https?:)?\/\/)?(?:(?:www|m)\.)?(?:(?:youtube\.com|youtu.be))(?:\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(?:\S+)?$/;

  // https://jkrsp.com/slate-js-youtube-embeds/
  const onPaste = React.useCallback(
    (e) => {
      const pastedText = e.clipboardData?.getData("text")?.trim();
      const matches = pastedText.match(youtubeRegex);
      if (matches != null) {
        const [_, videoId] = matches;
        e.preventDefault();
        Transforms.insertNodes(editor, [
          {
            type: "youtube",
            videoId,
            children: [
              {
                text: "",
              },
            ],
          },
        ]);
      }
    },
    [editor]
  );

  return (
    <Box
      ref={divRef}
      onMouseDown={focusEditor}
      borderWidth={"1px"}
      color={"black"}
      fontSize="10pt"
      borderRadius="4px"
    >
      <Slate
        editor={editor}
        initialValue={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Toolbar />
        <Box
          padding={"15px 5px"}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "black",
          }}
        >
          <Editable
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter your post content."
            spellCheck
            style={{
              minHeight: "150px",
              resize: "vertical",
              overflow: "auto",
              color: "black",
            }}
            onPaste={onPaste}
          />
        </Box>
      </Slate>
    </Box>
  );
};
