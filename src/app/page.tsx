import { auth } from "@/auth";
import EditRoleandPhone from "@/component/EditRoleandPhone";
import connectToDb from "@/lib/connectToDb";
import User from "@/models/User";
import { redirect } from "next/navigation";

const Home = async () => {
  await connectToDb();
  const session = await auth();
  const user = await User.findById(session?.user?.id);
  if (!user) {
    redirect("/login");
  }
  const inComplete =
    !user.role || !user.phone || (!user.phone && user.role == "user");

  if (inComplete) {
    return <EditRoleandPhone />;
  }
  return <div></div>;
};

export default Home;
