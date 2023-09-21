import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Whistle Coding Documentation';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <>
                    <Image
                        priority
                        src="/images/logo.png"
                        className={utilStyles.borderCircle}
                        height={150}
                        width={150}
                        alt=""
                    />
                    <h1 className={utilStyles.headingLg}>
                        {name}
                    </h1>
                </>
            </header>
            <main>{children}</main>
        </div>
    );
}