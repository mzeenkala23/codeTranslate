"use client";

import { languages } from "../constants";

export const SelectLanguage = ({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (language: string) => void;
}) => {
  return (
    <select
      className="w-1/2 bg-white px-4 py-4 ml-3 rounded-lg  border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
    >
      {languages.map((language) => (
        <option key={language.value} value={language.value}>
          {language.label}
        </option>
      ))}
    </select>
  );
};
