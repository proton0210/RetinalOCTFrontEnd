import { auth } from "@clerk/nextjs";
import { UploadForm } from "./form";
import { redirect } from "next/navigation";
import Credits from "./credits";

export default async function Page() {
  const { userId } = auth();
  if (!userId) redirect("/");

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-lg font-sans">Upload Files to S3 Bucket</h1>
        <Credits ClerkID={userId}  />
        <UploadForm ClerkID={userId} />
      </div>
    </>
  );
}
