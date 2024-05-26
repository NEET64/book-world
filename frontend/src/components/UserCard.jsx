import { Badge } from "./ui/badge";

const UserCard = ({ user }) => {
  return (
    <div className="p-1 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:58 fixed-height overflow-hidden text-center">
      <div className="border-2 flex flex-col flex-1 p-6 items-center h-full">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={`https://api.multiavatar.com/${user.email}.svg`}
          alt="user"
        />
        <h5
          title={user.firstName + " " + user.lastName}
          className="w-full truncate mb-1 text-xl font-medium text-gray-900">
          {user.firstName} {user.lastName}
        </h5>
        <span
          title={user.email}
          className="w-full truncate text-sm text-gray-500">
          {user.email}
        </span>
        <Badge className="p-2 px-4 mt-2 bottom-0">{user.role}</Badge>
      </div>
    </div>
  );
};
export default UserCard;
