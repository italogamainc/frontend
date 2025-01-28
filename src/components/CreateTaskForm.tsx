"use client";
import React, { useState } from "react";
import { ArrowLeft, Check, CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { API_URL } from "@/common/api";
import { colors } from "@/common/types";

const MAX_TITLE_LENGTH = 255;

export const CreateTaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; color?: string }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { title?: string; color?: string } = {};

    if (!title) {
      newErrors.title = "Title is required.";
    } else if (title.length > MAX_TITLE_LENGTH) {
      newErrors.title = `Title cannot exceed ${MAX_TITLE_LENGTH} characters.`;
    }

    if (!selectedColor) {
      newErrors.color = "Please select a color.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, color: selectedColor }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      router.push("/");
    } catch (error) {
      console.error("Error creating task:", error);
      setErrors({ title: "Failed to create task. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mt-10 px-4 flex flex-col gap-6"
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="text-white hover:text-secondary-400 flex items-center gap-2"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div>
        <label className="text-primary-400 text-sm font-bold mb-2 block">
          Title
        </label>
        <input
          type="text"
          placeholder="Ex. Brush your teeth"
          value={title}
          onChange={(e) => {
            if (e.target.value.length <= MAX_TITLE_LENGTH) {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: undefined }));
            }
          }}
          className="w-full px-4 py-2 rounded-md bg-[#262626] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4EA8DE]"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          {title.length}/{MAX_TITLE_LENGTH}
        </p>
      </div>

      <div className="pb-5">
        <label className="text-primary-400 text-sm font-bold mb-2 block">
          Color
        </label>
        <div className="flex gap-4">
          {colors.map((color) => (
            <button
              key={color.id}
              type="button"
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedColor === color.hex
                  ? selectedColor === "#FFFFFF"
                    ? "border-black border-4 shadow-lg"
                    : "border-white border-4 shadow-lg"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedColor(color.hex)}
            >
              {selectedColor === color.hex && (
                <span
                  className={`text-lg font-bold ${
                    selectedColor === "#FFFFFF" ? "text-black" : "text-white"
                  }`}
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
        {errors.color && (
          <p className="text-red-500 text-sm mt-1">{errors.color}</p>
        )}
      </div>

      <Button
        text={
          isSubmitting
            ? "Submitting..."
            : title && selectedColor
            ? "Save"
            : "Add Task"
        }
        endIcon={
          isSubmitting ? undefined : title && selectedColor ? Check : CirclePlus
        }
        variant="primary"
        size="sm"
        type="submit"
        textColor="text-white"
        iconColor="text-white"
        disabled={isSubmitting}
      />
    </form>
  );
};

export default CreateTaskForm;
