import { CircleUserIcon } from "lucide-react";

import { useGetCurrentUser } from "../hooks/queries";

const ProfilePage = () => {
  const { data: userData } = useGetCurrentUser();

  return (
    <section className="max-w-4xl mx-auto mt-8 p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Profile</h2>
      </div>
      <div className="flex items-center gap-4 mb-8">
        <CircleUserIcon size={80} className="text-gray-700" />
        <div>
          <h3 className="text-xl font-bold">{userData?.data?.username}</h3>
          <p className="text-gray-600">{userData?.data?.email}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Username</h3>
          <p className="text-gray-700">{userData?.data?.username}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium">Email</h3>
          <p className="text-gray-700">{userData?.data?.email}</p>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
