import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex justify-center items-center pt-20 ">
      <SignUp />;
    </main>
  );
}
