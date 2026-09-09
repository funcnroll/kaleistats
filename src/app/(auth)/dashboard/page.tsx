import { getAllRatings } from "@/lib/getAllRatings";
import DashboardPage from "@/components/pages/DashboardPage";

async function Page() {
  const data = await getAllRatings();

  return <DashboardPage data={data} />;
}

export default Page;
