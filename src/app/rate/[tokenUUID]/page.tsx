import RatingFormPage from "@/components/forms/RatingFormPage";
import { isTokenValid } from "@/lib/isTokenValid";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ tokenUUID: string }>;
};

async function Page({ params }: Props) {
  const { tokenUUID } = await params;

  if (!(await isTokenValid(tokenUUID))) redirect("/forbidden");

  return <RatingFormPage tokenUUID={tokenUUID} />;
}

export default Page;
