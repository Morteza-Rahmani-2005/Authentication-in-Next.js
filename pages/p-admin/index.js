import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import UserModel from "@/models/User";
import PageHeader from "@/components/PageHeader";

function PAdmin({ user }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <PageHeader
        title="Admin panel"
        description="Restricted area for administrators."
      />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm">
          <span className="inline-flex rounded-full bg-zinc-900 px-2.5 py-0.5 text-xs font-medium text-white">
            ADMIN
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900">
            Welcome, {user.firstname} {user.lastname}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            You have access to admin-only routes and settings.
          </p>
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
    "firstname lastname role"
  );

  if (user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default PAdmin;
