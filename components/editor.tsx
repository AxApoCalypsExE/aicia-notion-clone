"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import { useEdgeStore } from "@/lib/edgestore";
import { PartialBlock } from "@blocknote/core";
import { useTheme } from "next-themes";

import "@blocknote/mantine/style.css"

import "./styles.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({
    onChange,
    initialContent,
    editable
}: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });

        return response.url;
    }
    
  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });


  return (
    <div>
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={() => {
            onChange(JSON.stringify(editor.document, null, 2));
          }}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;


//   const handleOnChange = useCallback(() => {
//     if (onChange) {
//       setTimeout(() => {
//         onChange(JSON.stringify(editor.document, null, 2));
//       }, 1000);
//     }
//   }, [editor]);
