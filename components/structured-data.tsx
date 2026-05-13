const siteUrl = 'https://www.ivystephensonvoiceover.com'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ivy Stephenson',
  jobTitle: 'Professional Female Voiceover Artist',
  url: siteUrl,
  image: `${siteUrl}/images/ivy-stephenson-female-voiceover-artist-nashville.jpg`,
  email: 'inquire@ivystephensonvoiceover.com',
  sameAs: ['https://www.youtube.com/@ivystephensonvoiceover'],
  knowsAbout: [
    'Commercial Voiceover',
    'Animation Voice Acting',
    'Video Game Voice Acting',
    'Audiobook Narration',
    'Corporate Narration',
    'E-Learning Voiceover',
  ],
  workLocation: [
    {
      '@type': 'Place',
      name: 'Nashville Voiceover Studio',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nashville',
        addressRegion: 'TN',
        addressCountry: 'US',
      },
    },
    {
      '@type': 'Place',
      name: 'Orlando Voiceover Studio',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Orlando',
        addressRegion: 'FL',
        addressCountry: 'US',
      },
    },
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Ivy Stephenson Voiceover',
  url: siteUrl,
  description:
    'Professional female voiceover artist based in Nashville, TN and Orlando, FL. Commercial, animation, video game, and audiobook voice acting demos.',
  inLanguage: 'en-US',
  publisher: {
    '@type': 'Person',
    name: 'Ivy Stephenson',
  },
}

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Ivy Stephenson Voiceover',
  url: siteUrl,
  image: `${siteUrl}/images/ivy-stephenson-female-voiceover-artist-nashville.jpg`,
  description:
    'Broadcast-ready female voiceover for commercials, animation, video games, audiobooks, corporate narration, and e-learning.',
  areaServed: ['Nashville, TN', 'Orlando, FL', 'United States', 'Worldwide'],
  serviceType: [
    'Commercial Voiceover',
    'Animation Voice Acting',
    'Video Game Voice Acting',
    'Audiobook Narration',
    'Corporate Narration',
    'E-Learning Voiceover',
  ],
  email: 'inquire@ivystephensonvoiceover.com',
}

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  )
}
