import React from "react";
import { Container } from "../Container";

export const Hero = () => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              Trustification
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              A community, vendor-neutral, thought-leadering, mostly
              informational collection of resources devoted to making Software
              Supply Chains easier to create, manage, consume and ultimately… to
              trust!
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href="https://trustification.dev"
                target="_blank"
                rel="noopener"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-orange-600 rounded-md "
              >
                Give it a try
              </a>
              <a
                href="https://matrix.to/#/#trustification:matrix.org"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-lg font-medium text-center text-gray-900  inline-flex border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 border-solid"
              >
                Chat with us
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <img
              src="img/hero.png"
              width="616"
              height="300"
              className={"object-cover"}
              alt="Hero"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Making Software Supply Chains easier to trust
          </div>

          <div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around">
            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <img
                src="img/chain.png"
                height="200"
                className={"object-cover"}
                alt="Hero"
                loading="eager"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
