"use client";

import { motion, useInView } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Play,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Speaker, speakers } from "@/data/speakers";

// Create video data from speakers info - No need for separate mapping now
const videos = speakers;

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<Speaker>(videos[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const containerRef = useRef(null);
  const featuredRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const isFeaturedInView = useInView(featuredRef, { once: true, amount: 0.3 });

  // Effect to ensure activeVideo stays in sync with currentIndex
  useEffect(() => {
    setActiveVideo(videos[currentIndex]);
  }, [currentIndex]);

  // Filter videos based on category
  const _filteredVideos =
    selectedCategory === "all"
      ? videos
      : videos.filter(
          (video) =>
            video.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const nextVideo = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const scaleUpVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.7 } },
  };

  const slideUpVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative w-full overflow-hidden py-24"
      id="video-showcase"
    >
      {/* Decorative elements - keeping these as they're just subtle overlays */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="-left-[10%] absolute top-[20%] h-[400px] w-[400px] rounded-full bg-gradient-to-br from-red-300 to-red-600/40 blur-[120px] dark:from-red-900/30 dark:to-red-700/20" />
        <div className="absolute right-[10%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-gradient-to-tl from-red-400 to-pink-600/30 blur-[100px] dark:from-red-900/20 dark:to-pink-800/10" />
      </div>

      {/* Subtle pattern overlay - adjusted for light/dark mode - REMOVE THIS */}
      {/* <div className="absolute inset-0 bg-[url('/patterns/dot-pattern.png')] opacity-5 dark:opacity-[0.03]"></div> */}

      <motion.div
        animate={isInView ? "visible" : "hidden"}
        className="container relative z-10 mx-auto px-4"
        initial="hidden"
        ref={containerRef}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div className="mb-16 text-center" variants={itemVariants}>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 inline-block rounded-full bg-red-100 px-6 py-1.5 font-medium text-red-600 text-sm dark:bg-red-900/30 dark:text-red-300"
              initial={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Featured Talks
            </motion.div>

            <h2 className="relative mb-6 font-bold text-3xl text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              <span className="relative inline-block">
                Ideas worth
                <span className="relative ml-3 inline-block">
                  <span className="text-red-600 dark:text-red-500">
                    sharing
                  </span>
                  <motion.div
                    animate={{ width: "100%" }}
                    className="-bottom-2 absolute left-0 h-1 bg-gradient-to-r from-red-500 to-red-500/0 dark:from-red-600 dark:to-red-600/0"
                    initial={{ width: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
              </span>
            </h2>

            <p className="mx-auto max-w-3xl text-gray-600 text-lg dark:text-gray-300">
              Explore our collection of inspiring talks from TEDxBeixinqiao
              events that showcase innovative ideas and thought-provoking
              discussions.
            </p>
          </motion.div>

          {/* Featured Video Showcase */}
          <motion.div
            animate={isFeaturedInView ? "visible" : "hidden"}
            className="mb-20"
            initial="hidden"
            ref={featuredRef}
            variants={scaleUpVariants}
          >
            <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-black shadow-2xl">
              {/* <div className="absolute inset-0 bg-[url('/patterns/circuit-pattern.png')] opacity-10 mix-blend-overlay"></div> */}

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Video Area */}
                <div className="relative md:col-span-7 lg:col-span-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="group relative aspect-video w-full cursor-pointer overflow-hidden">
                        <motion.div
                          animate={{ opacity: 1, scale: 1 }}
                          initial={{ opacity: 0, scale: 1.05 }}
                          key={`featured-thumbnail-${activeVideo.videoId}`}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                          <Image
                            alt={activeVideo.talkTitle}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            height={675}
                            priority
                            src={`https://img.youtube.com/vi/${activeVideo.videoId}/maxresdefault.jpg`}
                            width={1200}
                          />
                        </motion.div>

                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-all duration-300 group-hover:bg-black/40">
                          <motion.div
                            className="flex flex-col items-center"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              className="h-20 w-20 rounded-full border-2 border-white/80 bg-red-600/90 text-white shadow-[0_0_30px_rgba(220,38,38,0.5)] backdrop-blur-sm transition-transform duration-300 hover:bg-red-700"
                              size="icon"
                              variant="outline"
                            >
                              <Play className="h-10 w-10" />
                              <motion.div
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.8, 0, 0.8],
                                }}
                                className="-inset-3 absolute rounded-full border-2 border-white/30"
                                initial={{ scale: 1, opacity: 0.8 }}
                                transition={{
                                  repeat: Number.POSITIVE_INFINITY,
                                  duration: 2.5,
                                }}
                              />
                            </Button>
                            <span className="mt-4 font-medium text-lg text-white tracking-wide">
                              Play Video
                            </span>
                          </motion.div>
                        </div>

                        {/* Duration & Category Badge */}
                        <div className="absolute right-4 bottom-4 flex gap-2">
                          <div className="rounded-full bg-black/60 px-3 py-1 font-medium text-sm text-white backdrop-blur-md">
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{activeVideo.duration}</span>
                            </div>
                          </div>
                          <div className="rounded-full bg-red-600/80 px-3 py-1 font-medium text-sm text-white backdrop-blur-md">
                            {activeVideo.category}
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>

                    {/* Video Dialog/Modal - Removed close button */}
                    <DialogContent className="max-w-[90vw] border-none bg-transparent p-0 sm:max-w-[1000px]">
                      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/95">
                        {/* Added DialogTitle for accessibility but removed the close button */}
                        <DialogTitle className="sr-only">
                          {activeVideo.talkTitle}
                        </DialogTitle>

                        <div className="aspect-video w-full">
                          <iframe
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="h-full w-full"
                            frameBorder="0"
                            height="100%"
                            src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                            style={{ aspectRatio: "16/9" }}
                            title={activeVideo.talkTitle}
                            width="100%"
                          />
                        </div>

                        <div className="p-6">
                          <div className="mb-4 flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
                                {activeVideo.talkTitle}
                              </h3>
                              <div className="mt-1 flex items-center gap-1 text-red-600 dark:text-red-400">
                                <span className="font-medium text-sm">
                                  {activeVideo.name}
                                </span>
                                <span className="mx-1.5 h-1 w-1 rounded-full bg-red-600/70 dark:bg-red-400/70" />
                                <span className="text-gray-500 text-sm dark:text-gray-400">
                                  {activeVideo.title}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                className="gap-1 rounded-full"
                                size="sm"
                                variant="outline"
                              >
                                <Share2 className="h-3.5 w-3.5" />
                                <span>Share</span>
                              </Button>
                              <Button
                                className="gap-1 rounded-full"
                                size="sm"
                                variant="outline"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                                <span>YouTube</span>
                              </Button>
                            </div>
                          </div>

                          <div className="mb-4 flex flex-wrap gap-3 text-sm">
                            <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{activeVideo.date}</span>
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{activeVideo.duration}</span>
                            </div>
                            <div className="rounded-full bg-red-100 px-3 py-1 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                              {activeVideo.category}
                            </div>
                          </div>

                          <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                            <p>{activeVideo.talkSummary}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Content Area */}
                <div className="flex flex-col justify-center p-6 md:col-span-5 md:p-10 lg:col-span-4">
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-auto"
                    initial={{ opacity: 0, y: 20 }}
                    key={`featured-content-${activeVideo.videoId}`}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                      <span className="font-medium text-white text-xs uppercase tracking-wider">
                        Featured Talk
                      </span>
                    </div>

                    <h3 className="mb-4 font-bold text-2xl text-white leading-tight md:text-3xl">
                      {activeVideo.talkTitle}
                    </h3>

                    <div className="mb-4 flex items-center">
                      <div className="mr-4 h-10 w-10 overflow-hidden rounded-full border-2 border-red-500">
                        <Image
                          alt={activeVideo.name}
                          className="h-full w-full object-cover"
                          height={40}
                          src={
                            activeVideo.imageSrc || "/speakers/placeholder.jpg"
                          }
                          width={40}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {activeVideo.name}
                        </div>
                        <div className="text-gray-300 text-sm">
                          {activeVideo.title}
                        </div>
                      </div>
                    </div>

                    <p className="mb-6 line-clamp-3 text-gray-300">
                      {activeVideo.talkSummary}
                    </p>
                  </motion.div>

                  {/* Navigation Controls - Fixed pointer events and z-index */}
                  <div className="relative z-20 mt-6 flex items-center justify-between border-white/10 border-t pt-6">
                    <div className="flex gap-2">
                      <Button
                        className="relative z-30 h-10 w-10 rounded-full text-white hover:bg-white/20 disabled:opacity-40"
                        disabled={currentIndex === 0}
                        onClick={() => prevVideo()}
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>

                      <Button
                        className="relative z-30 h-10 w-10 rounded-full text-white hover:bg-white/20 disabled:opacity-40"
                        disabled={currentIndex === videos.length - 1}
                        onClick={() => nextVideo()}
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="text-gray-300 text-sm">
                      <span className="font-medium text-white">
                        {currentIndex + 1}
                      </span>
                      <span className="mx-1">/</span>
                      <span>{videos.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div className="mb-10" variants={itemVariants}>
            <Tabs
              className="w-full"
              defaultValue="all"
              onValueChange={setSelectedCategory}
            >
              <div className="mb-8 flex justify-center">
                <TabsList className="grid auto-cols-auto grid-flow-col gap-1 rounded-full bg-gray-100/80 p-1 backdrop-blur-sm dark:bg-gray-800/80">
                  <TabsTrigger className="rounded-full px-6" value="all">
                    All
                  </TabsTrigger>
                  <TabsTrigger className="rounded-full px-4" value="technology">
                    Technology
                  </TabsTrigger>
                  <TabsTrigger
                    className="rounded-full px-4"
                    value="storytelling"
                  >
                    Storytelling
                  </TabsTrigger>
                  <TabsTrigger className="rounded-full px-4" value="design">
                    Design
                  </TabsTrigger>
                  <TabsTrigger className="rounded-full px-4" value="ideas">
                    Ideas
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent className="mt-0" value="all">
                <VideoGrid videos={videos} />
              </TabsContent>

              <TabsContent className="mt-0" value="technology">
                <VideoGrid
                  videos={videos.filter(
                    (v) => v.category.toLowerCase() === "technology"
                  )}
                />
              </TabsContent>

              <TabsContent className="mt-0" value="storytelling">
                <VideoGrid
                  videos={videos.filter(
                    (v) => v.category.toLowerCase() === "storytelling"
                  )}
                />
              </TabsContent>

              <TabsContent className="mt-0" value="design">
                <VideoGrid
                  videos={videos.filter(
                    (v) => v.category.toLowerCase() === "design"
                  )}
                />
              </TabsContent>

              <TabsContent className="mt-0" value="ideas">
                <VideoGrid
                  videos={videos.filter(
                    (v) => v.category.toLowerCase() === "ideas"
                  )}
                />
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            className="mt-16 flex justify-center"
            variants={slideUpVariants}
          >
            <Button
              className="group relative overflow-hidden bg-red-600 px-8 py-6 font-medium text-lg text-white transition-all duration-300 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
              size="lg"
              variant="default"
            >
              <motion.span
                className="absolute inset-0 bg-red-500/40 dark:bg-red-600/40"
                initial={{ width: "100%", height: "100%", x: "-101%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                whileHover={{ x: "101%" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                View all talks
                <motion.div
                  className="relative z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  whileHover={{ x: 3 }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// Video Grid Component with proper typing
function VideoGrid({ videos }: { videos: Speaker[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video, index) => (
        <VideoCard index={index} key={index} video={video} />
      ))}
    </div>
  );
}

// Video Card Component with proper typing
function VideoCard({ video, index }: { video: Speaker; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });

  return (
    <motion.div
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      ref={cardRef}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Card className="group flex h-full cursor-pointer flex-col overflow-hidden border-none bg-white shadow-md transition-all duration-300 hover:shadow-red-200 hover:shadow-xl dark:bg-gray-800 dark:hover:shadow-red-900/20">
            {/* Video Thumbnail with Hover Effects */}
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                alt={video.talkTitle}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                height={360}
                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                width={640}
              />

              {/* Hover Overlay with Play Button */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="h-14 w-14 rounded-full border-2 border-white bg-red-600/90 text-white shadow-lg hover:bg-red-700"
                      size="icon"
                      variant="outline"
                    >
                      <Play className="ml-1 h-7 w-7" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 rounded-full bg-red-600/90 px-3 py-1 font-medium text-white text-xs backdrop-blur-sm">
                {video.category}
              </div>

              {/* Duration Badge */}
              <div className="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1 font-medium text-white text-xs backdrop-blur-sm">
                {video.duration}
              </div>

              {/* Talk Title Overlay at Bottom */}
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                <h3 className="line-clamp-2 font-semibold text-lg text-white">
                  {video.talkTitle}
                </h3>
              </div>
            </div>

            <CardContent className="p-5">
              {/* Speaker Profile and Name */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-red-500/20 dark:ring-red-500/40">
                    <Image
                      alt={video.name}
                      className="h-full w-full object-cover"
                      height={48}
                      src={video.imageSrc || "/speakers/placeholder.jpg"}
                      width={48}
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-900 dark:text-white">
                    {video.name}
                  </p>
                  <p className="truncate text-gray-500 text-sm dark:text-gray-400">
                    {video.title}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <span className="inline-flex h-6 items-center rounded-full bg-red-50 px-2 font-medium text-red-600 text-xs dark:bg-red-900/20 dark:text-red-400">
                    {video.date.split(" ")[0]}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="max-w-[90vw] border-none bg-transparent p-0 sm:max-w-[900px]">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/95">
            {/* Added DialogTitle for accessibility but removed DialogHeader and close button */}
            <DialogTitle className="sr-only">{video.talkTitle}</DialogTitle>

            <div className="aspect-video w-full">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
                frameBorder="0"
                height="100%"
                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
                style={{ aspectRatio: "16/9" }}
                title={video.talkTitle}
                width="100%"
              />
            </div>

            <div className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
                    {video.talkTitle}
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-red-600 dark:text-red-400">
                    <span className="font-medium text-sm">{video.name}</span>
                    <span className="mx-1.5 h-1 w-1 rounded-full bg-red-600/70 dark:bg-red-400/70" />
                    <span className="text-gray-500 text-sm dark:text-gray-400">
                      {video.title}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="gap-1 rounded-full"
                    size="sm"
                    variant="outline"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </Button>
                  <Button
                    className="gap-1 rounded-full"
                    size="sm"
                    variant="outline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>YouTube</span>
                  </Button>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{video.date}</span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{video.duration}</span>
                </div>
                <div className="rounded-full bg-red-100 px-3 py-1 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                  {video.category}
                </div>
              </div>

              <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                <p>{video.talkSummary}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
