"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="primary-gradient w-[150px] font-semibold font-sans text-white rounded-md hover:shadow-md hover:shadow-indigo-500/50"
      aria-disabled={pending}
    >
      {pending ? "Uploading..." : "Upload"}
    </Button>
  );
}
