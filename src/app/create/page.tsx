import Image from "next/image";
import RocketSVG from "../../../public/rocket.svg";
import CreateTaskForm from "@/components/CreateTaskForm";

export default function CreateTaskPage() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
      <div className="bg-[#0D0D0D] w-full flex items-center h-[200px] justify-center">
        <div className="text-center flex flex-row items-center gap-3">
          <Image src={RocketSVG} alt="Rocket Icon" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4EA8DE] to-[#5E60CE] bg-clip-text text-transparent">
            Todo App
          </h1>
        </div>
      </div>
      <CreateTaskForm />
    </div>
  );
}
