export interface PlatformInfo {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  category: string;
  defaultEntityType: "PF" | "PJ";
  summary: string;
  instructions: {
    title: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}
