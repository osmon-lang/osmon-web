import { InferGetStaticPropsType } from 'next'

// Layout
import PageLayout from 'components/layout/page'
import { getHashtagTweets, TwitterRes } from 'lib/twitter'

// Sections
import Hero from 'components/sections/hero'
import AboutSection from 'components/sections/about'
import CharactersSection from 'components/sections/characters'
import DataColumns from 'components/sections/data-columns'

const HomePage = ({
  tweets
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout>
      <Hero />
      <AboutSection />
      <CharactersSection />
      <DataColumns tweets={tweets} releases={releases} />
    </PageLayout>
  )
}

const releases = [
  {
    version: '0.1',
    date: new Date(2022, 3, 17),
    text: 'Birinchi alfa nashr chiqarildi.'
  },
  {
    version: '0.2',
    date: new Date(2022, 4, 2),
    text: 'Birinchi beta nashr va cargo reliz.'
  }
]

export const getStaticProps = async () => {
  let tweets: TwitterRes | null
  try {
    tweets = await getHashtagTweets()
  } catch (error) {
    // @ts-ignore
    console.warn(error.message)
    tweets = null
  }

  return {
    props: {
      tweets
    },
    revalidate: 1
  }
}

export default HomePage
