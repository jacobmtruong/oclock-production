import classes from "../../styles/mainpage/mainBanner.module.css";
import Link from "next/link";
import OclockIcon from "../main/OclockIcon";
import Image from "next/image";
import igicon from "../../styles/images/ig-icon.png";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const MainBanner = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ close menu on route change
  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false);
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router.events]);

  return (
    <div className={classes.maincontainer}>
      <div className={classes.navcontainer}>
        {/* LEFT group (tablet/mobile) */}
        <div className={classes.leftGroup}>
          <button
            type="button"
            className={classes.hamburger}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* CENTER logo (all sizes) */}
        <Link href="/" className={classes.logoCenter} aria-label="Home">
          <OclockIcon />
        </Link>

        {/* RIGHT instagram (tablet/mobile - right) */}
        <Link
          href="https://www.instagram.com/oclock.production"
          className={classes.igRight}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <Image src={igicon} className={classes.image} alt="Instagram" />
        </Link>

        {/* Desktop Nav (unchanged design) */}
        <ul className={classes.navbar}>
          <li>
            <Link
              href="/portfolio"
              className={
                currentRoute === "/portfolio"
                  ? classes.active
                  : classes.nonActive
              }
            >
              Portfolio
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className={
                currentRoute === "/about" ? classes.active : classes.nonActive
              }
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className={
                currentRoute === "/contact" ? classes.active : classes.nonActive
              }
            >
              Contact
            </Link>
          </li>

          {/* Desktop only Instagram (keep in navbar as before) */}
          <Link
            href="https://www.instagram.com/oclock.production"
            className={classes.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={igicon} className={classes.image} alt="Instagram" />
          </Link>
        </ul>
      </div>

      {/* ✅ Backdrop: click outside closes menu */}
      {menuOpen && (
        <div
          className={classes.backdrop}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ✅ Drawer/Menu: prevent click inside from closing */}
      {menuOpen && (
        <div
          className={classes.mobileMenu}
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href="/portfolio"
            className={classes.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            Portfolio
          </Link>

          <Link
            href="/about"
            className={classes.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={classes.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};
