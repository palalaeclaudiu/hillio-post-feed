export interface IPost {
  id: number;
  image: string;
  title: string;
  text: string;
  shortDescription: string;
  author: string;
  likes: string[];
  comments: { id: number; text: string; createdAt: string }[];
}
