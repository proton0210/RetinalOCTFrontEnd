"use client";

import { useFormState } from "react-dom";
import { uploadFileWrapper } from "@/lib/actions/image.action";
import { SubmitButton } from "./submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

type uploadFormProps = {
  ClerkID: string;
};
const initialState = { status: "", message: "" };

export function UploadForm({ ClerkID }: uploadFormProps) {
  const [state, formAction] = useFormState(uploadFileWrapper, initialState);

  return (
    <div className="form-wrapper">
      <form
        action={formAction}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          formData.append("file", e.currentTarget.file.files![0]);
          formAction({ formData, ClerkID });
        }}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5 font-sans">
          <Label htmlFor="file">File</Label>
          <Input type="file" id="file" name="file" accept="images/*" />
        </div>
        <div className="mt-4">
          <SubmitButton />
        </div>
      </form>
      {state?.status && (
        <div className={`state-message ${state?.status}`}>{state?.message}</div>
      )}
    </div>
  );
}
