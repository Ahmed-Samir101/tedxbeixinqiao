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
  bio: string;
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
    bio: `With 20 years in the medical field, Dr. Abraham Ho launched his career as a general surgeon at Peking University People's Hospital. Troubled by watching cancer patients suffer through their final years—believing this reactive approach was inadequate— in the latter decade of his career he shifted his focus to health management and preventive medicine, aiding clients in mitigating cancer and other morbidity risks. His distinguished tenure includes co-founding Temple (serving as Chief Medical Officer), Chief Medical Officer and VP of Laboratory for Advanced Medicine (China), and Deputy GM of Medical Services at iKang Healthcare Group. Currently, as Chief Health Officer of Bycare Health, and focused on longevity science, he leads a team of physicians delivering exclusive full life cycle health management and longevity services to UHNWIs. He also serves as an Industry Mentor at Tsinghua University’s Schwarzman College and is a 2015 TEDxTALK alumni.`,
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
    name: "Caroline Pires Ting",
    title: "Postdoctoral Research Fellow & Visual Artist",
    talkTitle: "Bridges, Not Barriers: The Hidden Power of Untranslatables",
    description: "Untranslatable words as vessels of cultural memory and empathy.",
    talkSummary:
      "Dr. Caroline Pires Ting explores how untranslatable concepts hold emotional truths that resist simplification. These words act as bridges—carrying memory, worldview, and nuance. In a time of division and algorithmic flattening, lingering with what cannot be neatly translated may be a powerful tool for empathy.",
    bio: `Prof. Caroline Pires Ting, Ph.D., is a Sino-Brazilian-American scholar and visual artist. She is a Postdoctoral Research Fellow in Philosophy at the Federal University of Rio de Janeiro and a member of The Dictionary of Untranslatables. She also serves as Director of International Relations at the Logica Universalis Association (LUA) and at Museu.XYZ, Brazil’s first metaverse museum. A Sorbonne graduate, she has been a researcher at the International Institute of Macau, the Royal Portuguese Library, and the Center for Chinese Studies at the National Central Library in Taipei, as well as a visiting professor in Taiwan. Formerly a copyist at the Louvre and Petit-Palais, she trained at the Russian Imperial Academy of Arts and the National Academy of Design. She received First Place in the A-Ma Prize for Literature, awarded by the Macau Foundation, and recently co-authored Towards the Culture of Charm: An Analogical Study with Katarzyna Gan-Krzywoszynska.`,
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/caroline.png",
    duration: "",
    date: "2025",
    category: "Language & Culture",
  },
  {
    name: "Tom Van Dillen",
    title: "Managing Partner, Greenkern",
    talkTitle: "The Magic Loop: How Sci-Fi Helps Us Read the Future Hiding in Plain Sight",
    description: "Using science fiction as a strategic dataset for future insight.",
    talkSummary:
      "Tom Van Dillen shows how science fiction is more than entertainment—it is a powerful lens for decoding emerging signals. Drawing on 25 years advising global brands in China, he explains the 'magic loop' between imagined worlds and real-world breakthroughs, offering a method anyone can use to stress-test choices and stop being surprised by the future.",
    bio: `Tom van Dillen leads Greenkern, a Beijing and Berlin-based consultancy that helps major organisations like Volkswagen and the World Economic Forum integrate technology with innovative thinking through their "Innovation Mindset as a Service" approach. Drawing on over 25 years of experience in China's hyperpragmatic innovation landscape, he provides insights on AI implementation, autonomous vehicles, smart cities, and emerging technologies to corporate clients, think tanks, and academic institutions.`,
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
    bio: `Miss Jialan Yu, founder of Upsnail Public Speaking Academy, a former reporter of Global Times, anchor of weekly show Top Five in China. Winner of China News Award. She had also worked in the leading French Bank Societe Generale for over five years, focusing on Environmental, Social and Governance. ( “ ESG”)
As a mother , Jialan usually spends most of her leisure time with her two kids, a 6 year old girl who plays Baduanjin and violin and 3 year old boy, bicycling and roaming in Beijing and also exploring cultural differences together worldwide.
She holds a MBA degree from Guanghua Managment School of Peking University and a post graduate degree from University of Science and Technology of China. `,
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
    title: "Ai & Parenting",
    talkTitle: "How I Explained Life and Death to My Daughter with Artificial Intelligence",
    description: "A grieving parent uses AI storytelling to explain loss to a child.",
    talkSummary:
      "Film director GianLuigi Perrone faces a family loss and must explain death to his 6-year-old daughter for the first time. His solution: craft a cartoon using progressive AI tools. He shares how creative technology can mediate difficult conversations about life, death, and emotional resilience.",
    bio: `Gianluigi Perrone is a film-maker who's been exploring progressive technologies in audio visual, with the first films of the digital era, first narrative method in virtual reality and first storytelling with artificial intelligence tools.`,
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
      "Most talks about Gen Z come from adults looking in, but this one comes from the inside. I’m a teenager living this reality. I offer a firsthand look at what digital life, loneliness, “world saving” pressures actually feel like, and I highlight something most talks miss: the crisis isn’t just mental health, it’s the loss of teenhood itself. In this talk, I want to show adults what that loss looks like up close, and how you can help us reclaim the spaces, connection, and safety we need to actually grow up. We must protect teenhood now, and I promise: we’ll take it from here.",
    bio: `Madelyn Li is an 11th grader with a passion for public speaking and debate, a journey that began in 6th grade. Over the years, she has parEcipated in various speech and debate events, honing her skills and conﬁdence. This TED Talk marks a signiﬁcant milestone as she steps onto the stage for the ﬁrst Eme, eager to share insights and inspire others. With a commitment to eﬀecEve communicaEon and a love for a good speech, Madelyn Li looks forward to engaging the audience and sparking meaningful conversaEons.`,
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
    name: "Misha Tadd",
    title: "Associate Professor, Nankai University",
    talkTitle: "The Laozi as a Bridge for Transcending Differences",
    description: "Global transmission of Laozi as a tool for shared humanity.",
    talkSummary:
      "Prof. Misha Tadd recounts his journey with the Laozi (Daodejing), unveiling discoveries about its massive translation corpus across 97 languages and radically diverse contexts. He reflects on why the text resonates widely and how it can inspire remembrance of our shared humanity.",
    bio: `Misha Tadd is originally from Amherst, Massachusetts, and is now an Associate Professor in the College of Philosophy at Nankai University. He is also Founder and Director of Nankai University’s Global Laozegetics Research Center. He has produced The Complete Bibliography of Laozi Translations that includes information on 2052 Laozi translations in 97 languages and recently published the oldest Laozi translation, the Liber Sinicus Tao Te Kim inscriptus, in Latinum idioma Versus, that had been hidden away for almost 300 years. In addition to academic work, Prof. Tadd often appears in Chinese media, including his participation in two CCTV programs on the Laozi and one CCTV Chinese New Years special.`,
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/misha.png",
    duration: "",
    date: "2025",
    category: "Philosophy",
  },
  {
    name: "Nathan Midler",
    title: "Executive & Entrepreneur",
    talkTitle: "How to Lead Through Exponential Change",
    description: "Adopting the Navigator Mindset to orient, explore, and discover.",
    talkSummary:
      "Nathan Midler introduces the Navigator Mindset—three core practices: orienting, exploring, and discovering—to reframe how leaders confront accelerating complexity and disruption. He provides practical ways to not just keep pace with exponential change, but actively lead through it.",
    bio: `Nathan Midler is an American executive and entrepreneur who has spent over two decades in China, including leadership roles at IBM and Harvard Business School Publishing. Fluent in Mandarin, he has led initiatives across globalization, learning, innovation, transformation, strategy, and analytics. Today, Nathan helps companies expand internationally, develop new offerings, and lead through change and disruption.  `,
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
    bio: `Dr. Shervin Molayem is a periodontist, researcher, and advisor of several dental technology companies focused on the mouth-body connection. He founded Trust AI, a dental AI platform that integrates medical and dental data to create transparent, evidence-based treatment plans. With over 15 years of clinical experience, Dr. Molayem has led research linking gum disease to systemic inflammation and COVID-19 outcomes, helping shift how healthcare views oral health. His mission is to use technology and data to rebuild trust between patients and providers and bring dentistry back into the broader healthcare conversation.`,
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
    name: "Dr. Youmin Zhong",
    title: "Consultant Cardiologist, Beijing United Family Hospital",
    talkTitle: "Building Bridge Between Medicine and Sports",
    description: "Cardiorespiratory fitness as a shared metric uniting movement and care.",
    talkSummary:
      "Dr. Youmin Zhong reveals how one measurable metric—cardiorespiratory fitness—can unite medicine and sports. Drawing on decades in cardiology and lifelong running, he shows how a simple test transforms vague advice into precise prescriptions, preventing disease and enhancing lasting vitality.",
    bio: `Dr. Youmin Zhong is the Founding Director of Sports Cardiology Program at Beijing United Family Hospital and the author of Cardiologist’s Exercise Prescription for Lifelong Health. With over two decades of experience in cardiology—from interventional procedures to cardiac electrophysiology—he pioneers the field where medicine and movement converge. A lifelong runner of more than forty years, Dr. Zhong brings the science of the heart to life, empowering people to use exercise as medicine. His work inspires individuals to build lasting vitality in their health, their work, and their everyday lives.`,
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
    bio: `Third Grade Student.`,
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
  //   name: "Dr. Erica Urquhart",
  //   title: "Orthopedic Surgeon (MD, PhD, MBA)",
  //   talkTitle: "Halting Health + Care: How the Cost of Care in Western Medicine Is Silencing the Pause that Saves Lives",
  //   description: "Exposing financial and administrative pressures degrading patient care.",
  //   talkSummary:
  //     "Dr. Erica Rowe Urquhart highlights how for-profit structures and administrative burdens in Western medicine erode access, fuel provider burnout, worsen inequities, and compromise outcomes. She calls for reclaiming protected pauses in care delivery to restore clinical judgment and humanity.",
  //   socials: [
  //     { platform: "facebook", url: "https://facebook.com/" },
  //     { platform: "twitter", url: "https://twitter.com/" },
  //     { platform: "linkedin", url: "https://linkedin.com/" },
  //     { platform: "instagram", url: "https://instagram.com/" },
  //   ],
  //   videoId: "",
  //   imageSrc: "/speakers/Urquhart.png",
  //   duration: "",
  //   date: "2025",
  //   category: "Healthcare Systems",
  // },
];

// Current speakers
export const speakers: Speaker[] = currentSpeakers;

// Helper functions
export const getAllSpeakers = () => speakers;

export const getSpeakerByName = (name: string) =>
  speakers.find((speaker) => speaker.name === name);
