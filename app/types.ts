import { OnMount } from "@monaco-editor/react";

export interface ILanguages {
  value: string;
  label: String;
}
export type TEditorInstance = Parameters<OnMount>[0];
