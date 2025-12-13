export interface BlogContentModel {
  author: Partial<Author>;
  content: string;
  date: string;
  introText: string;
  img: string;
  imgAlt: string;
  imgCaption: string;
  imgTitle: string;
  imgCredit: string;
  imgCreditLink: string;
  imgCreditLinkTitle: string;
  tags: string[];
  title: string;
}

interface Author {
  name: string;
  title: string;
  bio: string;
  img: string;
}

export const initBlogContent: BlogContentModel = {
  author: {
    name: '',
    title: '',
    bio: '',
    img: ''
  },
  title: '',
  content: '',
  date: '',
  img: '',
  imgAlt: '',
  imgTitle: '',
  imgCaption: '',
  imgCredit: '',
  imgCreditLink: '',
  imgCreditLinkTitle: '',
  introText: '',
  tags: [],
}


