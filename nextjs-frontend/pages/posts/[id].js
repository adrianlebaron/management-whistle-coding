import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Markdown from 'markdown-to-jsx';

export default function Blog({ blog }) {
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
    console.log('BLOGGG', blog)

    return (
        <div className='blog'>
            <Head>
                <title>{blog.title}</title>
            </Head>
            {/* <div style={{ border: '1px solid #f41a24', margin: '40px' }}></div> */}
            {isAuthenticated() ? (
                <>
                    <article>
                        {blog?.picture && (
                            <div className='picture'>
                                <img src={`http://localhost:8000${blog?.picture}`} />
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
    const res = await fetch(`http://127.0.0.1:8000/app/blog/get/${params.id}`);
    const blog = await res.json();

    return {
        props: {
            blog,
        },
    };
}
