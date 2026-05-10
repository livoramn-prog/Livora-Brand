import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Markdown rendering component.
 * Дэмждэг зүйлс:
 *  - # Гарчиг, ## Дэд гарчиг, ### Жижиг гарчиг
 *  - **тод**, *налуу*, ~~зураастай~~
 *  - - bullet list, 1. дугаарласан
 *  - > ишлэл (blockquote)
 *  - [холбоос](https://...)
 *  - `code`, ```code blocks```
 *  - Хүснэгт (GitHub-flavored markdown)
 *  - Шинэ мөр шууд ажиллана (line breaks)
 */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
