import Layout from '../../components/layout';
import { getAllPostsData } from '../../lib/posts';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import Image from 'next/image';
import Link from 'next/link'; // Add this import
import { useAuth } from '../../contexts/AuthContext';

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
    console.log('POSTDATA', postData)

    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
    const { isAuthenticated } = useAuth();

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            {isAuthenticated() ? (
                <>
                    <article>
                        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                        <Image
                            src={postData.picture}
                            alt={`Image for ${postData.title}`}
                            width={100} // Set the appropriate width
                            height={100} // Set the appropriate height
                        />
                        <p>{postData.body}</p>

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