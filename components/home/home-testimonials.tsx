"use client"

import { Quote } from 'lucide-react'
import { useState, useEffect } from 'react'

const featuredTestimonial = {
  id: 1,
  metric: "8X",
  description: "Increase in conversion rate",
  quote: "We needed a modern, high-converting website, and the Bravio team delivered beyond expectations. Their design and SEO expertise helped us increase conversion rate by 800% in just two weeks. Highly recommend!",
  name: "David Callahan",
  title: "Marketing Director",
  company: "Spotify",
  avatar: "/avatar-woman.png",
  logo: "🎵",
  bgColor: "bg-white"
}

const topRightTestimonial = {
  id: 2,
  metric: "2X",
  description: "Increase in lead generation",
  quote: "From branding to website design, every detail was meticulously handled. The team's expertise helped us launch faster, and the results have been phenomenal!",
  name: "Sarah Mitchel",
  title: "Marketing Director",
  company: "Google",
  avatar: "/stylized-man-avatar.png",
  logo: "🔍",
  bgColor: "bg-white"
}

const bottomTestimonials = [
  {
    id: 3,
    quote: "Their animation work took our product videos to the next level. The team truly understands user experience and storytelling.",
    name: "Tom Becker",
    title: "Founder",
    company: "PulseCore",
    avatar: "/placeholder-user.jpg",
    bgColor: "bg-white"
  },
  {
    id: 4,
    quote: "The team nailed our MVP design with a fast turnaround and incredible attention to detail. The final product felt polished and professional.",
    name: "Sarah Mitchel",
    title: "Marketing Director",
    company: "Google",
    avatar: "/avatar-woman.png",
    bgColor: "bg-neutral-800 dark:bg-neutral-900"
  },
  {
    id: 5,
    quote: "Outstanding quality and attention to detail. The team exceeded our expectations in every way possible.",
    name: "Michael Chen",
    title: "CEO",
    company: "TechFlow",
    avatar: "/placeholder-user.jpg",
    bgColor: "bg-white"
  },
  {
    id: 6,
    quote: "Professional service from start to finish. The results speak for themselves - our business has grown significantly.",
    name: "Emma Rodriguez",
    title: "Founder",
    company: "StartupXYZ",
    avatar: "/avatar-woman.png",
    bgColor: "bg-neutral-800 dark:bg-neutral-900"
  }
]

export function HomeTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shuffledTestimonials, setShuffledTestimonials] = useState([...bottomTestimonials])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bottomTestimonials.length)
      // Shuffle testimonials every 4 seconds
      setShuffledTestimonials(prev => {
        const shuffled = [...prev]
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const currentTestimonial = shuffledTestimonials[currentIndex]
  const nextTestimonial = shuffledTestimonials[(currentIndex + 1) % shuffledTestimonials.length]

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900/30 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
            Read success stories
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Find out how our happy clients are raving about us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Left side - Large featured testimonial */}
          <div className="lg:col-span-1">
            <div className={`${featuredTestimonial.bgColor} rounded-xl p-6 h-full`}>
              <div className="mb-4">
                <div className="text-4xl font-bold text-neutral-800 dark:text-neutral-200">
                  {featuredTestimonial.metric}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {featuredTestimonial.description}
                </div>
              </div>

              <div className="mb-4">
                <Quote className="h-8 w-8 text-red-500 mb-3" />
                <blockquote className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {featuredTestimonial.quote}
                </blockquote>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={featuredTestimonial.avatar}
                  alt={featuredTestimonial.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {featuredTestimonial.name}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    {featuredTestimonial.title}, {featuredTestimonial.company}
                  </div>
                </div>
                <div className="text-2xl">
                  {featuredTestimonial.logo}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - 4 smaller cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {/* Top left testimonial */}
            <div className={`${topRightTestimonial.bgColor} rounded-xl p-4`}>
              <div className="mb-3">
                <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                  {topRightTestimonial.metric}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  {topRightTestimonial.description}
                </div>
              </div>

              <div className="mb-3">
                <Quote className="h-6 w-6 text-red-500 mb-2" />
                <blockquote className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {topRightTestimonial.quote}
                </blockquote>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src={topRightTestimonial.avatar}
                  alt={topRightTestimonial.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-xs text-neutral-800 dark:text-neutral-200">
                    {topRightTestimonial.name}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    {topRightTestimonial.title}, {topRightTestimonial.company}
                  </div>
                </div>
                <div className="text-lg">
                  {topRightTestimonial.logo}
                </div>
              </div>
            </div>

            {/* Top right testimonial */}
            <div className={`${shuffledTestimonials[2]?.bgColor || 'bg-white'} rounded-xl p-4`}>
              <div className="mb-3">
                <Quote className="h-6 w-6 text-red-500 mb-2" />
                <blockquote className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {shuffledTestimonials[2]?.quote || "Loading..."}
                </blockquote>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src={shuffledTestimonials[2]?.avatar || "/placeholder-user.jpg"}
                  alt={shuffledTestimonials[2]?.name || "Client"}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-xs text-neutral-800 dark:text-neutral-200">
                    {shuffledTestimonials[2]?.name || "Client"}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    {shuffledTestimonials[2]?.title || "Title"}, {shuffledTestimonials[2]?.company || "Company"}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom left - Swiping testimonial (swipe up animation) */}
            <div className="relative overflow-hidden rounded-xl">
              <div 
                className={`${currentTestimonial.bgColor} rounded-xl p-4 transition-all duration-700 ease-in-out transform`}
                style={{
                  transform: `translateY(${currentIndex % 2 === 0 ? '0' : '-100%'})`,
                  opacity: currentIndex % 2 === 0 ? 1 : 0
                }}
              >
                <div className="mb-3">
                  <Quote className="h-6 w-6 text-red-500 mb-2" />
                  <blockquote className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {currentTestimonial.quote}
                  </blockquote>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-xs text-neutral-800 dark:text-neutral-200">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      {currentTestimonial.title}, {currentTestimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom right - Swiping testimonial (swipe left animation) */}
            <div className="relative overflow-hidden rounded-xl">
              <div 
                className={`${nextTestimonial.bgColor} rounded-xl p-4 transition-all duration-700 ease-in-out transform`}
                style={{
                  transform: `translateX(${currentIndex % 2 === 0 ? '0' : '-100%'})`,
                  opacity: currentIndex % 2 === 0 ? 1 : 0
                }}
              >
                <div className="mb-3">
                  <Quote className="h-6 w-6 text-red-500 mb-2" />
                  <blockquote className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {nextTestimonial.quote}
                  </blockquote>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={nextTestimonial.avatar}
                    alt={nextTestimonial.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-xs text-neutral-800 dark:text-neutral-200">
                      {nextTestimonial.name}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      {nextTestimonial.title}, {nextTestimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
