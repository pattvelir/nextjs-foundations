import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleSchema, Article } from "@repo/models/article";
import { Taxonomy } from "./taxonomy";
import { DateString } from "./ui/date-string";
import { BreakingNewsEmblem } from "./ui/breaking-news-emblem";
import { ArticleCardSkeleton } from "./skeletons/article-grid-skeleton";
import { ContentBlock } from "@repo/models/content-block";
import Image from "next/image";

export function ArticleContent({
  content,
}: {
  content: ContentBlock[] | null;
}) {
  return (
    <>
      {content?.length && (
        <>
          {content.map((block, index) => {
            if (block.type === "heading") {
              if (block.level === 2) {
                return (
                  <h2
                    key={index}
                    className="font-serif text-2xl font-bold mt-10 mb-4 text-foreground"
                    dangerouslySetInnerHTML={{ __html: block.text }}
                  ></h2>
                );
              } else {
                return (
                  <h3
                    key={index}
                    className="font-serif text-xl font-bold mt-8 mb-3 text-foreground"
                    dangerouslySetInnerHTML={{ __html: block.text }}
                  ></h3>
                );
              }
            }
            if (block.type === "paragraph") {
              return (
                <p
                  key={index}
                  className="text-foreground leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
              );
            }
            if (block.type === "blockquote") {
              return (
                <p
                  key={index}
                  className="text-foreground leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
              );
            }
            if (block.type === "unordered-list" && block.items.length > 0) {
              return (
                <ul key={index} className="my-6">
                  {block.items.map((item, itemIndex) => (
                    <li
                      key={`${index}-${itemIndex}`}
                      className="text-foreground mb-2"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </ul>
              );
            }
            if (block.type === "ordered-list" && block.items.length > 0) {
              return (
                <ol key={index} className="my-6">
                  {block.items.map((item, itemIndex) => (
                    <li
                      key={`${index}-${itemIndex}`}
                      className="text-foreground mb-2"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </ol>
              );
            }
            if (block.type === "image") {
              return (
                <div key={index} className="my-6">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              );
            }
            if (block.type === "paywall") {
              return (
                <div
                  key={index}
                  className="bg-primary/10 border border-primary/20 rounded-lg p-6"
                >
                  <p className="text-foreground mb-4">{block.text}</p>
                  <button className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md transition-colors">
                    {block.cta}
                  </button>
                </div>
              );
            }
          })}
        </>
      )}
    </>
  );
}
