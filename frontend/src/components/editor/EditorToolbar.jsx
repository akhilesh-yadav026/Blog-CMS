"use client";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Highlighter,
} from "lucide-react";

import LinkEditor from "./LinkEditor";

export default function EditorToolbar({ editor }) {
  if (!editor) return null;

  const buttonClass = (active) =>
    `rounded-md p-2 transition ${
      active
        ? "bg-blue-100 text-blue-700"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b bg-gray-50 p-3">

      {/* Bold */}
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() =>
          editor.chain().focus().toggleBold().run()
        }
        className={buttonClass(editor.isActive("bold"))}
      >
        <Bold size={19} />
      </button>

      {/* Italic */}
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() =>
          editor.chain().focus().toggleItalic().run()
        }
        className={buttonClass(editor.isActive("italic"))}
      >
        <Italic size={19} />
      </button>

      {/* Underline */}
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() =>
          editor.chain().focus().toggleUnderline().run()
        }
        className={buttonClass(editor.isActive("underline"))}
      >
        <UnderlineIcon size={19} />
      </button>

      {/* Text Color */}
      <label className="flex cursor-pointer items-center gap-1 rounded-md p-2 hover:bg-gray-100">
        <span className="font-bold">A</span>

        <input
          type="color"
          className="h-5 w-5 cursor-pointer"
          onChange={(e) =>
            editor.chain().focus()
              .setColor(e.target.value)
              .run()
          }
        />
      </label>

      {/* Highlight */}
      <label className="flex cursor-pointer items-center gap-1 rounded-md p-2 hover:bg-gray-100">
        <Highlighter size={19} />

        <input
          type="color"
          defaultValue="#FFFF00"
          className="h-5 w-5 cursor-pointer"
          onChange={(e) =>
            editor.chain().focus()
              .toggleHighlight({
                color: e.target.value,
              })
              .run()
          }
        />
      </label>

      <LinkEditor editor={editor} />

    </div>
  );
}