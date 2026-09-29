import ProfileCard from "./ProfileCard";

const Profile = () => {
  return (
    <>
      <div className="bg-[#0f172a] h-[20%] p-6 flex items-center justify-between border-b border-slate-800">
        <div>
          <p className="text-2xl font-bold text-white">Profile</p>
          <p className="text-sm text-slate-400 mt-1">
            Manage your settings
          </p>
        </div>
      </div>

      <ProfileCard />
    </>
  );
};

export default Profile;