export interface SiteContent {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  twitterDescription: string;
  appDescription: string;
  howTo: {
    name: string;
    description: string;
    steps: { name: string; text: string }[];
  };
}
