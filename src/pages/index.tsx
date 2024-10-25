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
    <div className="container">
      <h1 className="title">Blog Posts</h1>
      <table className="blog-table">
        <thead>
          <tr>
            <th className="table-header">Title</th>
            <th className="table-header">Date</th>
          </tr>
        </thead>
        <tbody>
          {allPostsData.map(({ id, date, title }) => (
            <tr key={id}>
              <td className="table-cell">
                <Link className="link" href={`/posts/${id}`}>
                  {title}
                </Link>
              </td>
              <td className="table-cell">{date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
