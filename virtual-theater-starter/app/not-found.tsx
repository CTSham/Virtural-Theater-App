import { Metadata } from "next";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Virtual Theater",
  description: "The page you're looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading404}>404</h1>
      <h2 className={styles.subheading}>Page Not Found</h2>
      <p className={styles.description}>The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className={styles.homeLink}>Return Home</a>
    </div>
  );
}
