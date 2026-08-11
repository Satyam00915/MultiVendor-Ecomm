import { auth, signOut } from "@/auth";
import EditRoleandPhone from "@/component/EditRoleandPhone";
import connectToDb from "@/lib/connectToDb";
import User from "@/models/User";
import { redirect } from "next/navigation";

export const logOut = async () => {
  "use server";
  await signOut({
    redirectTo: "/login",
  });
};

const Home = async () => {
  await connectToDb();
  const session = await auth();
  console.log(session);
  const user = await User.findById(session?.user?.id);
  if (!user) {
    redirect("/login");
  }
  const inComplete =
    !user.role || !user.phone || (!user.phone && user.role == "user");

  if (inComplete) {
    return <EditRoleandPhone />;
  }
  return (
    <form action={logOut}>
      <button type="submit">Sign Out</button>
    </form>
  );
};

export default Home;
