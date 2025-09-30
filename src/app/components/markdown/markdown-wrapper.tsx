'use client'
import { useState } from "react";
import Markdown from "react-markdown";

export default function MarkdownWrapper() {
    const [markdown, setMarkdown] = useState<string>("")
      const response = fetch('/obsidian-vault/Introduction.md')
      .then((res) => res.text())
      .then((text) => setMarkdown(text))


  console.log(markdown);
    return (
        <Markdown>{markdown}</Markdown>
    );
}