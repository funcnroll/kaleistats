import DashboardPage from "@/components/pages/DashboardPage";
import { getAllRatingsAndAverages } from "@/lib/getAllRatingsAndAverages";

async function Page() {
  const data = await getAllRatingsAndAverages();

  return <DashboardPage data={data} />;
}

export default Page;
