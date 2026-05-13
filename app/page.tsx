import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"

import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
