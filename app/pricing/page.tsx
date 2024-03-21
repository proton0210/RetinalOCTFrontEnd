import Pricing from "@/components/Pricing";
import { auth } from "@clerk/nextjs";

const page = async () => {
  const { userId } = auth();
  if (!userId) return null;

  return <Pricing clerkId={userId} />;
};
export default page;
