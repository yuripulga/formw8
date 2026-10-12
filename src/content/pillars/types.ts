export type PillarKind = "individual" | "entity";

export interface PillarContent {
  kind: PillarKind;
  metaTitle: string;
  metaDescription: string;
  ogDescription: string;
  schemaHeadline: string;
  schemaDescription: string;
  badge: string;
  title: string;
  intro: string;
  actionTitle: string;
  actionSubtitle: string;
  actionButton: string;
  fieldsTitle: string;
  fields: { title: string; desc: string }[];
  crossLinkTitle: string;
  crossLinkDesc: string;
  crossLinkButton: string;
  platformsLabel: string;
  /** Platform slugs linked from the page, in display order. */
  platformSlugs: string[];
  backButton: string;
}
