import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Markdown from 'markdown-to-jsx';

export default function Blog({ blog }) {
    const { isAuthenticated } = useAuth();
    const orig = 'https://management-whistle.s3.amazonaws.com'

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
                                padding: '20px',
                                color: 'rgb(252 152 103)',
                                overflow: 'scroll',
                            },
                        },
                    },
                },
            }}
        >
            {blog?.body}
        </Markdown>
    );

    return (
        <div className='blog'>
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
                            <div className='picture'>
                                <img src={orig + blog?.picture} />
                            </div>
                        )}

                        {blog?.video && (
                            <video controls width={900} height={500}>
                                <source src={orig + blog?.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video >
                        )
                        }
                        <div>{markdownContent}</div>
                    </article >
                </>
            ) : (
                <div>
                    <p>You need to log in to access this page.</p>
                    <Link href="/login">
                        <button className='auth-button'>Login</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export async function getServerSideProps({ params }) {
    // Fetch a specific blog by ID from the Django API on the server side
    const res = await fetch(`https://api-managewhistle.com/app/blog/get/${params.id}`);
    const blog = await res.json();

    return {
        props: {
            blog,
        },
    };
}
