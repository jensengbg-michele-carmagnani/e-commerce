import Modal from "@/components/ui/modal";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main>
      <SignUp />
    </main>
  );
}
