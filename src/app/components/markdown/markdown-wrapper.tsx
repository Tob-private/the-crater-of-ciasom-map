'use client'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export default function MarkdownWrapper() {
  const pathname = usePathname();
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    let mdPath = "index.md";
    if (pathname !== "/") {
      // Remove leading slash, split path, and use last segment as filename
      const segments = pathname.replace(/^\//, "").split("/");
      const fileName = segments[segments.length - 1];
      mdPath = `${segments.join("/")}/${fileName}.md`;
    }

    fetch(`/obsidian-vault/${mdPath}`)
      .then((res) => {
        if (!res.ok) throw new Error("Markdown not found");
        return res.text();
      })
      .then((text) => setMarkdown(text))
      .catch(() => setMarkdown("# Not found"));
  }, [pathname]);

  return <Markdown>{markdown}</Markdown>;
}