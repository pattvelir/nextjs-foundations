import { z } from "zod";

//
const ParagraphBlock = z.object({
  type: z.literal("paragraph"),
  text: z.string(),
});

const HeadingBlock = z.object({
  type: z.literal("heading"),
  level: z.union([z.literal(2), z.literal(3)]),
  text: z.string(),
});

const BlockQuoteBlock = z.object({
  type: z.literal("blockquote"),
  text: z.string(),
});

const UnorderedListBlock = z.object({
  type: z.literal("unordered-list"),
  items: z.array(z.string()),
});

const OrderedListBlock = z.object({
  type: z.literal("ordered-list"),
  items: z.array(z.string()),
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
