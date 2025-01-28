import Image from "next/image";
import RocketSVG from "../../../../public/rocket.svg";
import EditTask from "@/components/EditTask";
import { API_URL } from "@/common/api";
import { Task } from "@/common/types";

// Fetch the task on the server
async function fetchTask(taskId: string): Promise<Task | null> {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch task");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching task:", error);
    return null;
  }
}

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;

  const task = await fetchTask(taskId);

  if (!task) {
    return (
      <div className="bg-[#1A1A1A] min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center">
        <h1 className="text-white text-2xl">Task not found</h1>
      </div>
    );
  }

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

      <EditTask task={task} />
    </div>
  );
}
