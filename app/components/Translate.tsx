"use client";

import { streamData } from "@/utils/streamData";
import React from "react";
import { editorConfig, languages } from "../constants";
import { TEditorInstance } from "../types";
import { Button } from "./Button";
import { EditorBlock } from "./EditorBlock";
import { SelectLanguage } from "./SelectLanguage";

export const Translate = () => {
  const [inputLanguage, setInputLanguage] = React.useState(languages[0].value);
  const [outputLanguage, setOutLanguage] = React.useState(languages[3].value);
  const [translatedCode, setTranslatedCode] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");

  const editorRef = React.useRef<null | TEditorInstance>(null);

  const handleEditorDidMount = (editor: TEditorInstance) => {
    // We grab the editor ref so we can store it for further usage
    editorRef.current = editor;
  };

  const handleTranslate = async () => {
    const codeToTranslate = editorRef.current?.getValue();
    if (!codeToTranslate) {
      alert("Enter code to be translated");
      return;
    }

    if (!apiKey) {
      alert("Enter API key");
      return;
    }

    setTranslatedCode("");
    const response = await fetch("/api/translate", {
      method: "POST",
      body: JSON.stringify({
        inputCode: codeToTranslate,
        inputLanguage,
        outputLanguage,
        apiKey,
      }),
    });

    const data = response.body;
    if (!data) return;

    await streamData(data, setTranslatedCode);
  };

  const handleInputLanguageSelect = (language: string) => {
    setInputLanguage(language);
    if (!editorRef?.current) return;
    editorRef.current.setValue("");
  };

  return (
    <div className="flex-col flex w-full max-w-[1200px] flex-1 justify-center">
      <input
        type="password"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="OpenAI API Key"
        onChange={(e) => setApiKey(e.target.value)}
        required
      />
      <div className="flex basis-3/5 relative gap-2 min-[840px]:flex-row flex-col">
        <div className=" flex flex-col flex-1 bg-gray-100 rounded-xl">
          <div className="px-4 py-5 border-b border-gray-200">
            From:
            <SelectLanguage
              language={inputLanguage}
              setLanguage={handleInputLanguageSelect}
            />
          </div>
          <EditorBlock
            language={inputLanguage}
            editorConfig={editorConfig}
            onMountCallback={handleEditorDidMount}
          />
        </div>
        <div className="flex flex-col flex-1 bg-gray-100 rounded-xl">
          <div className="px-4 py-5 border-b border-gray-200">
            To:
            <SelectLanguage
              language={outputLanguage}
              setLanguage={setOutLanguage}
            />
          </div>
          <EditorBlock
            language={outputLanguage}
            translatedCode={translatedCode}
            editorConfig={{ ...editorConfig, readOnly: true }}
          />
        </div>
        <Button onClick={handleTranslate}>Translate</Button>
      </div>
    </div>
  );
};
