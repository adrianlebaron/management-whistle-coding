// pages/index.js
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import { useAuth } from "../contexts/AuthContext";
import Router from "next/router";
import Linkify from "react-linkify";
import { FiExternalLink } from "react-icons/fi";
import { getDrywallDomains } from "@/lib/domains";
import { getFamilyDomains } from "@/lib/domains";
import { getCommunityDomains } from "@/lib/domains";
import { getOtherDomains } from "@/lib/domains";

export default function Home({ blogs }) {
  const { isAuthenticated, setToken } = useAuth();
  const [drywallDomains, setDrywallDomains] = useState([]);
  const [familyDomains, setFamilyDomains] = useState([]);
  const [communityDomains, setCommunityDomains] = useState([]);
  const [otherDomains, setOtherDomains] = useState([]);

  // Function to sort an array of domains alphabetically
  const sortDomainsAlphabetically = (domains) => {
    return domains.slice().sort((a, b) => a.domain_url.localeCompare(b.domain_url));
  };

  useEffect(() => {
    getDrywallDomains()
      .then((data) => setDrywallDomains(sortDomainsAlphabetically(data)))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getFamilyDomains()
      .then((data) => setFamilyDomains(sortDomainsAlphabetically(data)))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getCommunityDomains()
      .then((data) => setCommunityDomains(sortDomainsAlphabetically(data)))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getOtherDomains()
      .then((data) => setOtherDomains(sortDomainsAlphabetically(data)))
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
          <section className="home-page-container">
            <div className="domains-container">
              <section className="domains">
                <div className="home-header">
                  <h2>Domains</h2>
                  <div>
                    <button className="auth-button" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
                <h3>Drywall</h3>
                {drywallDomains.map((domain) => (
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

                <h3>Family</h3>
                {familyDomains.map((domain) => (
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

                <h3>Community</h3>
                {communityDomains.map((domain) => (
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

                <h3>Other</h3>
                {otherDomains.map((domain) => (
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
            </div>

            <div className="blogs-container">
              <section className="blogs">
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
            </div>
          </section>
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
  const res = await fetch('http://127.0.0.1:8000/app/blog/get/');
  const blogs = await res.json();

  return {
    props: {
      blogs,
    },
  };
}
