"use client";
import Image from "next/image";
import * as React from "react";

function MyComponent(props) {
  return (
    <div className="bg-white flex flex-col">
      <div className="items-start bg-slate-100 self-stretch flex w-full flex-col max-md:max-w-full">
        <div className="justify-between items-center border border-[color:var(--color-neutral-neutral-300,#D4D4D4)] self-stretch flex w-full flex-col px-5 py-5 border-solid max-md:max-w-full">
          <div className="self-center flex w-full max-w-screen-xl items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
            <Image
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/97f547c3-0dd1-481c-a4db-3db3fcefd5c7?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/97f547c3-0dd1-481c-a4db-3db3fcefd5c7?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/97f547c3-0dd1-481c-a4db-3db3fcefd5c7?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/97f547c3-0dd1-481c-a4db-3db3fcefd5c7?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/97f547c3-0dd1-481c-a4db-3db3fcefd5c7?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/97f547c3-0dd1-481c-a4db-3db3fcefd5c7?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/97f547c3-0dd1-481c-a4db-3db3fcefd5c7?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/97f547c3-0dd1-481c-a4db-3db3fcefd5c7?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
              className="aspect-[2.02] object-cover object-center w-[87px] overflow-hidden shrink-0 mt-px"
              alt="Image"
            />
            <div className="items-start self-center flex w-[247px] max-w-full justify-between gap-5 my-auto max-md:justify-center">
              <div className="text-orange-300 text-base font-bold leading-[150%] tracking-wide self-stretch">
                Home
              </div>
              <div className="text-neutral-700 text-base leading-[150%] tracking-normal self-center my-auto">
                About
              </div>
              <div className="text-neutral-700 text-base leading-[150%] tracking-normal self-center my-auto">
                Contact Us
              </div>
            </div>
            <div className="items-start self-stretch flex justify-between gap-2.5">
              <div className="justify-center items-center border border-[color:var(--color-primary-primary-600,#D29D4B)] self-stretch flex w-[123px] max-w-full flex-col px-5 py-3 rounded-[30px] border-solid">
                <div className="text-orange-400 text-center text-lg font-medium leading-[111.11%] tracking-normal self-center">
                  Sign Up
                </div>
              </div>
              <div className="justify-center items-center bg-orange-300 self-stretch flex w-[116px] max-w-full flex-col px-5 py-3 rounded-[30px]">
                <div className="text-zinc-700 text-center text-lg font-medium leading-[111.11%] tracking-normal self-center">
                  Sign In
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-center w-full max-w-[1253px] mt-16 px-5 max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[54%] max-md:w-full max-md:ml-0">
              <div className="items-start flex flex-col my-auto max-md:max-w-full max-md:mt-12">
                <div className="items-start flex w-[644px] max-w-full flex-col">
                  <div className="text-neutral-700 text-6xl font-bold w-full max-md:max-w-full max-md:text-4xl">
                    <span className="text-orange-300">Level Up</span>
                    <span className="text-neutral-700">
                      {" "}
                      Your Interview Skills with Us
                    </span>
                  </div>
                  <div className="text-neutral-600 text-xl leading-[150%] tracking-wide w-[622px] max-w-full mt-4">
                    Join us to gain the expertise, confidence, and insider
                    knowledge needed to excel in technical interviews. Your
                    dream tech job is within reach!
                  </div>
                </div>
                <div className="justify-center items-center bg-orange-300 flex w-[140px] max-w-full grow flex-col mt-6 px-5 py-3 rounded-[100px]">
                  <div className="text-neutral-900 text-center text-base font-medium leading-[150%] tracking-normal self-center">
                    Get Started
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[46%] ml-5 max-md:w-full max-md:ml-0">
              <Image
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d0c70ee1-2346-43ee-876c-674b2946e6fa?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d0c70ee1-2346-43ee-876c-674b2946e6fa?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d0c70ee1-2346-43ee-876c-674b2946e6fa?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d0c70ee1-2346-43ee-876c-674b2946e6fa?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d0c70ee1-2346-43ee-876c-674b2946e6fa?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d0c70ee1-2346-43ee-876c-674b2946e6fa?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d0c70ee1-2346-43ee-876c-674b2946e6fa?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d0c70ee1-2346-43ee-876c-674b2946e6fa?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                className="aspect-[0.86] object-cover object-center w-full overflow-hidden grow max-md:max-w-full max-md:mt-12"
                alt="img"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="justify-between self-center w-full max-w-screen-xl mt-24 px-5 max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[42%] max-md:w-full max-md:ml-0">
            <div className="items-start flex grow flex-col max-md:max-w-full max-md:mt-11">
              <div className="bg-orange-300 flex w-[94px] h-[7px] flex-col" />
              <div className="text-neutral-600 text-4xl font-bold leading-[50px] tracking-wide w-[517px] max-w-full mt-9">
                <span className="text-neutral-700">Key </span>
                <span className="text-neutral-600">Features</span>
              </div>
              <div className="text-neutral-600 text-xl leading-[150%] tracking-wide w-[517px] max-w-full mt-9">
                Problems trying to resolve the conflict between the two major
                realms of Classical physics: Newtonian mechanics{" "}
              </div>
              <div className="items-start flex w-[93px] max-w-full gap-2.5 mt-9">
                <div className="text-orange-300 text-sm font-bold leading-[171.43%] tracking-wide self-stretch">
                  Learn More
                </div>
                <Image
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/71d8d761-1df1-45df-9341-5d0798a10769?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/71d8d761-1df1-45df-9341-5d0798a10769?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/71d8d761-1df1-45df-9341-5d0798a10769?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/71d8d761-1df1-45df-9341-5d0798a10769?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/71d8d761-1df1-45df-9341-5d0798a10769?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/71d8d761-1df1-45df-9341-5d0798a10769?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/71d8d761-1df1-45df-9341-5d0798a10769?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/71d8d761-1df1-45df-9341-5d0798a10769?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                  className="aspect-[0.56] object-cover object-center w-[9px] overflow-hidden self-center shrink-0 my-auto"
                  alt="img"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[58%] ml-5 max-md:w-full max-md:ml-0">
            <div className="justify-center my-auto max-md:max-w-full max-md:mt-12">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                  <div className="items-center flex grow flex-col w-[348px] max-md:mt-6">
                    <div className="items-start shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.10)] bg-slate-100 self-stretch flex w-full flex-col pl-4 pr-5 py-6 rounded-lg">
                      <div className="items-start flex w-[282px] max-w-full gap-4">
                        <Image
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/fd1eddf8-38b1-428b-987e-19c41c0b8833?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/fd1eddf8-38b1-428b-987e-19c41c0b8833?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/fd1eddf8-38b1-428b-987e-19c41c0b8833?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/fd1eddf8-38b1-428b-987e-19c41c0b8833?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/fd1eddf8-38b1-428b-987e-19c41c0b8833?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/fd1eddf8-38b1-428b-987e-19c41c0b8833?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/fd1eddf8-38b1-428b-987e-19c41c0b8833?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/fd1eddf8-38b1-428b-987e-19c41c0b8833?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                          className="aspect-square object-cover object-center w-[50px] justify-center items-center overflow-hidden shrink-0"
                          alt="img"
                        />
                        <div className="items-start flex flex-col">
                          <div className="text-neutral-900 text-base font-bold leading-[150%] tracking-normal">
                            Interactive Flashcards
                          </div>
                          <div className="text-neutral-600 text-xs leading-[133.33%] tracking-wide w-[216px] max-w-full mt-2">
                            Reinforce programming concepts with interactive
                            flashcards .
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="items-start shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.10)] bg-slate-100 self-stretch flex w-full grow flex-col mt-6 px-4 py-6 rounded-lg">
                      <div className="items-start self-stretch flex justify-between gap-4">
                        <Image
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/26a4583f-0be9-4533-8c32-9cf06a266a2e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/26a4583f-0be9-4533-8c32-9cf06a266a2e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/26a4583f-0be9-4533-8c32-9cf06a266a2e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/26a4583f-0be9-4533-8c32-9cf06a266a2e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/26a4583f-0be9-4533-8c32-9cf06a266a2e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/26a4583f-0be9-4533-8c32-9cf06a266a2e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/26a4583f-0be9-4533-8c32-9cf06a266a2e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/26a4583f-0be9-4533-8c32-9cf06a266a2e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                          className="aspect-square object-cover object-center w-[50px] justify-center items-center overflow-hidden shrink-0"
                          alt="img"
                        />
                        <div className="items-start flex flex-col grow shrink-0 basis-auto">
                          <div className="text-neutral-900 text-base font-bold leading-[150%] tracking-normal">
                            Quizzes{" "}
                          </div>
                          <div className="text-neutral-600 text-xs leading-[133.33%] tracking-wide w-[250px] max-w-full mt-2">
                            Things on a very small that you <br />
                            have any direct
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                  <div className="items-center flex grow flex-col w-[348px] max-md:mt-6">
                    <div className="items-start shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.10)] bg-slate-100 self-stretch flex w-full flex-col px-4 py-6 rounded-lg">
                      <div className="items-start self-stretch flex justify-between gap-5">
                        <Image
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/df624784-9703-4606-8dba-3db48b22a6df?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/df624784-9703-4606-8dba-3db48b22a6df?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/df624784-9703-4606-8dba-3db48b22a6df?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/df624784-9703-4606-8dba-3db48b22a6df?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/df624784-9703-4606-8dba-3db48b22a6df?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/df624784-9703-4606-8dba-3db48b22a6df?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/df624784-9703-4606-8dba-3db48b22a6df?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/df624784-9703-4606-8dba-3db48b22a6df?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                          className="aspect-square object-cover object-center w-[50px] justify-center items-center overflow-hidden shrink-0"
                          alt="img"
                        />
                        <div className="items-start flex flex-col">
                          <div className="text-neutral-900 text-base font-bold leading-[150%] tracking-normal">
                            Progress Tracking
                          </div>
                          <div className="text-neutral-600 text-xs leading-[133.33%] tracking-wide w-[246px] max-w-full mt-2">
                            Stay on top of your growth and see how far you have
                            come with tracking tool.
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    <div className="items-start shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.10)] bg-slate-100 self-stretch flex w-full grow flex-col mt-6 px-4 py-6 rounded-lg">
                      <div className="items-start self-stretch flex justify-between gap-4">
                        <Image
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/40849cd7-baef-4d45-8cad-bab68739b6cb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/40849cd7-baef-4d45-8cad-bab68739b6cb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/40849cd7-baef-4d45-8cad-bab68739b6cb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/40849cd7-baef-4d45-8cad-bab68739b6cb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/40849cd7-baef-4d45-8cad-bab68739b6cb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/40849cd7-baef-4d45-8cad-bab68739b6cb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/40849cd7-baef-4d45-8cad-bab68739b6cb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/40849cd7-baef-4d45-8cad-bab68739b6cb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                          className="aspect-square object-cover object-center w-[50px] justify-center items-center overflow-hidden shrink-0"
                          alt="img"
                        />{" "}
                        <div className="items-start flex flex-col grow shrink-0 basis-auto">
                          <div className="text-neutral-900 text-base font-bold leading-[150%] tracking-normal">
                            AI Interviews
                          </div>{" "}
                          <div className="text-neutral-600 text-xs leading-[133.33%] tracking-wide w-[250px] max-w-full mt-2">
                            Things on a very small that you <br />
                            have any direct
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
      </div>{" "}
      <div className="justify-center items-center bg-slate-100 self-stretch flex w-full flex-col mt-24 px-5 py-10 max-md:max-w-full">
        <div className="items-center self-center flex w-[722px] max-w-full flex-col mt-4">
          <div className="text-neutral-700 text-5xl font-semibold self-center max-md:text-4xl">
            <span className="text-neutral-700">How It</span>
            <span className="text-white"> </span>
            <span className="text-neutral-700">Works?</span>
          </div>{" "}
          <div className="text-neutral-600 text-center text-xl leading-[150%] tracking-wide self-stretch w-full mt-5 max-md:max-w-full">
            Discover the simple steps to your interview success with DECPREPAI.
          </div>
        </div>{" "}
        <div className="justify-center self-center w-[818px] max-w-full mt-8 mb-4">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[6%] max-md:w-full max-md:ml-0">
              <div className="flex flex-col w-11 my-auto max-md:mt-12">
                <div className="text-neutral-900 text-center text-base leading-[212.5%] capitalize self-stretch justify-center items-center border border-[color:var(--color-main-black,#111)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06),0px_4px_3px_0px_rgba(0,0,0,0.07)] w-full pl-5 pr-5 pt-4 pb-4 rounded-[52px] border-solid">
                  1
                </div>{" "}
                <div className="bg-neutral-900 self-center flex w-[3px] h-[199px] flex-col mt-4 rounded-sm" />{" "}
                <div className="text-neutral-900 text-center text-base leading-[212.5%] capitalize self-stretch justify-center items-center border border-[color:var(--color-main-black,#111)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06),0px_4px_3px_0px_rgba(0,0,0,0.07)] w-full pl-5 pr-5 py-4 rounded-[52px] border-solid">
                  2
                </div>{" "}
                <div className="bg-neutral-900 self-center flex w-[3px] h-[199px] flex-col mt-4 rounded-sm" />{" "}
                <div className="text-neutral-900 text-center text-base leading-[212.5%] capitalize self-stretch justify-center items-center border border-[color:var(--color-main-black,#111)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06),0px_4px_3px_0px_rgba(0,0,0,0.07)] w-full pl-5 pr-5 py-4 rounded-[52px] border-solid">
                  3
                </div>{" "}
                <div className="bg-neutral-900 self-center flex w-[3px] h-[199px] flex-col mt-4 rounded-sm" />{" "}
                <div className="text-neutral-900 text-center text-base leading-[212.5%] capitalize self-stretch justify-center items-center border border-[color:var(--color-main-black,#111)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06),0px_4px_3px_0px_rgba(0,0,0,0.07)] w-full grow mt-4 pl-4 pr-5 pt-4 pb-4 rounded-[52px] border-solid">
                  4
                </div>
              </div>
            </div>{" "}
            <div className="flex flex-col items-stretch w-[94%] ml-5 max-md:w-full max-md:ml-0">
              <div className="items-start flex grow flex-col max-md:max-w-full max-md:mt-10">
                <div className="items-start border border-[color:var(--color-neutral-neutral-200,#E5E5E5)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06),0px_0px_10px_0px_rgba(0,0,0,0.08)] bg-white self-stretch flex flex-col px-5 py-6 rounded-lg border-solid max-md:max-w-full">
                  <div className="self-stretch mx-1 max-md:max-w-full">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                      <div className="flex flex-col items-stretch w-[28%] max-md:w-full max-md:ml-0">
                        <Image
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c891743e-7f51-4f76-900b-e88bac1f403f?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c891743e-7f51-4f76-900b-e88bac1f403f?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c891743e-7f51-4f76-900b-e88bac1f403f?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c891743e-7f51-4f76-900b-e88bac1f403f?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c891743e-7f51-4f76-900b-e88bac1f403f?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c891743e-7f51-4f76-900b-e88bac1f403f?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c891743e-7f51-4f76-900b-e88bac1f403f?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c891743e-7f51-4f76-900b-e88bac1f403f?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                          className="aspect-square object-cover object-center w-[186px] overflow-hidden shrink-0 max-md:mt-7"
                          alt="img"
                        />
                      </div>{" "}
                      <div className="flex flex-col items-stretch w-[72%] ml-5 max-md:w-full max-md:ml-0">
                        <div className="items-start flex flex-col my-auto max-md:max-w-full max-md:mt-12">
                          <div className="text-neutral-900 text-xl font-medium leading-[140%] capitalize w-[414px] max-w-full">
                            Choose a framework or language{" "}
                          </div>{" "}
                          <div className="text-neutral-600 text-sm leading-[142.86%] w-[472px] max-w-full mt-4">
                            Select the framework or programming language that
                            aligns with your interview goals and expertise. Dive
                            into focused preparation with the language or
                            framework that matches your target job requirements.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="items-start border border-[color:var(--color-slate-slate-200,#E2E8F0)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06),0px_0px_10px_0px_rgba(0,0,0,0.08)] bg-white self-stretch flex flex-col mt-11 px-5 py-6 rounded-lg border-solid max-md:max-w-full">
                  <div className="self-stretch mx-1 max-md:max-w-full">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                      <div className="flex flex-col items-stretch w-[28%] max-md:w-full max-md:ml-0">
                        <div className="bg-cyan-700 flex w-[186px] max-w-full grow flex-col mx-auto px-5 py-10 max-md:mt-7">
                          <Image
                            loading="lazy"
                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0b55d50b-cf4e-46a1-9e28-85d7dc6dfd8e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0b55d50b-cf4e-46a1-9e28-85d7dc6dfd8e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0b55d50b-cf4e-46a1-9e28-85d7dc6dfd8e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0b55d50b-cf4e-46a1-9e28-85d7dc6dfd8e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0b55d50b-cf4e-46a1-9e28-85d7dc6dfd8e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0b55d50b-cf4e-46a1-9e28-85d7dc6dfd8e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0b55d50b-cf4e-46a1-9e28-85d7dc6dfd8e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0b55d50b-cf4e-46a1-9e28-85d7dc6dfd8e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                            className="aspect-square object-cover object-center w-[78px] overflow-hidden self-center shrink-0 my-3.5"
                            alt="img"
                          />
                        </div>
                      </div>{" "}
                      <div className="flex flex-col items-stretch w-[72%] ml-5 max-md:w-full max-md:ml-0">
                        <div className="items-start flex flex-col my-auto max-md:max-w-full max-md:mt-12">
                          <div className="text-neutral-900 text-xl font-medium leading-[140%] capitalize w-[414px] max-w-full">
                            Start with Flashcards
                          </div>{" "}
                          <div className="text-neutral-600 text-sm leading-[142.86%] w-[472px] max-w-full mt-4">
                            Access interactive flashcards designed specifically
                            for your selected framework and language. Stay sharp
                            with flashcards that cater to your programming
                            language and framework of choice.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="items-start border border-[color:var(--color-slate-slate-200,#E2E8F0)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06),0px_0px_10px_0px_rgba(0,0,0,0.08)] bg-white self-stretch flex flex-col mt-11 px-5 py-6 rounded-lg border-solid max-md:max-w-full">
                  <div className="self-stretch mx-1 max-md:max-w-full">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                      <div className="flex flex-col items-stretch w-[28%] max-md:w-full max-md:ml-0">
                        <div className="bg-cyan-700 flex w-[186px] max-w-full grow flex-col mx-auto px-5 py-10 max-md:mt-7">
                          <Image
                            loading="lazy"
                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/53cbddc1-3edd-4ee7-9dfd-083186df275e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/53cbddc1-3edd-4ee7-9dfd-083186df275e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/53cbddc1-3edd-4ee7-9dfd-083186df275e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/53cbddc1-3edd-4ee7-9dfd-083186df275e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/53cbddc1-3edd-4ee7-9dfd-083186df275e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/53cbddc1-3edd-4ee7-9dfd-083186df275e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/53cbddc1-3edd-4ee7-9dfd-083186df275e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/53cbddc1-3edd-4ee7-9dfd-083186df275e?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                            className="aspect-square object-cover object-center w-[78px] overflow-hidden self-center shrink-0 my-3.5"
                            alt="img"
                          />
                        </div>
                      </div>{" "}
                      <div className="flex flex-col items-stretch w-[72%] ml-5 max-md:w-full max-md:ml-0">
                        <div className="items-start flex flex-col my-auto max-md:max-w-full max-md:mt-12">
                          <div className="text-neutral-900 text-xl font-medium leading-[140%] capitalize w-[414px] max-w-full">
                            Take Quizzes
                          </div>{" "}
                          <div className="text-neutral-600 text-sm leading-[142.86%] w-[472px] max-w-full mt-4">
                            Challenge yourself and solidify your understanding
                            by taking quizzes following your flashcard sessions.
                            Assess your grasp of the material through quizzes
                            designed for immediate application.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="items-start border border-[color:var(--color-slate-slate-200,#E2E8F0)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06),0px_0px_10px_0px_rgba(0,0,0,0.08)] bg-white self-stretch flex grow flex-col mt-11 px-5 py-6 rounded-lg border-solid max-md:max-w-full">
                  <div className="self-stretch mx-1 max-md:max-w-full">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                      <div className="flex flex-col items-stretch w-[28%] max-md:w-full max-md:ml-0">
                        <div className="bg-cyan-700 flex w-[186px] max-w-full grow flex-col mx-auto px-5 py-10 max-md:mt-7">
                          <Image
                            loading="lazy"
                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ddab10ea-b6a8-45a4-bbfc-0c384a918286?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ddab10ea-b6a8-45a4-bbfc-0c384a918286?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ddab10ea-b6a8-45a4-bbfc-0c384a918286?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ddab10ea-b6a8-45a4-bbfc-0c384a918286?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ddab10ea-b6a8-45a4-bbfc-0c384a918286?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ddab10ea-b6a8-45a4-bbfc-0c384a918286?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ddab10ea-b6a8-45a4-bbfc-0c384a918286?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ddab10ea-b6a8-45a4-bbfc-0c384a918286?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                            className="aspect-square object-cover object-center w-[78px] overflow-hidden self-center shrink-0 my-3.5"
                            alt="img"
                          />
                        </div>
                      </div>{" "}
                      <div className="flex flex-col items-stretch w-[72%] ml-5 max-md:w-full max-md:ml-0">
                        <div className="items-start flex flex-col my-auto max-md:max-w-full max-md:mt-12">
                          <div className="text-neutral-900 text-xl font-medium leading-[140%] capitalize w-[414px] max-w-full">
                            Take Smart AI interview
                          </div>{" "}
                          <div className="text-neutral-600 text-sm leading-[142.86%] w-[472px] max-w-full mt-4">
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
      </div>{" "}
      <div className="items-center self-center flex w-full max-w-screen-xl flex-col mt-24 max-md:max-w-full">
        <div className="items-center self-center flex w-[863px] max-w-full flex-col px-5">
          <div className="text-neutral-700 text-5xl font-semibold self-center max-md:max-w-full max-md:text-4xl">
            What Our Users Says
          </div>{" "}
          <div className="text-neutral-600 text-center text-xl leading-[150%] tracking-wide self-stretch w-full -mr-5 mt-5 max-md:max-w-full">
            Our client expressed their satisfaction with our services by sending
            us a collection of smiley emoticons, which we greatly appreciate.
          </div>
        </div>{" "}
        <div className="justify-center self-stretch mt-10 px-5 max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[19%] max-md:w-full max-md:ml-0">
              <div className="items-center flex flex-col w-[232px] my-auto max-md:mt-12">
                <div className="text-neutral-400 text-center text-sm leading-[142.86%] self-stretch w-full max-w-full items-center border-[color:var(--color-slate-slate-200,#E2E8F0)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.10)] bg-slate-100 grow pr-5 pt-20 pb-20 rounded-2xl border-[1.35px] border-solid">
                  Working with ABC Web Solutions was a pleasure from start to
                  finish. The website they created for us not only looks amazing
                  but also performs exceptionally well. Our online presence has
                  significantly improved, and we have received numerous
                  compliments from our customers.
                </div>
              </div>
            </div>{" "}
            <div className="flex flex-col items-stretch w-[62%] ml-5 max-md:w-full max-md:ml-0">
              <div className="items-center flex grow flex-col max-md:max-w-full max-md:mt-8">
                <Image
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a586b668-60e2-4cda-bd14-b3577771e1da?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a586b668-60e2-4cda-bd14-b3577771e1da?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a586b668-60e2-4cda-bd14-b3577771e1da?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a586b668-60e2-4cda-bd14-b3577771e1da?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a586b668-60e2-4cda-bd14-b3577771e1da?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a586b668-60e2-4cda-bd14-b3577771e1da?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a586b668-60e2-4cda-bd14-b3577771e1da?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a586b668-60e2-4cda-bd14-b3577771e1da?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                  className="aspect-square object-cover object-center w-[100px] overflow-hidden self-center shrink-0"
                  alt="img"
                />{" "}
                <div className="items-center border-[color:var(--color-slate-slate-200,#E2E8F0)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06),0px_0px_10px_0px_rgba(0,0,0,0.08)] bg-slate-200 self-stretch flex grow flex-col px-5 py-10 rounded-2xl border-[1.35px] border-solid max-md:max-w-full">
                  <div className="text-neutral-500 text-center text-base leading-[150%] self-center w-[600px] max-w-full mt-12">
                    Working with ABC Web Solutions was a pleasure from start to
                    finish. The website they created for us not only looks
                    amazing but also performs exceptionally well. Our online
                    presence has significantly improved, and we have received
                    numerous compliments from our customers.
                  </div>{" "}
                  <div className="items-center self-center flex w-28 max-w-full flex-col mt-8 mb-2">
                    <div className="text-neutral-900 text-center text-base font-bold leading-[150%] self-stretch">
                      Maxine Murphy
                    </div>{" "}
                    <div className="text-neutral-500 text-sm leading-[142.86%] self-center mt-1">
                      Developer
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="flex flex-col items-stretch w-[19%] ml-5 max-md:w-full max-md:ml-0">
              <div className="items-center flex flex-col w-[232px] my-auto max-md:mt-12">
                <div className="text-neutral-400 text-center text-sm leading-[142.86%] self-stretch w-full items-center border-[color:var(--color-slate-slate-200,#E2E8F0)] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.10)] bg-slate-100 grow pl-5 pt-20 pb-20 rounded-2xl border-[1.35px] border-solid">
                  Working with ABC Web Solutions was a pleasure from start to
                  finish. The website they created for us not only looks amazing
                  but also performs exceptionally well. Our online presence has
                  significantly improved, and we have received numerous
                  compliments from our customers.
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="items-start self-center flex w-[62px] max-w-full gap-3 mt-10 px-5 max-md:justify-center">
          <Image
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/2c5e8a4b-368c-4a53-bc06-08f36b1194a6?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c5e8a4b-368c-4a53-bc06-08f36b1194a6?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c5e8a4b-368c-4a53-bc06-08f36b1194a6?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c5e8a4b-368c-4a53-bc06-08f36b1194a6?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c5e8a4b-368c-4a53-bc06-08f36b1194a6?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c5e8a4b-368c-4a53-bc06-08f36b1194a6?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c5e8a4b-368c-4a53-bc06-08f36b1194a6?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c5e8a4b-368c-4a53-bc06-08f36b1194a6?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
            className="aspect-square object-cover object-center w-[11px] fill-amber-200 opacity-40 overflow-hidden self-center shrink-0 my-auto"
            alt="img"
          />{" "}
          <Image
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6bb3ef0f-3ced-46bf-bd8c-8bb24e23962b?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6bb3ef0f-3ced-46bf-bd8c-8bb24e23962b?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6bb3ef0f-3ced-46bf-bd8c-8bb24e23962b?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6bb3ef0f-3ced-46bf-bd8c-8bb24e23962b?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6bb3ef0f-3ced-46bf-bd8c-8bb24e23962b?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6bb3ef0f-3ced-46bf-bd8c-8bb24e23962b?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6bb3ef0f-3ced-46bf-bd8c-8bb24e23962b?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/6bb3ef0f-3ced-46bf-bd8c-8bb24e23962b?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
            className="aspect-[1.07] object-cover object-center w-4 fill-orange-300 overflow-hidden shrink-0"
            alt="img"
          />{" "}
          <Image
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9257254e-a99e-4c9a-9f4b-706ab28b5650?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9257254e-a99e-4c9a-9f4b-706ab28b5650?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9257254e-a99e-4c9a-9f4b-706ab28b5650?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9257254e-a99e-4c9a-9f4b-706ab28b5650?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9257254e-a99e-4c9a-9f4b-706ab28b5650?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9257254e-a99e-4c9a-9f4b-706ab28b5650?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9257254e-a99e-4c9a-9f4b-706ab28b5650?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9257254e-a99e-4c9a-9f4b-706ab28b5650?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
            className="aspect-square object-cover object-center w-[11px] fill-amber-200 opacity-40 overflow-hidden self-center shrink-0 my-auto"
            alt="img"
          />
        </div>
      </div>{" "}
      <div className="items-start self-stretch flex w-full flex-col mt-20 px-5 py-10 max-md:max-w-full">
        <div className="self-center flex w-[1280px] max-w-screen-xl flex-col -ml-5 mt-2 mb-3 max-md:max-w-full">
          <div className="self-center w-full max-w-[1141px] max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[34%] max-md:w-full max-md:ml-0">
                <div className="items-start flex grow flex-col max-md:mt-12">
                  <div className="items-start flex w-72 max-w-full flex-col">
                    <Image
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/240f6915-6298-465d-8949-787d529fe5eb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/240f6915-6298-465d-8949-787d529fe5eb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/240f6915-6298-465d-8949-787d529fe5eb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/240f6915-6298-465d-8949-787d529fe5eb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/240f6915-6298-465d-8949-787d529fe5eb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/240f6915-6298-465d-8949-787d529fe5eb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/240f6915-6298-465d-8949-787d529fe5eb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/240f6915-6298-465d-8949-787d529fe5eb?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                      className="aspect-[2.03] object-cover object-center w-[120px] overflow-hidden shrink-0"
                      alt="img"
                    />{" "}
                    <div className="text-white text-base leading-6 opacity-70 w-full mt-6">
                      Lorem ipsum dolor sit amet, consect
                      <br />
                      etur adipiscing elit. Ullamcorper purus eleifend purus
                      faucibus faucibus.
                    </div>
                  </div>{" "}
                  <div className="items-start flex w-[242px] max-w-full justify-between gap-5 mt-8 max-md:justify-center">
                    <Image
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ba8a8295-2bfc-44fb-925c-0ebecaa31ccd?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba8a8295-2bfc-44fb-925c-0ebecaa31ccd?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba8a8295-2bfc-44fb-925c-0ebecaa31ccd?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba8a8295-2bfc-44fb-925c-0ebecaa31ccd?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba8a8295-2bfc-44fb-925c-0ebecaa31ccd?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba8a8295-2bfc-44fb-925c-0ebecaa31ccd?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba8a8295-2bfc-44fb-925c-0ebecaa31ccd?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba8a8295-2bfc-44fb-925c-0ebecaa31ccd?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                      className="aspect-square object-cover object-center w-[41px] overflow-hidden shrink-0"
                      alt="img"
                    />{" "}
                    <Image
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ed9430ab-a61b-4648-a349-f82a115de1ca?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ed9430ab-a61b-4648-a349-f82a115de1ca?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ed9430ab-a61b-4648-a349-f82a115de1ca?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ed9430ab-a61b-4648-a349-f82a115de1ca?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ed9430ab-a61b-4648-a349-f82a115de1ca?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ed9430ab-a61b-4648-a349-f82a115de1ca?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ed9430ab-a61b-4648-a349-f82a115de1ca?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ed9430ab-a61b-4648-a349-f82a115de1ca?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                      className="aspect-square object-cover object-center w-[41px] overflow-hidden shrink-0"
                      alt="img"
                    />{" "}
                    <Image
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b8af87fa-7d21-49ce-901f-f85d8f5f4215?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b8af87fa-7d21-49ce-901f-f85d8f5f4215?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b8af87fa-7d21-49ce-901f-f85d8f5f4215?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b8af87fa-7d21-49ce-901f-f85d8f5f4215?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b8af87fa-7d21-49ce-901f-f85d8f5f4215?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b8af87fa-7d21-49ce-901f-f85d8f5f4215?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b8af87fa-7d21-49ce-901f-f85d8f5f4215?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b8af87fa-7d21-49ce-901f-f85d8f5f4215?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                      className="aspect-square object-cover object-center w-[41px] overflow-hidden shrink-0"
                      alt="img"
                    />{" "}
                    <Image
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/25378423-96c5-4cfa-a1e2-08dc313c1506?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/25378423-96c5-4cfa-a1e2-08dc313c1506?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/25378423-96c5-4cfa-a1e2-08dc313c1506?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/25378423-96c5-4cfa-a1e2-08dc313c1506?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/25378423-96c5-4cfa-a1e2-08dc313c1506?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/25378423-96c5-4cfa-a1e2-08dc313c1506?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/25378423-96c5-4cfa-a1e2-08dc313c1506?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/25378423-96c5-4cfa-a1e2-08dc313c1506?apiKey=1ecaff6980a04ef8b0cbbef867565c6b&"
                      className="aspect-square object-cover object-center w-[41px] overflow-hidden shrink-0"
                      alt="img"
                    />
                  </div>
                </div>
              </div>{" "}
              <div className="flex flex-col items-stretch w-[12%] ml-5 max-md:w-full max-md:ml-0">
                <div className="items-start flex flex-col my-auto max-md:mt-12">
                  <div className="text-white text-xl font-medium leading-7">
                    Resources
                  </div>{" "}
                  <div className="items-start flex w-[103px] max-w-full grow flex-col mt-5">
                    <div className="text-white text-lg leading-7 opacity-70">
                      services
                    </div>{" "}
                    <div className="text-white text-lg leading-7 opacity-70 mt-2">
                      Pricing
                    </div>{" "}
                    <div className="text-white text-lg leading-7 opacity-70 mt-2">
                      Testimonials
                    </div>{" "}
                    <div className="text-white text-lg leading-7 opacity-70 mt-2">
                      Blog
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="flex flex-col items-stretch w-[17%] ml-5 max-md:w-full max-md:ml-0">
                <div className="items-start flex flex-col my-auto max-md:mt-12">
                  <div className="text-white text-xl font-medium leading-7">
                    Usefull links
                  </div>{" "}
                  <div className="items-start flex w-36 max-w-full grow flex-col mt-5">
                    <div className="text-white text-lg leading-7 opacity-70">
                      Terms of Services
                    </div>{" "}
                    <div className="text-white text-lg leading-7 opacity-70 mt-2">
                      Privacy Policy
                    </div>{" "}
                    <div className="text-white text-lg leading-7 opacity-70 mt-2">
                      Cookie Policy
                    </div>{" "}
                    <div className="text-white text-lg leading-7 opacity-70 mt-2">
                      Contact us{" "}
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="flex flex-col items-stretch w-[36%] ml-5 max-md:w-full max-md:ml-0">
                <div className="items-start flex flex-col my-auto max-md:mt-12">
                  <div className="text-white text-xl font-medium leading-7">
                    Newsletter
                  </div>{" "}
                  <div className="items-start flex w-[306px] max-w-full grow flex-col mt-5">
                    <div className="text-white text-base leading-6 opacity-70 w-[241px] max-w-full">
                      Sign up and receive the lastest news via email.
                    </div>{" "}
                    <div className="items-start border flex w-full justify-between gap-5 mt-6 pl-5 rounded-md border-solid border-white border-opacity-50">
                      <div className="text-white text-center text-base leading-6 opacity-70 self-center w-[109px] my-auto">
                        Email address
                      </div>{" "}
                      <div className="justify-center items-start bg-orange-300 self-stretch flex w-[100px] max-w-full flex-col px-5 py-4 rounded-none">
                        <div className="text-neutral-900 text-center text-base font-medium leading-6 self-center">
                          Send
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="opacity-20 bg-white self-stretch w-full h-px mt-2.5 max-md:max-w-full" />{" "}
          <div className="text-white text-center text-lg font-medium leading-7 opacity-70 self-center w-[472px] max-w-full mt-7">
            Copyright 2023 DEVPREPAI. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
