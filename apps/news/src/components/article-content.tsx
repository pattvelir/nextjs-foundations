import { ContentBlock } from "@repo/models/content-block";
import Image from "next/image";
import { getSubscriptionStatus } from "@/app/actions";
import { SubscriptionToggle } from "./ui/subscription-toggle";

export async function ArticleContent({
  content,
}: {
  content: ContentBlock[] | null;
}) {
  const subscriptionStatus = await getSubscriptionStatus();
  // Check subscription status.
  if (subscriptionStatus?.status !== "active") {
    const paywallBlock: ContentBlock = {
      type: "paywall",
      text: "Subscribe to continue reading this article.",
      cta: "Subscribe Now",
    };

    if (content && content.length > 0) {
      // If the user isn't subscribed, we'll only return the first content block of the body.
      content = [content[0]];
      content.push(paywallBlock);
    } else {
      // If for some reason we don't have any article data, simply return the paywall block.
      content = [paywallBlock];
    }
  }

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
                  className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8"
                >
                  <p className="text-foreground mb-4">{block.text}</p>
                  <SubscriptionToggle
                    status={subscriptionStatus}
                    cta={block.cta}
                  />
                </div>
              );
            }
          })}
        </>
      )}
    </>
  );
}
