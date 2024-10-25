import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPostIds, getPostData, PostData } from '../../lib/posts'
import { remark } from 'remark'
import html from 'remark-html'

interface PostProps {
    postData: PostData
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = getPostData(params?.id as string)
    const processedContent = await remark().use(html).process(postData.content || '')
    const contentHtml = processedContent.toString()

    return {
        props: {
            postData: {
                ...postData,
                contentHtml,
            },
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false,
    }
}

export default function Post({ postData }: PostProps) {
    return (
        <article>
            <h1>{postData.title}</h1>
            <div>{postData.date}</div>
            {postData.contentHtml && <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />}
        </article>
    )
}
