"use client";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

export default function BlogContent({ content }) {
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
        openOnClick: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
        },
      }),
    ],

    content,

    editable: false,

    immediatelyRender: false,
  });

  if (!editor) {
    return (
      <div className="h-40 animate-pulse rounded-lg bg-gray-100" />
    );
  }

  return (
    <div className="blog-content">
      <EditorContent editor={editor} />
    </div>
  );
}
