import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Markdown from 'markdown-to-jsx';

export default function Blog({ blog }) {
    const router = useRouter();

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
                    pre: {
                        component: 'pre',
                        props: {
                            style: {
                                backgroundColor: '#242f35',
                                borderRadius: '5px',
                                padding: '15px',
                                color: 'rgb(252 152 103)',
                            }
                        }
                    }
                },
            }}
        >
            {blog?.body}
        </Markdown>
    );

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <Head>
                <title>{blog.title}</title>
            </Head>
            <div style={{ border: '1px solid #f41a24', margin: '40px' }}></div>
            <Link href="/">Back to home</Link>

            {isAuthenticated() ? (
                <>
                    <article>
                        <h1 className={utilStyles.headingXl}>{blog?.title}</h1>
                        {blog?.picture && (
                            <Image
                                src={`https://api-managewhistle.com${blog?.picture}`}
                                alt={`Image for ${blog?.title}`}
                                width={1500}
                                height={550}
                                priority={true}
                            />
                        )}
                        <br />
                        {blog?.video && (
                            <video
                                controls
                                width={900}
                                height={500}
                            >
                                <source src={`https://api-managewhistle.com${blog?.video}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        <div>
                            {markdownContent}
                        </div>
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

export async function getStaticPaths() {
    // Fetch blog IDs from the Django API
    const res = await fetch('https://api-managewhistle.com/app/blog/get/');
    const blogs = await res.json();

    const paths = blogs.map((blog) => ({
        params: { id: blog.id.toString() },
    }));

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    // Fetch a specific blog by ID from the Django API
    const res = await fetch(`https://api-managewhistle.com/app/blog/get/${params.id}`);
    const blog = await res.json();

    return {
        props: {
            blog,
        },
        revalidate: 60, // Revalidate this page every 60 seconds
    };
}
