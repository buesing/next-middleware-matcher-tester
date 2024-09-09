import React from "react";
import { pathToRegexp } from "path-to-regexp";

export default function Home() {
  const [value, setValue] = React.useState("");
  const [matcher, setMatcher] = React.useState("");
  let error = "";
  let regex;
  const lines = value.split("\n");
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
    <div className="py-24 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl mb-4">Next.js middleware matcher tester</h1>
      <p className="mb-8 text-lg">
        Tool to test your middleware matcher patterns
      </p>
      <form className="">
        <div className="mb-8">
          <label>
            <div className="mb-1">Matcher pattern</div>
            <textarea
              className="border border-gray-300 p-2 font-mono text-sm block w-full mb-1 rounded-sm"
              onChange={(e) => setMatcher(e.target.value)}
              value={matcher}
            />
          </label>
          {error && (
            <p className="text-red-500 text-sm" aria-live="polite">
              Invalid pattern: {error}
            </p>
          )}
        </div>
        <label htmlFor="text" className="pl-[102px] block mb-1">
          Paths to match
        </label>
        <div className="flex text-base">
          <div className="leading-normal p-2 w-24 text-right">
            {matches.map((match, i) => (
              <div
                key={i}
                className={`font-bold ${match ? "text-green-500" : "text-red-500"}`}
              >
                {match ? "Match" : "No match"}
              </div>
            ))}
          </div>

          <textarea
            className="border border-gray-300 p-2 leading-normal flex-grow rounded-sm"
            name="text"
            id="text"
            cols={30}
            rows={10}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          ></textarea>
        </div>
      </form>
    </div>
  );
}
