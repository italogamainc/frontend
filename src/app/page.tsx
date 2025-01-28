"use client";
import Image from "next/image";
import Button from "@/components/Button";
import RocketSVG from "../../public/rocket.svg";
import { CirclePlus } from "lucide-react";
import { TaskComponent } from "@/components/TaskComponent";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-[#1A1A1A] min-h-screen font-[family-name:var(--font-geist-sans)] relative">
      <div className="bg-[#0D0D0D] w-full flex flex-col items-center h-[200px] justify-center">
        <div className="text-center flex flex-row items-center gap-3">
          <Image src={RocketSVG} alt="Rocket Icon" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent">
            Todo App
          </h1>
        </div>
      </div>

      <div className="absolute inset-x-0 top-[175px] flex justify-center">
        <div className="w-full max-w-2xl px-4">
          <Button
            text="Create Task"
            endIcon={CirclePlus}
            variant="primary"
            size="sm"
            textColor="text-white"
            iconColor="text-white"
            onClick={() => router.push("/create")}
          />
        </div>
      </div>

      <main className="flex flex-col items-center sm:items-start gap-8 px-4 py-10 mt-10">
        <TaskComponent />
      </main>
    </div>
  );
}
