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
                    <script type="module" src="https://unpkg.com/@splinetool/viewer@0.9.455/build/spline-viewer.js"></script>
                    <spline-viewer hint loading-anim url="https://prod.spline.design/xLzr30n-VHCqc6bt/scene.splinecode"></spline-viewer>
                </>
            </header>
            <main>{children}</main>
        </div>
    );
}