import { getSortedPostsData, PostData } from "@/lib/posts";
import { GetStaticProps } from "next";
import Link from "next/link";

interface HomeProps {
  allPostsData: PostData[]
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }: HomeProps) {
  return (
    <section>
      <h1>Blog</h1>
      <ul>
        {allPostsData.map(({ id, title, date }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>
              {title}
            </Link>
            <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </section>
  )
}
