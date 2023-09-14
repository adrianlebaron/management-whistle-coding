import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import { useAuth } from "../contexts/AuthContext";
import Router from "next/router";
import Linkify from "react-linkify";
import { FiExternalLink } from "react-icons/fi";
import { getDomains, getAllPostsData } from "@/lib/posts";

export default function Home() {
  const { isAuthenticated, setToken } = useAuth();
  const [domains, setDomains] = useState([]);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    getDomains()
      .then((data) => setDomains(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getAllPostsData()
      .then((data) => setDocs(data))
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
              {docs.map(({ id, date, title }) => {
                // Extract only the date part from the ISO format date string
                const trimmedDate = date.substring(0, 10);

                return (
                  <li key={id}>
                    <Link href="/posts/[...id]" as={`/posts/${id}`}>
                      {title}
                    </Link>
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
            <button className="auth-button">Login</button>
          </Link>
        </div>
      )}
    </Layout>
  );
}