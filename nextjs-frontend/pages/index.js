import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import { useAuth } from "../contexts/AuthContext";
import Router from "next/router";
import DomainsTable from "@/components/DomainsTable";

export default function Home({ blogs }) {
  const { isAuthenticated, setToken } = useAuth();

  const handleLogout = () => {
    setToken("");
    Router.push("/login");
  };
  // Function to format the date to show only the date without extra characters for the blogs
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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
                {/* DOMAINS TABLE */}
                <DomainsTable/>
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
  const res = await fetch('https://api-managewhistle.com/app/blog/get/');
  const blogs = await res.json();

  return {
    props: {
      blogs,
    },
  };
}
