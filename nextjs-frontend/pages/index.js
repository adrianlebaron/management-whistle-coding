import React, { useEffect, useState } from 'react'
import { getAllPostsData } from '../lib/posts';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';
import { useAuth } from '../contexts/AuthContext';
import Router from 'next/router';


export async function getStaticProps() {
  const allPostsData = await getAllPostsData();
  // Ya se quito el error de home jaja
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const { isAuthenticated, setToken } = useAuth();

  const handleLogout = () => {
    setToken('');
    Router.push('/login'); // Redirect to the login page
  }

  return (
    <Layout>
      <Head>
        <title>Whistle coding Management</title>
      </Head>
      {isAuthenticated() ? (
        <>
          <button className='auth-button' onClick={handleLogout}>Logout</button> {/* Logout button */}
          <section>
            <h2>Documentation</h2>
            <ul>
              {allPostsData.map(({ id, date, title }) => (
                <li key={id}>
                  <Link href={`/posts/${id}`}>{title}</Link>
                  <br />
                </li>
              ))}
            </ul>
          </section>
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
