import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Markdown from 'markdown-to-jsx';

export default function Blog({ blog }) {
    const { isAuthenticated } = useAuth();
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
                                backgroundColor: '#2d2a2e',
                                color: '#ab9df2',
                                borderRadius: '5px',
                                padding: '20px',
                                overflow: 'scroll',
                                maxHeight: '500px',
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
            {isAuthenticated() ? (
                <>
                    <article>
                        {blog?.picture && (
                            <div className='picture'>
                                <img src={blog?.picture}/>
                            </div>
                        )}
                        <h1 className={utilStyles.headingXl}>{blog?.title}</h1>
                        <div>{markdownContent}</div>
                    </article >
                </>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>You need to log in to access this page.</p>
                    <Link href="/login">
                        <button className='auth-button'>Login</button>
                    </Link>
                </div>
            )}
            <Link href="/">← Back to home</Link>
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
