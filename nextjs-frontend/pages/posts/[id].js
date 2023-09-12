import Layout from '../../components/layout';
import { getAllPostsData } from '../../lib/posts';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Linkify from 'react-linkify';
import Markdown from 'markdown-to-jsx';

const API_URL = 'http://127.0.0.1:8000/app/blog/get/';

export async function getStaticPaths() {
    const allPostsData = await getAllPostsData();
    const paths = allPostsData.map(post => ({
        params: {
            id: post.id.toString(),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const response = await fetch(`${API_URL}${params.id}/`);

    if (!response.ok) {
        throw new Error(`Error fetching post data: ${response.statusText}`);
    }

    const postData = await response.json();
    // console.log('POSTDATA', postData)

    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
    const { isAuthenticated } = useAuth();

    // Render Markdown content using markdown-to-jsx
    const markdownContent = (
        <Markdown
            options={{
                overrides: {
                    a: {
                        component: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noopener noreferrer">
                                {children}
                            </a>
                        ),
                    },
                },
            }}
        >
            {postData?.body}
        </Markdown>
    );

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <div style={{ border: '1px solid #f41a24', margin: '40px' }}></div>
            <Link href="/">Back to home</Link>

            {isAuthenticated() ? (
                <>
                    <article>
                        <h1 className={utilStyles.headingXl}>{postData?.title}</h1>
                        {postData?.picture && (
                            <Image
                                src={`http://127.0.0.1:8000${postData?.picture}`}
                                alt={`Image for ${postData?.title}`}
                                width={1000}
                                height={450}
                                priority={true}
                            />
                        )}
                        <br />
                        {postData?.video && (
                            <video
                                controls
                                width={900}
                                height={500}
                            >
                                <source src={`http://127.0.0.1:8000${postData?.video}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        <p>
                            {markdownContent}
                        </p>
                    </article>
                </>
            ) : (
                <div>
                    <p>You need to log in to access this page.</p>
                    <Link href="/login">
                        <button className='auth-button'>Login</button>
                    </Link>
                </div>
            )}

        </Layout>
    );
}