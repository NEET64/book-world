import { Badge } from "./ui/badge";

const UserCard = ({ user }) => {
  return (
    <div className="border-2 border-gray-200 rounded-lg flex items-center flex-col p-6 w-full sm:w-1/3 md:w-1/4 lg:w-1/6 xl:58 fixed-height overflow-hidden">
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg"
        src={`https://api.multiavatar.com/${user.email}.svg`}
        alt="user"
      />
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {user.firstName} {user.lastName}
      </h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {user.email}
      </span>
      <Badge className="p-2 px-4 mt-2">{user.role}</Badge>
    </div>
  );
};
export default UserCard;
