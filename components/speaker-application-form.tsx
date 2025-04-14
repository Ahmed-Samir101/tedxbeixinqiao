"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"

// Form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  website: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(150, { message: "Bio cannot exceed 150 words." }),
  profession: z.string().min(2, { message: "Please enter your profession or expertise." }),
  talkTitle: z.string().min(2, { message: "Please provide a talk title." }),
  coreIdea: z.string().min(10, { message: "Please describe your core idea." }),
  uniqueness: z.string().min(10, { message: "Please explain what makes your idea unique." }),
  takeaway: z.string().min(10, { message: "Please provide the main takeaway for your audience." }),
  hasPriorTalks: z.enum(["yes", "no"]),
  pastTalksLinks: z.string().optional(),
  speakingStyle: z.string().min(2, { message: "Please describe your speaking style." }),
})

type SpeakerApplicationFormValues = z.infer<typeof formSchema>

export function SpeakerApplicationForm() {
  const form = useForm<SpeakerApplicationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      location: "",
      bio: "",
      profession: "",
      talkTitle: "",
      coreIdea: "",
      uniqueness: "",
      takeaway: "",
      hasPriorTalks: "no",
      pastTalksLinks: "",
      speakingStyle: "",
    },
  })

  function onSubmit(values: SpeakerApplicationFormValues) {
    // Handle form submission - this would typically send data to an API
    console.log(values)
    
    // Show success toast
    toast({
      title: "Application Submitted",
      description: "Thank you for your speaker application. We'll review it and get back to you soon.",
    })

    // Here you would normally send this data to your backend
    // For now we just reset the form
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn or Personal Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (City, Country)</FormLabel>
                  <FormControl>
                    <Input placeholder="Beijing, China" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">About You</h3>
            
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Bio <span className="text-red-500">*</span></FormLabel>
                  <FormDescription>Tell us a bit about yourself – max 150 words</FormDescription>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your background and experience" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your profession or area of expertise? <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Your profession or expertise" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Your Talk Idea</h3>
            
            <FormField
              control={form.control}
              name="talkTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposed Talk Title <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Title of your proposed talk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="coreIdea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is the core idea of your talk? <span className="text-red-500">*</span></FormLabel>
                  <FormDescription>Describe it in 1–2 sentences – the "idea worth spreading"</FormDescription>
                  <FormControl>
                    <Textarea 
                      placeholder="The core idea of my talk is..." 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="uniqueness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What makes your idea unique or important right now? <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="My idea is unique because..." 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="takeaway"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is the main takeaway you want the audience to have? <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="After my talk, I want the audience to..." 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Presentation Style</h3>
            
            <FormField
              control={form.control}
              name="hasPriorTalks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Have you given talks before? <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {form.watch("hasPriorTalks") === "yes" && (
              <FormField
                control={form.control}
                name="pastTalksLinks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Links to past talks or presentations</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="https://... (one link per line)" 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="speakingStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How would you describe your speaking style? <span className="text-red-500">*</span></FormLabel>
                  <FormDescription>E.g. storytelling, data-driven, humorous, emotional, etc.</FormDescription>
                  <FormControl>
                    <Input placeholder="Your speaking style" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" className="bg-red-600 hover:bg-red-700">Submit Application</Button>
        </div>
      </form>
    </Form>
  )
}