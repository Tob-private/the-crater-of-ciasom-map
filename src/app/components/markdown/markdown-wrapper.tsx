'use client'
import { deslugify } from "@/app/lib/utils/helpers";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import styles from './markdown-wrapper.module.css'

export default function MarkdownWrapper() {
  const pathname = usePathname();
  const [markdown, setMarkdown] = useState<string>("");
  const [pageTitle, setPageTitle] = useState<string>("")

  useEffect(() => {
  let mdPath = "index.md";
  if (pathname !== "/") {
    const segments = pathname.replace(/^\//, "").split("/");
    const decodedSegments = segments.map(decodeURIComponent);
    // Deslugify all segments for pretty folder and file names
    const prettySegments = decodedSegments.map(deslugify);
    const fileName = prettySegments[prettySegments.length - 1];
    setPageTitle(fileName)
    mdPath = `${prettySegments.join("/")}/${fileName}.md`;
  }
  console.log(mdPath);
  
  // URL-encode for fetch
  const encodedMdPath = mdPath
    .split("/")
    .map(encodeURIComponent)
    .join("/");

  fetch(`/obsidian-vault/${encodedMdPath}`)
    .then((res) => {
      if (!res.ok) throw new Error("Markdown not found");
      return res.text();
    })
    .then((text) => setMarkdown(text))
    .catch(() => setMarkdown("# Not found"));
}, [pathname]);

  return (
  <>
  <h1 className={styles.capitalize}>{pageTitle}</h1>
  <Markdown>{markdown}</Markdown>
  </>
  )
}