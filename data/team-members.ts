// Define types for team member data
export type Social = {
  platform: string;
  url: string;
};

export type TeamMember = {
  name: string;
  firstName: string;
  title: string;
  role: string;
  quote?: string;
  bio: string;
  fullBio: string;
  image: string;
  socials: Social[];
};

// Define role categories for filtering
export type RoleCategory = {
  id: string;
  label: string;
};

export const roleCategories: RoleCategory[] = [
  { id: "all", label: "All Team" },
  { id: "leadership", label: "Leadership" },
  { id: "communications", label: "Communications" },
  { id: "funding", label: "Funding" },
  { id: "speakers", label: "Speakers" },
  { id: "operations", label: "Operations" },
];

// Centralized team data with updated positions based on the provided information
export const teamMembers: TeamMember[] = [
    {
    name: "Keith Collea",
    firstName: "Keith",
    title: "Lead Curator & Vision Director",
    role: "leadership",
    quote: "since childhood Keith has wanted to save the butterflies",
    bio: "Keith brings extensive experience in production and storytelling to TEDxBeixinqiao, having produced hundreds of live shows and numerous film and television productions.",
    fullBio:
      "Over the years, Keith has produced hundreds of live shows for theater, numerous television productions, and several films, some of which he also wrote. One of his notable films was released by Lionsgate and featured an Academy Award-winning actor in a leading role. As a producer, Keith has designed, budgeted, supervised, and delivered films that have generated millions in revenue. He has imparted his knowledge by teaching production at UCLA and Shanghai University. Prior to his work in China, Keith contributed to over 20 Hollywood blockbusters, assisting some of Hollywood's greatest directors. His involvement in China's emerging film industry began over 14 years ago, working on several major box office successes. While in China, Keith fell in love with the culture, the people, and the food, humorously noting, \"I know that sounds funny, but it's true; I love it here.\"",
    image: "/team/keith.jpg",
    socials: [
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/keith-collea-9a70984/",
      },
      { platform: "website", url: "https://keithc-portfolio.vercel.app" },
    ],
  },
    {
    name: "Sebastian Sunday",
    firstName: "Sebastian",
    title: "Head of Speaker Development",
    role: "leadership",
    bio: "Sebastian is a German philosopher, who was educated in Oxford and is living in Beijing, where he has worked at Peking University since autumn 2019.",
    fullBio:
      "Sebastian is a German philosopher, who was educated in Oxford and is living in Beijing, where he has worked at Peking University since autumn 2019. He is a Fellow of the Institute of Foreign Philosophy at Peking University and a former Berggruen China Fellow. He works broadly in philosophy, on both practical and theoretical issues.",
    image: "/team/sebastian.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/in/xiaosai/" },
      { platform: "website", url: " https://www.yhposolihp.com/" },
    ],
  },
    {
    name: "Frank Liang",
    firstName: "Frank",
    title: "Speaker Manager",
    role: "speakers",
    bio: "Frank orchestrates all aspects of speaker logistics, ensuring presenters have everything they need to deliver powerful talks through meticulous coordination and personalized support.",
    fullBio:
      "Frank orchestrates all aspects of speaker logistics, ensuring presenters have everything they need to deliver powerful talks at TEDxBeixinqiao. His organizational skills and attention to detail create a supportive environment where speakers can focus entirely on their presentations. Frank manages the complex coordination of schedules, technical requirements, and speaker preparation, maintaining clear communication throughout the process. He works closely with the Speaker Development team to ensure a seamless journey for all presenters, from initial selection through post-event follow-up. His dedication to supporting speakers creates the foundation for memorable, impactful TEDx talks.",
    image: "/team/frank2.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
    ],
  },
  {
    name: "Max",
    firstName: "Max",
    title: "Production Manager",
    role: "operations",
    quote: "If it looks effortless on stage, that means we did our job.",
    bio: "Max ensures every technical aspect of the TEDxBeixinqiao event runs smoothly — from lights and sound to stage transitions — crafting an unforgettable experience.",
    fullBio:
      "Max is a seasoned event producer with a background in live theater and television production. Originally from Australia and now based in Beijing, she has worked on everything from underground art shows to large-scale festivals. With over a decade of experience coordinating lighting, audio, and stage design, Max brings both creative vision and logistical precision to TEDxBeixinqiao. Her passion lies in turning ambitious concepts into reality, and making sure every cue hits right on time.",
    image: "/team/max.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/in/maxkeith" },
      { platform: "website", url: "https://maxkeithstudio.com" },
    ],
  },
    {
    name: "Abenezer Workija",
    firstName: "Ben",
    title: "Digital Experience & Technical",
    role: "communications",
    bio: "Ben leads TEDxBeixinqiao's digital presence and technical execution, ensuring seamless online experiences and innovative implementation of technology throughout our events.",
    fullBio:
      "Ben leads TEDxBeixinqiao's digital presence and technical execution, bringing creativity and strategic thinking to our online platforms and event technology. With extensive experience in web development, UX design, and digital strategy, he ensures that our online presence reflects our commitment to innovation and accessibility. Ben's technical expertise enables the seamless integration of digital elements into our physical events, creating immersive experiences that extend beyond the venue. His approach combines creative vision with practical implementation, resulting in digital touchpoints that enhance audience engagement and amplify our speakers' ideas across multiple platforms.",
    image: "/team/ben.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "website", url: "https://example.com/" },
    ],
  },
    {
    name: "Ahmed Samir",
    firstName: "Ahmed",
    title: "Digital Experience & Technical",
    role: "communications",
      bio: "Ahmed is a full‑stack developer supporting TEDxBeixinqiao’s digital experience — building fast, accessible features and tooling alongside the technical lead.",
      fullBio:
        "Ahmed is a full‑stack developer focused on delivering a reliable, accessible, and high‑performance digital experience for TEDxBeixinqiao. He collaborates closely with the technical lead to design, build, and maintain our web platform, working across the stack with Next.js, TypeScript, and modern tooling. Ahmed cares deeply about performance, accessibility, and developer experience — optimizing UI flows, hardening APIs, and improving release reliability with testing and CI/CD. He also contributes to data and content workflows (e.g., Drizzle ORM and deployment pipelines), automation, and observability to ensure the site runs smoothly before, during, and after events.",
    image: "/team/ahmed.png",
    socials: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/ahmed-khamis101" },
      { platform: "website", url: "https://www.ahmedstack.dev/" },
    ],
  },
  {
    name: "Kimo",
    firstName: "Ahmed",
    title: "Digital Experience & Technical",
    role: "Operations",
      bio: "An international student that has been living in China for 10 years. Before coming to China I lived in Egypt, Syria, UAE and Yemen. I look forward to traveling more to meet people from different walks of life.",
      fullBio:
        "An international student that has been living in China for 10 years. Before coming to China I lived in Egypt, Syria, UAE and Yemen. I look forward to traveling more to meet people from different walks of life.",
    image: "/team/kimo.jpg",
    socials: [
      { platform: "website", url: "https://www.ted.com/profiles/50660020" }
    ],
  },
  {
    name: "Adam Kerby",
    firstName: "Adam",
    title: "Audio Visual Lead",
    role: "Editor",
    bio: "As Lead of Business & Brand Development, Yossy brings strategic vision and creativity to TEDxBeixinqiao. She expertly navigates partnerships and brand growth opportunities.",
    fullBio:
      "As Lead of Business & Brand Development, Yossy brings strategic vision and creativity to TEDxBeixinqiao. With her extensive background in brand strategy and business development, she expertly navigates partnerships and growth opportunities that align with TEDx values. Yossy's passion for connecting innovative ideas with the right audiences helps establish TEDxBeixinqiao as a premier platform for thought leadership in Beijing. Her collaborative approach to brand building ensures that each event reflects both global TEDx standards and local cultural significance.",
    image: "/team/adam.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
    ],
  },
  {
    name: "Wantine",
    firstName: "Wantine",
    title: "Events Talent",
    role: "Events Talent",
    bio: "Elena leads TEDxBeixinqiao's communications strategy, crafting compelling narratives that represent our vision and connect with diverse audiences across multiple platforms.",
    fullBio:
      "Elena leads TEDxBeixinqiao's communications strategy, crafting compelling narratives that represent our vision and connect with diverse audiences. Her expertise in strategic communications ensures that TEDx ideas reach beyond the event itself, creating lasting impact through thoughtful messaging and storytelling. Elena oversees all external communications, from press relations to social media presence, maintaining a consistent voice that embodies the essence of TEDxBeixinqiao. Her background in journalism and content strategy brings valuable perspective to how we share ideas worth spreading with the world.",
    image: "/team/wantine.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
    ],
  },
  {
    name: "Caroline",
    firstName: "Caroline",
    title: "Sponsorships Lead",
    role: "Investor Relations",
    bio: "Caroline spearheads TEDxBeixinqiao's sponsorship initiatives, cultivating relationships with partners who share our vision and values to ensure sustainable support for our mission.",
    fullBio:
      "As a multilingual writer, educator, and innovator across various fields, I am excited to join the TED community to expand the corporate sponsorship network and increase audience access both locally and internationally. TED offers a unique platform to share compelling, concise stories of personal epiphanies and innovative initiatives. TED talks and TED Ex community events create a transformative experience for speakers and audiences alike, fostering greater understanding, a sense of connection, and a feeling of universality. I am delighted to be part of TED in Beijing and look forward to fostering new connections among investors and the global TED community.",
    image: "/team/caroline.jpeg",
    socials: [
    
    ],
  },
  {
    name: "Michael Serio",
    firstName: "Michael",
    title: "Chinese Language & Cultural Content Specialist",
    role: "communications",
    bio: "Michael ensures that TEDxBeixinqiao's communications resonate authentically with Chinese audiences, providing cultural context and nuanced translations that preserve the essence of each idea.",
    fullBio:
      "Michael ensures that TEDxBeixinqiao's communications resonate authentically with Chinese audiences, providing cultural context and nuanced translations that preserve the essence of each idea. His deep understanding of Chinese language and culture allows him to bridge international concepts with local perspectives, creating content that feels native rather than translated. Michael works across all platforms to maintain consistent messaging that honors both global TEDx standards and Chinese communication styles. His expertise ensures that complex ideas remain accessible and engaging when presented in Chinese, maintaining the impact of each speaker's original message while adapting to cultural nuances.",
    image: "/team/michael.jpg",
    socials: [
    ],
  },
  {
    name: "Ryma",
    firstName: "Ryma",
    title: "Operation Member",
    role: "Operations",
    bio: "Xiaodan coordinates the implementation of sponsorship agreements, ensuring that partner activations are executed flawlessly while maintaining the integrity of the TEDxBeixinqiao experience.",
    fullBio:
      "I’m Rim Cherkti. My work operates on a core principle: any engineer can make an AI that thinks, but it takes a completely different discipline to make one that understands. My journey has been dedicated to mastering that discipline. I began with a bachelor’s in International Business Management to decode the complex systems that run our world. Now, as I pursue my master’s in Computer Science, I am learning to write the code for the systems that will run our future. This isn’t two separate careers; it is a single, focused mission to see the human at the end of every algorithm. I saw the importance of this mission firsthand while helping to stage a TEDx event, where it was undeniable that the most brilliant code or concept is powerless until it connects with a person. My role was to be the guardian of that human connection. That is still my role today. My purpose is to engineer AI with an ethical compass, to build technology that doesn’t just answer our questions, but honors the humanity that inspires them.",
    image: "/team/ryma.jpg",
    socials: [
      {
        platform: "linkedin",
        url: "http://linkedin.com/in/rim-cherkti-4940591aa",
      },
    ],
  },
  {
    name: "Josh",
    firstName: "Josh",
    title: "Communications Support / Video",
    role: "communications",
    bio: "Josh creates compelling visual content that captures the essence of TEDxBeixinqiao, developing videos that extend our reach and impact beyond the live event experience.",
    fullBio:
      "Josh serves as the bridge between the in-person experience and the online audience, capturing the authentic essence of TEDxBeixinqiao through thoughtful, story-driven videography. Whether filming behind-the-scenes moments, interviewing speakers about their journeys, or inviting audience members to reflect on their shift in perspective, Josh brings a journalist’s instinct for emotion and a filmmaker’s eye for narrative. His work ensures that the ideas shared on stage continue to resonate far beyond the venue.",
    image: "/team/josh.jpg",
    socials: [
      {
        platform: "linkedin",
        url: "http://linkedin.com/in/joshua-wang-566759360",
      },
      { platform: "instagram", url: "https://www.instagram.com/josh_waang?igsh=ZWtzNWhjYWU3NTd6&utm_source=qr" },
      { platform: "youtube", url: "https://youtube.com/@josh_waang?si=2_SsZyOveI0MIS12" },
    ],
  },
];

// Helper function to sort team members (leadership first, then alphabetically)
export const getSortedTeam = () =>
  [...teamMembers].sort((a, b) => {
    if (a.role === "leadership" && b.role !== "leadership") {
      return -1;
    }
    if (a.role !== "leadership" && b.role === "leadership") {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });

// Get team members filtered by role
export const getTeamByRole = (role: string) => {
  if (role === "all") {
    return getSortedTeam();
  }
  return teamMembers.filter((member) => member.role === role);
};

// Get a specific team member by name
export const getTeamMemberByName = (name: string) =>
  teamMembers.find((member) => member.name === name);
