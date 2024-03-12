import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";

import TestimonialCarousel from "../components/landing/Carousel";
import Features from "../components/landing/Features";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import Hero from "../components/landing/Hero";

const testimonials = [
  {
    label: "Raj K",
    content:
      "I never knew preparing for interviews could be this straightforward and effective.Thanks to DEVPREPAI I feel so confindent.",
    profileImage: "🧑‍💻",
    authorName: "Raj K",
    authorRole: "Backend Developer",
  },

  {
    label: "Stepheny H.",
    content:
      "Blown away by DevPrepAI’s comprehensive tools—from study guides to flashcards, everything is streamlined for the best learning experience.",
    profileImage: "🧔‍♂️",
    authorName: "Stepheny H.",
    authorRole: "3rd Year Student",
  },
  {
    label: "Osman P.",
    content:
      "DevPrepAI is a game-changer for students! No more manual flashcards—just upload your material, and it handles the rest, even at 1am!",
    profileImage: "🧔🏻",
    authorName: "Osman P.",
    authorRole: "Engineering Student",
  },
  {
    label: "Kim W.",
    content:
      "I fell in love with DevPrepAI just a week into using it. Its revolutionized my study routine—absolutely wish Id discovered it sooner!",
    profileImage: "💁‍♀️",
    authorName: "Tatevik P.",
    authorRole: "1st Year Student",
  },
  {
    label: "Mathew R",
    content:
      "In the jungle of work, family and upcoming tests, DevPrepAI is my lifeline for the best study materials. Can’t thank you enough!",
    profileImage: "🧓🏻",
    authorName: "Mathew R",
    authorRole: "Boot Camp Grad",
  },
  {
    label: "Liam A.",
    content:
      "DevPrepAI is the study buddy I wish I had last semester—always available and ready to help me ace my courses!",
    profileImage: "👨🏻‍🦱",
    authorName: "Liam A.",
    authorRole: "2nd Year Computer Science",
  },
  {
    label: "Conor J.",
    content:
      "DevPrepAI has transformed my study sessions. Just a quick upload of my materials, and I’m all set for success!",
    profileImage: "🧖🏻",
    authorName: "Conor J.",
    authorRole: "1st Year Student",
  },
];

const LandingPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleGetStarted = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      signIn("google", {
        callbackUrl: "/dashboard", // Redirect to dashboard after successful sign-in
      })
        .then((result) => {
          if (result && result.idToken) {
            // Store the ID token in local storage
            localStorage.setItem("googleIdToken", result.idToken);
          }
        })
        .catch((error) => {
          console.error("Sign-in error:", error);
        });
    }
  };

  return (
    <div className="landingPageContainer">
      <NavBar />
     
      <Hero onGetStarted={handleGetStarted} />

      <Features />

      {/* <section className="howItWorksSection">
        <h2 className="sectionTitle">How It Works</h2>
        <div className="howItWorksContent">
          <div className="textContainer">
            <div className="stepsContainer">
              <div className="step">1. Choose a Framework or Language</div>
              <div className="step">2. Start with Flashcards</div>
              <div className="step">3. Take Quizzes to Test Your Knowledge</div>
              <div className="step">4. Track Your Progress</div>
            </div>
          </div>
          <div className="videoContainer">
            <video controls width="400">
              <source src="/path/to/your/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section> */}

      <TestimonialCarousel testimonials={testimonials} />

      <Footer />
    </div>
  );
};

export default LandingPage;
