import { getAllRatings } from "@/lib/getAllRatings";
import DashboardPage from "@/components/pages/DashboardPage";

async function Page() {
  // Placeholder data for now works
  const data = await getAllRatings();

  console.log(data);
  return <DashboardPage data={data} />;
}

export default Page;
