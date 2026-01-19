import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="pt-5 pl-5 mt-10 text-[#9a6c4c]">
        <Link href="/auth">
          <button className="className= flex items-center text-l font-medium hover:underline mb-4">
            <Play /> back
          </button>
        </Link>
      </div>
    </div>
  );
}
