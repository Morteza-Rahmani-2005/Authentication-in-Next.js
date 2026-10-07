import { verifyToken } from "@/utils/auth";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";
import PageHeader from "@/components/PageHeader";

function Dashboard({ user }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <PageHeader
        title="Dashboard"
        description="Your personal workspace."
      />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-zinc-500">Signed in as</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
            {user.firstname} {user.lastname}
          </h2>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  connectToDB();

  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }

  const isValidToken = await verifyToken(token);

  if (!isValidToken) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }

  const user = await UserModel.findOne(
    { email: isValidToken.email },
    "firstname lastname"
  );

  console.log(user);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default Dashboard;
