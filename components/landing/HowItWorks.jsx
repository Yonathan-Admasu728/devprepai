import React from "react";
import styles from "./HowitWorks.module.css";
import Image from "next/image";

function HowitWorks(props) {
  return (
    <div className={styles.div}>
      <div className={styles.div2}>
        <div className={styles.div3}>
          <div className={styles.div4}>
            <span style={{ color: "rgba(64,64,64,1)" }}>How It</span>
            <span style={{ color: "rgba(255,255,255,1)" }}> </span>
            <span style={{ color: "rgba(64,64,64,1)" }}>Works?</span>
          </div>
          <div className={styles.div5}>
            Discover the simple steps to your interview success with DECPREPAI.
          </div>
        </div>
        <div className={styles.div6}>
          <div className={styles.div7}>
            <div className={styles.column}>
              <div className={styles.div8}>
                <div className={styles.div9}>1</div>
                <div className={styles.div10}></div>
                <div className={styles.div11}>2</div>
                <div className={styles.div12}></div>
                <div className={styles.div13}>3</div>
                <div className={styles.div14}></div>
                <div className={styles.div15}>4</div>
              </div>
            </div>
            <div className={styles.column2}>
              <div className={styles.div16}>
                <div className={styles.div17}>
                  <div className={styles.div18}>
                    <div className={styles.div19}>
                      <div className={styles.column3}>
                        <Image
                          className={styles.Image}
                          loading="lazy"
                          src="/img1"
                          alt=""
                        />
                      </div>
                      <div className={styles.column4}>
                        <div className={styles.div20}>
                          <div className={styles.div21}>Choose a framework or language </div>
                          <div className={styles.div22}>
                            Select the framework or programming language that
                            aligns with your interview goals and expertise. Dive
                            into focused preparation with the language or
                            framework that matches your target job requirements.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.div23}>
                  <div className={styles.div24}>
                    <div className={styles.div25}>
                      <div className={styles.column5}>
                        <div className={styles.div26}>
                          <Image
                            className={styles.img2}
                            loading="lazy"
                            src="/img2"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className={styles.column6}>
                        <div className={styles.div27}>
                          <div className={styles.div28}>Start with Flashcards</div>
                          <div className={styles.div29}>
                            Access interactive flashcards designed specifically
                            for your selected framework and language. Stay sharp
                            with flashcards that cater to your programming
                            language and framework of choice.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.div30}>
                  <div className={styles.div31}>
                    <div className={styles.div32}>
                      <div className={styles.column7}>
                        <div className={styles.div33}>
                          <Image
                            className={styles.img3}
                            loading="lazy"
                            src="/img3"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className={styles.column8}>
                        <div className={styles.div34}>
                          <div className={styles.div35}>Take Quizzes</div>
                          <div className={styles.div36}>
                            Challenge yourself and solidify your understanding
                            by taking quizzes following your flashcard sessions.
                            Assess your grasp of the material through quizzes
                            designed for immediate application.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.div37}>
                  <div className={styles.div38}>
                    <div className={styles.div39}>
                      <div className={styles.column9}>
                        <div className={styles.div40}>
                          <Image
                            className={styles.img4}
                            loading="lazy"
                            src="/img4"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className={styles.column10}>
                        <div className={styles.div41}>
                          <div className={styles.div42}>Take Smart AI interview</div>
                          <div className={styles.div43}>
                            Simulate real interviews and fine-tune your skills
                            by facing AI-powered interview simulations. Refine
                            your interview performance through realistic AI
                            interviews that provide valuable feedback.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowitWorks;