import { getSession, signOut } from "next-auth/react";
import FlashcardsMenu from "../components/FlashCardMenu";
import InterviewMaster from "../components/InterviewMaster";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/dashboard.module.css";

export default function Dashboard({ session }) {
  if (!session) {
    return <p>You must be logged in to view this content.</p>;
  }

  return (
    <div className="app-container">
      <Navbar />
      {/* You can add a progress bar here */}

      <div className={styles.welcomeMessage}>
        <span style={{ color: "rgba(252,188,90,1)" }}>Welcome </span>
        <span style={{ color: "linear-gradient(135deg, #120318, #0d0f27)" }}>
          {session.user.name.split(" ")[0]}
        </span>
      </div>
      <FlashcardsMenu session={session} />
      <InterviewMaster />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
