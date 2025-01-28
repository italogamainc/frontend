"use client";
import React, { useEffect, useState } from "react";
import { CircleCheck, Trash2, Circle } from "lucide-react";
import Image from "next/image";
import DocumentSvg from "../../public/document.svg";
import { API_URL } from "@/common/api";
import ConfirmationModal from "./ConfirmationModal";
import { useRouter } from "next/navigation";
import { Task } from "@/common/types";

export const TaskComponent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleCompletion = async (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle completion");
      }

      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    if (!taskToDelete) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${taskToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((prev) => prev.filter((task) => task.id !== taskToDelete.id));
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTaskToDelete(null);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-bold text-primary-400 flex items-center gap-2">
          Tasks{" "}
          <span className="bg-[#333333] text-white text-xs font-bold px-2 py-1 rounded-full">
            {totalTasks}
          </span>
        </h2>
        <h2 className="text-sm font-bold text-[#5E60CE] flex items-center gap-2">
          Completed{" "}
          <span className="bg-[#333333] text-white text-xs font-bold px-2 py-1 rounded-full">
            {completedTasks} of {totalTasks}
          </span>
        </h2>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <p className="text-center text-gray-400">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-400 items-center pt-16 flex flex-col gap-4 border-t-2 border-[#333333] rounded-lg">
            <Image src={DocumentSvg} alt="Document Icon" />
            <p className="text-[#808080] text-base font-bold">
              You dont have any tasks registered yet.
            </p>
            <p className="text-[#808080] text-base">
              Create tasks and organize your to-do items.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between px-4 py-3 rounded-md ${
                task.completed
                  ? "bg-[#1E1E1E] text-gray-500 line-through"
                  : "bg-[#262626] text-white"
              }`}
            >
              <div className="flex items-center gap-3 flex-1 overflow-hidden">
                <button
                  onClick={() => toggleCompletion(task.id)}
                  className="flex items-center justify-center flex-shrink-0"
                >
                  {task.completed ? (
                    <CircleCheck className="text-secondary-500 h-5 w-5" />
                  ) : (
                    <Circle className="text-[#4EA8DE] h-5 w-5" />
                  )}
                </button>
                <p
                  className="text-sm truncate overflow-hidden text-ellipsis cursor-pointer"
                  style={{ color: task.completed ? "#808080" : task.color }}
                  title={task.title}
                  onClick={() => router.push(`/edit/${task.id}`)}
                >
                  {task.title}
                </p>
              </div>
              <button
                onClick={() => openDeleteModal(task)}
                className="text-gray-500 hover:text-red-500 flex-shrink-0"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))
        )}
      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete the task: "${
          taskToDelete?.title || ""
        }"?`}
      />
    </div>
  );
};
