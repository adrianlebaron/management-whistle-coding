import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import Router from "next/router";
import DomainsTable from "../components/DomainsTable";
import { useLayoutEffect } from 'react';
import { authStore } from "../stores/auth_store/Store";
import withAuth from '../hoc/withAuth';

const API_URL = process.env.apiKey;

const Home = ({ blogs }) => {
  const { setToken } = authStore(store => store)

  const handleLogout = () => {
    setToken("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isAuthenticated = authStore((state) => state.token)

  useLayoutEffect(() => {
    const isAuth = isAuthenticated;
    if (!isAuth) {
      Router.push("/login")
    }
  }, [])

  return (
    <Layout>
      <Head>
        <title>Whistle coding Documentation</title>
      </Head>
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
              {/* DOMAINS TABLE */}
              <DomainsTable />
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
    </Layout>
  );
}

export default withAuth(Home);

export async function getServerSideProps() {
  // Fetch blogs from the Django API on the server side
  const res = await fetch(`${API_URL}/app/blog/get/`);
  const blogs = await res.json();

  return {
    props: {
      blogs,
    },
  };
}
