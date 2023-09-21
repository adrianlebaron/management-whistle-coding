// pages/index.js
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import { useAuth } from "../contexts/AuthContext";
import Router from "next/router";
import Linkify from "react-linkify";
import { FiExternalLink } from "react-icons/fi";
import { getDomains } from "@/lib/domains";

export default function Home({ blogs }) {
  const { isAuthenticated, setToken } = useAuth();
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    getDomains()
      .then((data) => setDomains(data))
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    setToken("");
    Router.push("/login"); // Redirect to the login page
  };

  // Function to format the date to show only the date without extra characters
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust the format as per your requirements
  };

  return (
    <Layout>
      <Head>
        <title>Whistle coding Documentation</title>
      </Head>
      {isAuthenticated() ? (
        <>
          <br />
          <section className="domain-section">
            <div className="home-header">
              <h1>Domains</h1>
              <div>
                <button className="auth-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            {domains.map((domain) => (
              <div key={domain.domain_url}>
                <Linkify
                  componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a
                      href={decoratedHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={key}
                    >
                      {decoratedText}
                      <FiExternalLink />
                    </a>
                  )}
                >
                  {domain.domain_url}
                </Linkify>
              </div>
            ))}
          </section>

          <section>
            <div className="home-header">
              <h2>Documentation</h2>
            </div>
            {blogs.map((blog) => (
              <div key={blog.id} style={{ margin: '0 0 1.25rem' }}>
                <Link href={`/posts/${blog.id}`} style={{ fontSize: '1.3rem' }}>
                  {blog.title}
                </Link><br />
                <span style={{ color: 'grey' }}>{formatDate(blog.date)}</span>
              </div>
            ))}
          </section>
        </>
      ) : (
        <div>
          <span>You need to log in to access this page.</span>
          <Link href="/login">
            <button className="auth-button">Login</button>
          </Link>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  // Fetch blogs from the Django API on the server side
  const res = await fetch('https://api-managewhistle.com/app/blog/get/');
  const blogs = await res.json();

  return {
    props: {
      blogs,
    },
  };
}
