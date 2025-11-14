// Define types for speaker data
export type Social = {
  platform: string;
  url: string;
};

export type Speaker = {
  name: string;
  title: string;
  talkTitle: string;
  description: string;
  talkSummary: string;
  socials: Social[];
  videoId: string;
  imageSrc: string;
  duration: string;
  date: string;
  category: string;
};

// Import previous speakers
export { previousSpeakers } from "./previous_speakers";

export const currentSpeakers: Speaker[] = [
  {
    name: "Dr. Abraham KC Ho",
    title: "Chief Health Officer, Bycare Health",
    talkTitle: "Breakthroughs in Longevity Science — How to Enhance Healthspan Past 100 and Beyond",
    description: "Extending healthspan with emerging longevity science and practical prevention.",
    talkSummary:
      "With 20 years in medicine, Dr. Abraham Ho shifted from surgery to preventive health and longevity. He demystifies the latest breakthroughs in medical, biotech, and AI innovation that are making it possible to slow aging and enhance healthspan beyond 100—revealing pragmatic steps individuals can take now to redefine their aging journey.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Abraham.png",
    duration: "",
    date: "2025",
    category: "Health & Longevity",
  },
  {
    name: "Tom Van Dillen",
    title: "Managing Partner, Greenkern",
    talkTitle: "The Magic Loop: How Sci-Fi Helps Us Read the Future Hiding in Plain Sight",
    description: "Using science fiction as a strategic dataset for future insight.",
    talkSummary:
      "Tom Van Dillen shows how science fiction is more than entertainment—it is a powerful lens for decoding emerging signals. Drawing on 25 years advising global brands in China, he explains the 'magic loop' between imagined worlds and real-world breakthroughs, offering a method anyone can use to stress-test choices and stop being surprised by the future.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Dillen.png",
    duration: "",
    date: "2025",
    category: "Innovation & Foresight",
  },
  {
    name: "Jialan Yu",
    title: "CEO, Upsnail Public Speaking Academy",
    talkTitle: "Everyday Ideas",
    description: "Democratizing 'ideas worth spreading' through a practical speaking model.",
    talkSummary:
      "Founder and former journalist Jialan Yu introduces the Recognize–Reflect–Refine model for generating Everyday Ideas and making them work. She empowers audiences with courage and technique to rethink public speaking and redefine personal identity through iterative idea refinement.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Jialan.png",
    duration: "",
    date: "2025",
    category: "Communication",
  },
  {
    name: "GianLuigi Perrone",
    title: "Movie Director",
    talkTitle: "How I Explained Life and Death to My Daughter with Artificial Intelligence",
    description: "A grieving parent uses AI storytelling to explain loss to a child.",
    talkSummary:
      "Film director GianLuigi Perrone faces a family loss and must explain death to his 6-year-old daughter for the first time. His solution: craft a cartoon using progressive AI tools. He shares how creative technology can mediate difficult conversations about life, death, and emotional resilience.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Luigi.jpg",
    duration: "",
    date: "2025",
    category: "Storytelling & AI",
  },
  {
    name: "Madelyn Li",
    title: "11th Grade Student & Debater",
    talkTitle: "Westerners Don't Protect Teenhood",
    description: "Examining tech, media, and the erosion of healthy adolescence.",
    talkSummary:
      "Madelyn Li explores how extreme social media and technology use contribute to a loneliness epidemic and new waves of Gen Z challenges. She analyzes causes, effects, and offers actionable solutions to better protect the developmental space of modern teenagers.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Madelyn.png",
    duration: "",
    date: "2025",
    category: "Youth & Mental Health",
  },
  {
    name: "Nathan Midler",
    title: "Executive & Entrepreneur",
    talkTitle: "How to Lead Through Exponential Change",
    description: "Adopting the Navigator Mindset to orient, explore, and discover.",
    talkSummary:
      "Nathan Midler introduces the Navigator Mindset—three core practices: orienting, exploring, and discovering—to reframe how leaders confront accelerating complexity and disruption. He provides practical ways to not just keep pace with exponential change, but actively lead through it.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/NATHAN.png",
    duration: "",
    date: "2025",
    category: "Leadership & Change",
  },
  {
    name: "Dr. Shervin Molayem",
    title: "Periodontist & Dental AI Researcher",
    talkTitle: "The Forgotten Organ: Building Trust Between the Mouth, the Body, and AI",
    description: "Reuniting oral health with systemic care through data and AI.",
    talkSummary:
      "Dr. Shervin Molayem shares how chronic gum disease drives systemic inflammation linked to heart disease, diabetes, and neurodegeneration. He demonstrates how dental-medical data integration and transparent AI platforms can rebuild patient-provider trust and reposition oral health at the center of preventive medicine.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Sherwin.png",
    duration: "",
    date: "2025",
    category: "Health & AI",
  },
  {
    name: "Dr. Erica Urquhart",
    title: "Orthopedic Surgeon (MD, PhD, MBA)",
    talkTitle: "Halting Health + Care: How the Cost of Care in Western Medicine Is Silencing the Pause that Saves Lives",
    description: "Exposing financial and administrative pressures degrading patient care.",
    talkSummary:
      "Dr. Erica Rowe Urquhart highlights how for-profit structures and administrative burdens in Western medicine erode access, fuel provider burnout, worsen inequities, and compromise outcomes. She calls for reclaiming protected pauses in care delivery to restore clinical judgment and humanity.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Urquhart.png",
    duration: "",
    date: "2025",
    category: "Healthcare Systems",
  },
  {
    name: "Dr. Youmin Zhong",
    title: "Consultant Cardiologist, Beijing United Family Hospital",
    talkTitle: "Building Bridge Between Medicine and Sports",
    description: "Cardiorespiratory fitness as a shared metric uniting movement and care.",
    talkSummary:
      "Dr. Youmin Zhong reveals how one measurable metric—cardiorespiratory fitness—can unite medicine and sports. Drawing on decades in cardiology and lifelong running, he shows how a simple test transforms vague advice into precise prescriptions, preventing disease and enhancing lasting vitality.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Youmin.png",
    duration: "",
    date: "2025",
    category: "Health & Performance",
  },
  {
    name: "Zoie Zhao",
    title: "Age 8, Student",
    talkTitle: "The Power of a Cardboard Tube",
    description: "Protecting blank space in childhood for imagination and joy.",
    talkSummary:
      "Eight-year-old Zoie shares how her favorite 'toy'—a simple cardboard tube—and a story about her hamster taught a lesson about overcrowded schedules. She reminds parents that empty time is not wasted; it is the space where creativity thrives, inviting a rethink of how we nurture play.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Zoie.png",
    duration: "",
    date: "2025",
    category: "Childhood & Creativity",
  },
  // {
  //   name: "Misha Tadd PhD",
  //   title: "Associate Professor, Nankai University",
  //   talkTitle: "The Laozi as a Bridge for Transcending Differences",
  //   description: "Global transmission of Laozi as a tool for shared humanity.",
  //   talkSummary:
  //     "Prof. Misha Tadd recounts his journey with the Laozi (Daodejing), unveiling discoveries about its massive translation corpus across 97 languages and radically diverse contexts. He reflects on why the text resonates widely and how it can inspire remembrance of our shared humanity.",
  //   socials: [
  //     { platform: "facebook", url: "https://facebook.com/" },
  //     { platform: "twitter", url: "https://twitter.com/" },
  //     { platform: "linkedin", url: "https://linkedin.com/" },
  //     { platform: "instagram", url: "https://instagram.com/" },
  //   ],
  //   videoId: "",
  //   imageSrc: "/speakers/MishaTadd.png",
  //   duration: "",
  //   date: "2025",
  //   category: "Philosophy",
  // },
  // {
  //   name: "Caroline Pires Ting PhD",
  //   title: "Postdoctoral Research Fellow & Visual Artist",
  //   talkTitle: "Bridges, Not Barriers: The Hidden Power of Untranslatables",
  //   description: "Untranslatable words as vessels of cultural memory and empathy.",
  //   talkSummary:
  //     "Dr. Caroline Pires Ting explores how untranslatable concepts hold emotional truths that resist simplification. These words act as bridges—carrying memory, worldview, and nuance. In a time of division and algorithmic flattening, lingering with what cannot be neatly translated may be a powerful tool for empathy.",
  //   socials: [
  //     { platform: "facebook", url: "https://facebook.com/" },
  //     { platform: "twitter", url: "https://twitter.com/" },
  //     { platform: "linkedin", url: "https://linkedin.com/" },
  //     { platform: "instagram", url: "https://instagram.com/" },
  //   ],
  //   videoId: "",
  //   imageSrc: "/speakers/CarolinePiresTing.png",
  //   duration: "",
  //   date: "2025",
  //   category: "Language & Culture",
  // },
];

// Current speakers
export const speakers: Speaker[] = currentSpeakers;

// Helper functions
export const getAllSpeakers = () => speakers;

export const getSpeakerByName = (name: string) =>
  speakers.find((speaker) => speaker.name === name);
