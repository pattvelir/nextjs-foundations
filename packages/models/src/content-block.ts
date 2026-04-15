import { z } from "zod";

// Rich text transforms links, bold text etc.
const RichText = z.string().transform((text) => {
  return text
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
});

// For paragraph blocks, we'll transform links to proper markup
const ParagraphBlock = z.object({
  type: z.literal("paragraph"),
  text: RichText,
});

const HeadingBlock = z.object({
  type: z.literal("heading"),
  level: z.union([z.literal(2), z.literal(3)]),
  text: RichText,
});

const BlockQuoteBlock = z.object({
  type: z.literal("blockquote"),
  text: RichText,
});

const UnorderedListBlock = z.object({
  type: z.literal("unordered-list"),
  items: z.array(RichText),
});

const OrderedListBlock = z.object({
  type: z.literal("ordered-list"),
  items: z.array(RichText),
});

const ImageBlock = z.object({
  type: z.literal("image"),
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

// Custom block for handling paywall CTA.
const PaywallBlock = z.object({
  type: z.literal("paywall"),
  text: z.string(),
  cta: z.string(),
});

export const ContentBlockSchema = z.discriminatedUnion("type", [
  ParagraphBlock,
  HeadingBlock,
  BlockQuoteBlock,
  UnorderedListBlock,
  OrderedListBlock,
  ImageBlock,
  PaywallBlock,
]);

export type ContentBlock = z.infer<typeof ContentBlockSchema>;
