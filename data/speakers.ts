// Define types for speaker data
export interface Social {
  platform: string;
  url: string;
}

export interface Speaker {
  name: string;
  title: string;
  talkTitle: string;
  description: string;
  talkSummary: string;
  socials: Social[];
  videoId: string;
  imageSrc: string;
}

// Centralized speakers data
export const speakers: Speaker[] = [
  {
    name: "Cheryl Yang",
    title: "Blockchain Expert",
    talkTitle: "The Future of Data Privacy",
    description: "The Transformative Impact of Blockchain Technology in the Next Decade",
    talkSummary: "In this thought-provoking talk, Cheryl Yang explores how blockchain technology is fundamentally changing our approach to data privacy. She discusses the implications for individuals, businesses, and governments as we move toward a more decentralized digital ecosystem.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" }
    ],
    videoId: "hQjlM-8C4Pg", 
    imageSrc: "/speakers/cheryl.jpg",
  },
  {
    name: "Joseph C. Stewart",
    title: "International School Art Teacher",
    talkTitle: "How to Become Reptile-Skinned",
    description: "Challenges and Opportunities for Parents of Children with Developmental Disorders",
    talkSummary: "Joseph Stewart shares personal insights and professional expertise on developing resilience in the face of challenges. Drawing from his experiences as an educator, he offers practical strategies for fostering emotional strength in ourselves and our children.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" }
    ],
    videoId: "w6JkSzQ5-JY",
    imageSrc: "/speakers/joseph.jpg",
  },
  {
    name: "Merna Al Nasser",
    title: "CGTN Editor/Moderator",
    talkTitle: "We are all Storytellers",
    description: "Transforming Media Narratives For Global Understandings",
    talkSummary: "Merna Al Nasser delves into the power of storytelling as a universal human trait and its critical role in shaping our perception of reality. Drawing from her extensive experience in international media, she demonstrates how thoughtful narrative construction can bridge cultural divides and foster global understanding.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" }
    ],
    videoId: "LCgkBMsSoIo",
    imageSrc: "/speakers/merna.jpg",
  },
  {
    name: "Niamh Cunningham",
    title: "Visual Artist",
    talkTitle: "Rekindling our Bond with Nature",
    description: "Nourishing Growth and Understanding through Tree Stories",
    talkSummary: "In this visually stunning presentation, Niamh Cunningham explores how our disconnection from nature impacts our wellbeing and creativity. Through her artwork and research on trees, she offers a compelling vision for rekindling our relationship with the natural world and finding inspiration in its patterns and processes.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" }
    ],
    videoId: "G-0K5bNYvHs",
    imageSrc: "/speakers/niamh.jpg",
  },
  {
    name: "Saverio Quaia",
    title: "Interior Designer",
    talkTitle: "What the Office of Tomorrow Will Look Like",
    description: "Workplace Transformation and Future Trends in the Post-Epidemic Era",
    talkSummary: "Interior design visionary Saverio Quaia presents his research-backed predictions for workplace evolution in the post-pandemic world. His talk combines insights from psychology, architecture, and organizational behavior to envision spaces that enhance productivity, wellbeing, and connection in our changing work culture.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" }
    ],
    videoId: "5qap5aO4i9A",
    imageSrc: "/speakers/saverio.jpg",
  },
  {
    name: "Stephanie Sam",
    title: "International Communications Specialist",
    talkTitle: "Rethinking the Way We Communicate",
    description: "Rethinking the Way We Communicate in the Age of Globalization",
    talkSummary: "Stephanie Sam challenges conventional communication paradigms in this engaging talk about cross-cultural dialogue. Drawing from her experiences across continents, she proposes innovative frameworks for meaningful exchange in our interconnected world, emphasizing empathy and context as essential elements of effective communication.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" }
    ],
    videoId: "8S0FDjFBj8o",
    imageSrc: "/speakers/stephanie.jpg",
  },
  {
    name: "Xiaoyue Pu",
    title: "Artist",
    talkTitle: "Female Utopia in Ancient China",
    description: "The Combing Woman and the Auntie's House in Feudal China",
    talkSummary: "Xiaoyue Pu unveils forgotten histories of female solidarity and resistance in feudal China. Through meticulous historical research and artistic interpretation, she illuminates how women created spaces of autonomy and support within highly restrictive social systems, offering lessons relevant to contemporary discussions of gender and community.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" }
    ],
    videoId: "vJG698U2Mvo",
    imageSrc: "/speakers/xiaoyue.jpg",
  },
];

// Helper functions
export const getAllSpeakers = () => {
  return speakers;
};

export const getSpeakerByName = (name: string) => {
  return speakers.find(speaker => speaker.name === name);
};