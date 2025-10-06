import type { Metadata } from "next";
import SpeakersPageClient from "./SpeakersPageClient";

export const metadata: Metadata = {
  title: "Speakers - TEDxBeixinqiao",
  description:
    "Meet the innovative minds who shared their ideas at TEDxBeixinqiao.",
};

export default function SpeakersPage() {
  return <SpeakersPageClient />;
}
