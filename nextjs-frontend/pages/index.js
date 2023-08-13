import { Inter } from 'next/font/google'
import Blogs from '.././lib/blogs'
import axios from "axios"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';
import { useAuth } from '../contexts/AuthContext';
import Router from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  let [blogs, setBlogs] = useState([])
  const { isAuthenticated, setToken } = useAuth();

  const handleLogout = () => {
    setToken('');
    Router.push('/login'); // Redirect to the login page
  }

  useEffect(() => {
    async function getBlogs() {
      let result = await axios.get("http://127.0.0.1:8000/app/blog/get/")
      setBlogs(result.data)
      return result.data
      // aqui result tiene todo el objeto de la promesa, y data tiene el objeto que necesito y 
      // puedo usarlo fuera de la scope de getBlogs(){}
    }

    getBlogs().then((blogs) => {
      console.log("estos son los blogs", blogs)
    })
  }, [])

  return (
    <Layout>
      <Head>
        <title>Whistle coding Management</title>
      </Head>
      {isAuthenticated() ? (
        <>
          <button className='auth-button' onClick={handleLogout}>Logout</button> {/* Logout button */}
          {blogs.map(({ id, body }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>{body}</Link>
              <br />
              <small>
                {/* <Date dateString={date} /> */}
              </small>
            </li>
          ))}
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
