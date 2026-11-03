"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle, Color } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

import EditorToolbar from "./EditorToolbar";

export default function RichTextEditor({
  content,
  onChange,
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
        },
      }),
    ],

    content,

    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  // Load content when it arrives from API
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return <div className="h-48 animate-pulse rounded-lg bg-gray-100" />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
      <EditorToolbar editor={editor} />

      <div className="min-h-[350px] p-5">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}