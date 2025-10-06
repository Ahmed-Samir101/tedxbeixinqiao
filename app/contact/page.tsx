import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import ContactInfo from "@/components/contact-info";

export const metadata: Metadata = {
  title: "Contact - TEDxBeixinqiao",
  description: "Get in touch with the TEDxBeixinqiao team.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl text-black md:text-5xl dark:text-white">
          Get in <span className="text-red-600 dark:text-red-500">Touch</span>
        </h1>
        <p className="mx-auto max-w-2xl text-gray-700 text-lg dark:text-gray-300">
          Have questions or want to learn more about TEDxBeixinqiao? Reach out
          to us!
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <ContactInfo />
          {/* Map with Beixinqiao Beijing location */}
          <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-md dark:shadow-gray-800/30">
            <iframe
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.0455506258296!2d116.41365097573254!3d39.94049397151687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35f1bcad2a4dac47%3A0xf48b5af59fda9a4e!2sBeixinqiao%2C%20Dongcheng%2C%20Beijing%2C%20China!5e0!3m2!1sen!2sus!4v1692918471230!5m2!1sen!2sus"
              title="Google Maps showing Beixinqiao, Dongcheng, Beijing, China location"
            />
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
