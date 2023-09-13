import React, { useEffect, useState } from 'react'
import { getAllPostsData } from '../lib/posts';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';
import { useAuth } from '../contexts/AuthContext';
import Router from 'next/router';
import Linkify from 'react-linkify';
import { FiExternalLink } from 'react-icons/fi';

export async function getStaticProps() {
  const allPostsData = await getAllPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export async function getDomains() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/get-domains/');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json(); // Parse the response as JSON
    return data; // Return the parsed JSON data
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export default function Home({ allPostsData }) {
  const { isAuthenticated, setToken } = useAuth();
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    getDomains()
      .then((data) => setDomains(data))
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    setToken('');
    Router.push('/login'); // Redirect to the login page
  }

  return (
    <Layout>
      <Head>
        <title>Whistle coding Documentation</title>
      </Head>
      {isAuthenticated() ? (
        <>
          <button className='auth-button' onClick={handleLogout}>Logout</button>
          <br />
          <section>
            <h1>Domains</h1>
            <ul>
              {domains.map((domain) => (
                <li key={domain.domain_url}>
                  <Linkify
                    componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a href={decoratedHref} target="_blank" rel="noopener noreferrer" key={key}>
                        {decoratedText}
                        <FiExternalLink />
                      </a>
                    )}
                  >
                    {domain.domain_url}
                  </Linkify>
                </li>
              ))}
            </ul>

          </section>

          <section>
            <h2>Documentation</h2>
            <ul>
              {allPostsData.map(({ id, date, title }) => {
                // Extract only the date part from the ISO format date string
                const trimmedDate = date.substring(0, 10);

                return (
                  <li key={id}>
                    <Link href={`/posts/${id}`}>{title}</Link>
                    <br />
                    <p>{trimmedDate}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        </>
      ) : (
        <div>
          <span>You need to log in to access this page.</span>
          <Link href="/login">
            <button className='auth-button'>Login</button>
          </Link>
        </div>
      )}
    </Layout>
  );
}
