import { SetStateAction } from "react";

export const streamData = async (
  data: ReadableStream<Uint8Array>,
  setState: React.Dispatch<SetStateAction<string>>
) => {
  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let code = "";

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);

    code += chunkValue;

    setState((prevCode) => prevCode + chunkValue);
  }
};
