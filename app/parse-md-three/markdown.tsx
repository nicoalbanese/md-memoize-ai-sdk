import { marked } from "marked";
import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";

// Move this outside component or use useMemo for expensive parsing
function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

const MemoizedMarkdownBlock = memo(({ content }: { content: string }) => {
  return <ReactMarkdown>{content}</ReactMarkdown>;
});

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

export const MemoizedMarkdown = memo(
  ({ content, id }: { content: string; id: string }) => {
    // Use useMemo for expensive parsing operation
    const blocks = useMemo(
      () => parseMarkdownIntoBlocks(content),
      [content]
    );

    return blocks.map((block, index) => (
      <MemoizedMarkdownBlock
        content={block}
        key={`${id}-block_${index}`}
      />
    ));
  }
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";