"use client"

import ProjectHeader from "@/components/project-header" // Changed import
import ProjectHero from "@/components/project-hero" // Changed import
import CollapsibleFooter from "@/components/collapsible-footer"

export default function HomePage() {
  return (
    <>
      <ProjectHeader />
      <ProjectHero />
      <CollapsibleFooter />
    </>
  )
}
