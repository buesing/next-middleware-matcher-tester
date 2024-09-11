import React from "react";
import { pathToRegexp } from "path-to-regexp";

export default function Home() {
  const [value, setValue] = React.useState("");
  const [matcher, setMatcher] = React.useState("");
  let error = "";
  let regex;
  const lines = value.length > 0 ? value.split("\n") : [];
  try {
    regex = pathToRegexp(matcher);
  } catch (e) {
    console.error(e);
    error = (e as Error).message;
  }

  const matches = regex
    ? lines.map((line) => {
        try {
          return regex.test(line);
        } catch (e) {
          return false;
        }
      })
    : [];

  return (
    <div className="p-4 max-w-4xl mx-auto min-h-screen flex flex-col">
      <div className="flex-grow">
        <h1 className="text-4xl mb-4 mt-8">
          Next.js middleware matcher tester
        </h1>
        <p className="mb-8 text-lg">
          Tool to test your middleware matcher patterns
        </p>
        <form className="">
          <div className="mb-8">
            <label>
              <div className="mb-1">Matcher pattern</div>
              <textarea
                placeholder="/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
                className="border border-gray-300 p-2 font-mono text-sm block w-full mb-1 rounded-sm"
                onChange={(e) => setMatcher(e.target.value)}
                value={matcher}
              />
            </label>
            <p className="text-red-500 text-sm" aria-live="polite">
              {error ? "Invalid pattern: " : null} {error}
            </p>
          </div>
          <label htmlFor="text" className="block mb-1">
            Example Paths to match
          </label>
          <div className="relative mb-16">
            <textarea
              className="border border-gray-300 p-2 leading-normal w-full rounded-sm font-mono text-sm relative bg-transparent z-10"
              placeholder="/_next/static/chunk.js"
              name="text"
              id="text"
              cols={30}
              rows={10}
              onChange={(e) => setValue(e.target.value)}
              value={value}
            ></textarea>
            <h2 className="sr-only">Matches</h2>
            <div className="leading-normal p-2 text-sm font-mono absolute top-0 left-0">
              {matches.map((match, i) => (
                <div className="min-h-[1em]" aria-live="polite">
                  <span
                    key={i}
                    className={`text-transparent opacity-30 ${match ? "bg-green-500" : "bg-red-500"}`}
                  >
                    <span className="sr-only">
                      {match ? "Match" : "No match"}:
                    </span>{" "}
                    {lines[i] || <wbr />}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <a
          href="https://github.com/buesing/next-middleware-matcher-tester"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Source code
        </a>
      </div>
    </div>
  );
}
