import { Translate } from "./components/Translate";

export default function Home() {
  return (
    <main>
      <div className="flex min-h-screen h-full flex-col m-auto sm:p-5 p-4 items-center ">
        <Translate />
      </div>
    </main>
  );
}
