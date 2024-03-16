import { auth } from "@clerk/nextjs";
import { UploadForm } from "./form";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  return (
    <>
      <h1>Upload Files to S3 Bucket</h1>
      <UploadForm ClerkID={userId} />
    </>
  );
}
