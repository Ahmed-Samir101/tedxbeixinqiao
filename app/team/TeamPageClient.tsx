"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Facebook, Twitter, Linkedin, Instagram, Globe, Mail, X, ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { TeamMember, roleCategories, getSortedTeam, getTeamByRole } from "@/data/team-members"

function getSocialIcon(platform: string) {
  switch(platform) {
    case "linkedin": return <Linkedin className="h-4 w-4" />;
    case "twitter": return <Twitter className="h-4 w-4" />;
    case "facebook": return <Facebook className="h-4 w-4" />;
    case "instagram": return <Instagram className="h-4 w-4" />;
    case "website": return <Globe className="h-4 w-4" />;
    case "email": return <Mail className="h-4 w-4" />;
    default: return <Globe className="h-4 w-4" />;
  }
}

export default function TeamPageClient() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [showScrollShadows, setShowScrollShadows] = useState({ left: false, right: true });
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  
  // Filter team members based on active filter
  const filteredTeam = activeFilter === "all" 
    ? getSortedTeam()
    : getTeamByRole(activeFilter);

  // Handle scroll shadows for tab navigation
  const handleScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setShowScrollShadows({
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth - 10
      });
    }
  };

  useEffect(() => {
    const tabsEl = tabsContainerRef.current;
    if (tabsEl) {
      tabsEl.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      
      return () => tabsEl.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll tabs left/right
  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const scrollAmount = 200;
      tabsContainerRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth' 
      });
    }
  };
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 pb-24 pt-24 dark:from-gray-900 dark:to-gray-950">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-red-600/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-red-600/5 blur-3xl"></div>
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-blue-600/5 blur-3xl"></div>
      </div>
      
      {/* Main content */}
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Team header with animated underline */}
        <div className="mb-12 text-center">
          <motion.h1 
            className="mb-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-5xl font-bold leading-tight text-transparent dark:from-white dark:to-gray-300 md:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Meet our <span className="text-red-600 dark:text-red-500">Team</span>
          </motion.h1>
          
          <motion.div
            className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-red-600 to-red-300"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <motion.p 
            className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            The passionate individuals who bring TEDxBeixinqiao to life. Together, we're dedicated to creating a platform where innovative ideas flourish and meaningful connections form.
          </motion.p>
        </div>

        {/* Team member filtering with animated tabs */}
        <motion.div 
          className="relative mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div className="relative">
            {/* Left shadow and scroll button */}
            <AnimatePresence>
              {showScrollShadows.left && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="absolute inset-y-0 left-0 z-10 flex items-center"
                >
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900"></div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative ml-1 rounded-full" 
                    onClick={() => scrollTabs('left')}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          
            {/* Right shadow and scroll button */}
            <AnimatePresence>
              {showScrollShadows.right && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="absolute inset-y-0 right-0 z-10 flex items-center"
                >
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900"></div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative mr-1 rounded-full" 
                    onClick={() => scrollTabs('right')}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          
            {/* Scrollable tabs */}
            <div 
              ref={tabsContainerRef}
              className="flex overflow-x-auto pb-2 scrollbar-hide"
            >
              <Tabs 
                defaultValue="all" 
                value={activeFilter}
                onValueChange={setActiveFilter}
                className="mx-auto"
              >
                <TabsList className="bg-gray-100/80 backdrop-blur dark:bg-gray-800/50">
                  {roleCategories.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="data-[state=active]:bg-red-600 data-[state=active]:text-white dark:data-[state=active]:bg-red-600"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </motion.div>

        {/* Team members grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          layout
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.05
                }}
                layout
                whileHover={{ y: -8 }}
              >
                <Card 
                  className="group h-full overflow-hidden border-none bg-white shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-red-600/10 dark:bg-gray-900 dark:hover:shadow-red-600/20"
                  onClick={() => {
                    setSelectedMember(member);
                    setDialogOpen(true);
                  }}
                >
                  {/* Image with gradient overlay */}
                  <div 
                    className="relative aspect-square w-full overflow-hidden cursor-pointer"
                    onMouseEnter={() => setHoveredMember(member.name)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-700",
                        hoveredMember === member.name ? "scale-110" : "scale-100"
                      )}
                    />
                    
                    {/* Subtle overlay on hover instead of button */}
                    <div className={cn(
                      "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300",
                      hoveredMember === member.name ? "opacity-100" : "opacity-0"
                    )}>
                      <span className="text-sm font-medium text-white px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                        View Details
                      </span>
                    </div>
                  </div>
                  
                  {/* Name, title and role chip */}
                  <div className="p-4 cursor-pointer">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-black dark:text-white">{member.name}</h3>
                      <div className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        member.role === "leadership" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                        member.role === "communications" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                        member.role === "operations" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                        member.role === "speakers" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" :
                        member.role === "creative" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" :
                        member.role === "funding" ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300" :
                        member.role === "technical" ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300" :
                        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      )}>
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{member.title}</p>
                    
                    {/* Social icons without the Read Bio button */}
                    <div className="mt-auto flex items-center justify-end">
                      <div className="flex gap-1.5">
                        {member.socials?.slice(0, 2).map((social, idx) => (
                          <motion.a
                            key={idx}
                            href={social.url}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} // Prevent modal from opening when clicking social links
                          >
                            {getSocialIcon(social.platform)}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Hidden Dialog trigger component */}
                <Dialog open={dialogOpen && selectedMember === member} onOpenChange={(open) => {
                  if (!open) setDialogOpen(false);
                }}>
                  <DialogTrigger className="hidden"></DialogTrigger>
                </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Award-winning team member modal dialog */}
        {selectedMember && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-5xl p-0 overflow-hidden border-none bg-transparent shadow-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="relative flex flex-col overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg dark:bg-gray-900/90 md:flex-row md:min-h-[650px]"
              >
                {/* Left column: cinematic image section with animated gradient */}
                <div className="relative w-full overflow-hidden md:w-2/5 lg:w-1/2">
                  {/* Main image */}
                  <div className="relative h-96 w-full md:h-full">
                    <Image 
                      src={selectedMember.image} 
                      alt={selectedMember.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Animated gradient overlay */}
                    <motion.div 
                      initial={{ backgroundPosition: "0% 0%" }}
                      animate={{ 
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 15,
                        ease: "linear"
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent bg-[length:200%_200%]" 
                    />
                    
                    {/* Role badge with elegant styling */}
                    <div className="absolute top-6 left-6 z-10">
                      <div className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm",
                        selectedMember.role === "leadership" ? "bg-red-500/20 text-red-50 border border-red-500/30" :
                        selectedMember.role === "communications" ? "bg-blue-500/20 text-blue-50 border border-blue-500/30" :
                        selectedMember.role === "operations" ? "bg-amber-500/20 text-amber-50 border border-amber-500/30" :
                        selectedMember.role === "speakers" ? "bg-emerald-500/20 text-emerald-50 border border-emerald-500/30" :
                        selectedMember.role === "creative" ? "bg-purple-500/20 text-purple-50 border border-purple-500/30" :
                        selectedMember.role === "funding" ? "bg-teal-500/20 text-teal-50 border border-teal-500/30" :
                        selectedMember.role === "technical" ? "bg-indigo-500/20 text-indigo-50 border border-indigo-500/30" :
                        "bg-gray-500/20 text-gray-50 border border-gray-500/30"
                      )}>
                        {selectedMember.role.charAt(0).toUpperCase() + selectedMember.role.slice(1)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Elegant name overlay positioned at the bottom of the image */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 p-6 pt-12">
                    <div className="flex flex-col items-start space-y-1">
                      <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-xs text-3xl font-bold tracking-tight text-white md:text-4xl"
                      >
                        {selectedMember.name}
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg font-medium text-white/80"
                      >
                        {selectedMember.title}
                      </motion.p>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <motion.div 
                    className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-red-500/20 blur-3xl" 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 8, 
                      ease: "easeInOut" 
                    }}
                  />
                  <motion.div 
                    className="absolute -bottom-8 left-1/3 h-36 w-36 rounded-full bg-blue-500/20 blur-3xl" 
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 10, 
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>

                {/* Right column: content with premium scrollable area */}
                <div className="relative flex-1 p-6 md:p-8 lg:p-10">
                  {/* Single elegant close button */}
                  <DialogClose className="absolute right-6 top-6 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-50">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </DialogClose>
                  
                  {/* Premium styled content area with custom scrollbar */}
                  <div className="custom-scrollbar max-h-[400px] overflow-y-auto pr-6 md:max-h-[540px]">
                    {/* Quote section with elegant styling */}
                    {selectedMember.quote && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                      >
                        <div className="relative rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 p-6 dark:from-gray-800/50 dark:to-gray-700/30">
                          <svg className="absolute left-4 top-4 h-8 w-8 text-red-300/30 dark:text-red-500/20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0999 8.26001C9.02992 8.95001 8.21992 9.76001 7.66992 10.69C7.15992 11.62 6.89992 12.48 6.89992 13.26C7.00992 13.23 7.13992 13.21 7.28992 13.19C7.43992 13.17 7.59992 13.16 7.75992 13.16C8.63992 13.16 9.34992 13.44 9.88992 14C10.4299 14.56 10.6999 15.25 10.6999 16.06C10.6999 16.9 10.4199 17.61 9.85992 18.19C9.29992 18.75 8.56992 19.03 7.66992 19.03C6.68992 19.03 5.85992 18.65 5.17992 17.89C4.49992 17.13 4.15992 16.05 4.15992 14.64C4.15992 12.68 4.70992 10.94 5.80992 9.42001C6.90992 7.90001 8.42992 6.76001 10.3699 6.00001L10.0999 8.26001ZM19.0699 8.26001C17.9999 8.95001 17.1899 9.76001 16.6399 10.69C16.1299 11.62 15.8699 12.48 15.8699 13.26C15.9799 13.23 16.1099 13.21 16.2599 13.19C16.4099 13.17 16.5699 13.16 16.7299 13.16C17.6099 13.16 18.3199 13.44 18.8599 14C19.3999 14.56 19.6699 15.25 19.6699 16.06C19.6699 16.9 19.3899 17.61 18.8299 18.19C18.2699 18.75 17.5399 19.03 16.6399 19.03C15.6599 19.03 14.8299 18.65 14.1499 17.89C13.4699 17.13 13.1299 16.05 13.1299 14.64C13.1299 12.68 13.6799 10.94 14.7799 9.42001C15.8799 7.90001 17.3999 6.76001 19.3399 6.00001L19.0699 8.26001Z" fill="currentColor"/>
                          </svg>
                          <blockquote className="pl-4 text-lg italic text-gray-700 dark:text-gray-300">
                            {selectedMember.quote}
                          </blockquote>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Bio with premium typography */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mb-8"
                    >
                      <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">About {selectedMember.firstName}</p>
                      <div className="prose prose-lg max-w-none dark:prose-invert">
                        <p className="first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-red-600 dark:first-letter:text-red-500">
                          {selectedMember.fullBio}
                        </p>
                      </div>
                    </motion.div>
                    
                    {/* Social media links with premium styling */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-10 border-t border-gray-200/50 pt-6 dark:border-gray-700/50"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Connect with {selectedMember.firstName}
                        </h3>
                        <div className="flex gap-3">
                          {selectedMember.socials?.map((social, idx) => (
                            <motion.a
                              key={idx}
                              href={social.url}
                              className={cn(
                                "group flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300",
                                social.platform === "linkedin" ? "border-[#0A66C2]/30 text-[#0A66C2] hover:bg-[#0A66C2] hover:border-[#0A66C2] dark:border-[#0A66C2]/50" :
                                social.platform === "twitter" ? "border-[#1DA1F2]/30 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:border-[#1DA1F2] dark:border-[#1DA1F2]/50" :
                                social.platform === "instagram" ? "border-[#E4405F]/30 text-[#E4405F] hover:bg-[#E4405F] hover:border-[#E4405F] dark:border-[#E4405F]/50" :
                                social.platform === "facebook" ? "border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2] hover:border-[#1877F2] dark:border-[#1877F2]/50" :
                                social.platform === "website" ? "border-gray-400/30 text-gray-500 hover:bg-gray-500 hover:border-gray-500 dark:border-gray-400/50" :
                                "border-gray-400/30 text-gray-500 hover:bg-gray-500 hover:border-gray-500 dark:border-gray-400/50"
                              )}
                              whileHover={{ y: -4, scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {getSocialIcon(social.platform)}
                              <span className="absolute -bottom-7 opacity-0 text-xs font-medium transition-all group-hover:opacity-100 group-hover:-bottom-9">
                                {social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}