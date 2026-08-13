import { auth, signOut } from "@/auth";
import AdminDashboard from "@/component/Admin/AdminDashboard";
import EditRoleandPhone from "@/component/EditRoleandPhone";
import Navbar from "@/component/Navbar";
import UserDashboard from "@/component/User/UserDashboard";
import VendorDashboard from "@/component/Vendor/VendorDashboard";
import connectToDb from "@/lib/connectToDb";
import User from "@/models/User";
import { redirect } from "next/navigation";

const Home = async () => {
  await connectToDb();
  const session = await auth();
  console.log(session);
  let user = await User.findById(session?.user?.id);
  if (!user) {
    redirect("/login");
  }
  const inComplete =
    !user.role || !user.phone || (!user.phone && user.role == "user");

  if (inComplete) {
    return <EditRoleandPhone />;
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-linear-to-tr from-slate-950 via-slate-900 to-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <Navbar user={user} />
      {user?.role === "user" ? (
        <UserDashboard />
      ) : user?.role === "vendor" ? (
        <VendorDashboard />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default Home;
