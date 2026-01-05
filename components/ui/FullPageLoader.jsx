import styles from "./fullPageLoader.module.css";

export default function FullPageLoader() {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <div className={styles.spinner} />
      <p className={styles.text}>O'CLOCK</p>
    </div>
  );
}
