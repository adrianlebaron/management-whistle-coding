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

  return (
    <Layout>
      <Head>
        <title>Whistle coding Documentation</title>
      </Head>
      {isAuthenticated() ? (
        <>
          <button className="auth-button" onClick={handleLogout}>
            Logout
          </button>
          <br />
          <section>
            <h1>Domains</h1>
            <ul>
              {domains.map((domain) => (
                <li key={domain.domain_url}>
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
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Documentation</h2>
            <ul>
              {blogs.map((blog) => (
                <li key={blog.id}>
                  <Link href={`/posts/${blog.id}`}>
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
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

export async function getStaticProps() {
  // Fetch blogs from the Django API
  const res = await fetch('https://api-managewhistle.com/app/blog/get/');
  const blogs = await res.json();

  return {
    props: {
      blogs,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}