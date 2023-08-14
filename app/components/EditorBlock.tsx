import { Editor } from "@monaco-editor/react";
import { TEditorInstance } from "../types";

interface IEditorBlockProps {
  language: string;
  editorConfig: Record<string, any>;
  onMountCallback?: (editor: TEditorInstance) => void;
  translatedCode?: string;
}

export const EditorBlock = ({
  language,
  translatedCode,
  editorConfig,
  onMountCallback,
}: IEditorBlockProps) => {
  return (
    <div className="px-2 flex-1 [&>section]:p-2">
      <Editor
        height="450px"
        width="100%"
        language={language}
        value={translatedCode}
        options={editorConfig}
        onMount={onMountCallback && onMountCallback}
      />
    </div>
  );
};
