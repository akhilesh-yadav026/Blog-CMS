"use client";

import { useState } from "react";

import {
  Link as LinkIcon,
  Unlink,
  ExternalLink,
  Save,
  X,
} from "lucide-react";

export default function LinkEditor({ editor }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [newTab, setNewTab] = useState(true);
  const [error, setError] = useState("");

  const openLinkEditor = () => {
    const existingLink = editor.getAttributes("link");

    setUrl(existingLink.href || "");

    setNewTab(existingLink.target === "_blank");

    setError("");
    setOpen(true);
  };

  const validateUrl = (value) => {
    try {
      const parsed = new URL(value);

      return ["http:", "https:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  const handleSave = () => {
    const trimmedUrl = url.trim();

    if (!validateUrl(trimmedUrl)) {
      setError("Enter a valid HTTP or HTTPS URL");
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: trimmedUrl,
        target: newTab ? "_blank" : "_self",
        rel: newTab ? "noopener noreferrer" : null,
      })
      .run();

    setOpen(false);
  };

  const handleRemove = () => {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .unsetLink()
      .run();

    setOpen(false);
  };

  return (
    <div className="relative">

      <button
        type="button"
        onClick={openLinkEditor}
        title="Insert or edit hyperlink"
        className={`rounded-md p-2 ${
          editor.isActive("link")
            ? "bg-blue-100 text-blue-700"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <LinkIcon size={19} />
      </button>

      {open && (
        <div className="absolute left-0 top-12 z-50 w-80 rounded-xl border bg-white p-4 shadow-xl">

          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">
              Manage Hyperlink
            </h3>

            <button
              type="button"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Destination URL
          </label>

          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          {error && (
            <p className="mt-2 text-xs text-red-500">
              {error}
            </p>
          )}

          <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={newTab}
              onChange={(e) => setNewTab(e.target.checked)}
            />

            Open link in new tab
          </label>

          <div className="mt-5 flex flex-wrap items-center gap-2">

            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
            >
              <Save size={15} />
              Save Link
            </button>

            <button
              type="button"
              onClick={handleRemove}
              disabled={!editor.isActive("link")}
              className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Unlink size={15} />
              Remove
            </button>

          </div>

        </div>
      )}

    </div>
  );
}