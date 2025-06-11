import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AgriLinkGradient = {
  baseColor: "#e1e4e8", 
  highlightColor: "#f3f4f6", 
};

export const PostSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center">
            <Skeleton
              height={50}
              width={50}
              circle
              className="mr-4"
              {...AgriLinkGradient}
            />
            <div className="flex-1">
              <Skeleton height={15} width={200} className="mb-2" {...AgriLinkGradient} />
              <Skeleton height={10} width={100} {...AgriLinkGradient} />
            </div>
          </div>
          <Skeleton height={200} className="my-4 rounded-md" {...AgriLinkGradient} />
          <Skeleton height={20} width={"80%"} className="mb-2" {...AgriLinkGradient} />
          <Skeleton height={20} width={"60%"} {...AgriLinkGradient} />
        </div>
      ))}
    </div>
  );
};

export const StatusSkeleton = () => {
  return (
    <div className="flex overflow-x-auto space-x-4 p-4 bg-white rounded-lg shadow-md mb-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center">
          <Skeleton
            height={80}
            width={80}
            circle
            className="mb-2"
            {...AgriLinkGradient}
          />
          <Skeleton height={10} width={60} {...AgriLinkGradient} />
        </div>
      ))}
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
      <Skeleton
        height={100}
        width={100}
        circle
        className="mx-auto mb-4"
        {...AgriLinkGradient}
      />
      <Skeleton height={20} width={200} className="mx-auto mb-2" {...AgriLinkGradient} />
      <Skeleton height={15} width={250} className="mx-auto mb-4" {...AgriLinkGradient} />
      <Skeleton height={30} width={"80%"} className="mx-auto" {...AgriLinkGradient} />
    </div>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center mb-4">
          <Skeleton
            height={40}
            width={40}
            circle
            className="mr-4"
            {...AgriLinkGradient}
          />
          <div className="flex-1">
            <Skeleton height={15} width={200} className="mb-2" {...AgriLinkGradient} />
            <Skeleton height={10} width={150} {...AgriLinkGradient} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const LandListingSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <Skeleton height={200} width={"100%"} className="mb-4 rounded-md" {...AgriLinkGradient} />
          <Skeleton height={20} width={"80%"} className="mb-2" {...AgriLinkGradient} />
          <Skeleton height={15} width={"60%"} className="mb-2" {...AgriLinkGradient} />
          <Skeleton height={15} width={"90%"} {...AgriLinkGradient} />
        </div>
      ))}
    </div>
  );
};

export const UserListSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center mb-4">
          <Skeleton
            height={50}
            width={50}
            circle
            className="mr-4"
            {...AgriLinkGradient}
          />
          <Skeleton height={15} width={200} {...AgriLinkGradient} />
        </div>
      ))}
    </div>
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <Skeleton height={150} width={"100%"} className="mb-4 rounded-md" {...AgriLinkGradient} />
          <Skeleton height={20} width={"80%"} className="mb-2" {...AgriLinkGradient} />
          <Skeleton height={15} width={"60%"} className="mb-2" {...AgriLinkGradient} />
          <Skeleton height={15} width={"90%"} {...AgriLinkGradient} />
        </div>
      ))}
    </div>
  );
};

export const VideoSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <Skeleton height={200} width={"100%"} className="mb-4 rounded-md" {...AgriLinkGradient} />
          <Skeleton height={20} width={"80%"} className="mb-2" {...AgriLinkGradient} />
          <Skeleton height={15} width={"60%"} {...AgriLinkGradient} />
        </div>
      ))}
    </div>
  );
};

export const SidebarSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center mb-4">
          <Skeleton
            height={30}
            width={30}
            circle
            className="mr-4"
            {...AgriLinkGradient}
          />
          <Skeleton height={15} width={150} {...AgriLinkGradient} />
        </div>
      ))}
    </div>
  );
};

export const SearchResultSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center mb-4">
          <Skeleton
            height={50}
            width={50}
            circle
            className="mr-4"
            {...AgriLinkGradient}
          />
          <div className="flex-1">
            <Skeleton height={15} width={200} className="mb-2" {...AgriLinkGradient} />
            <Skeleton height={10} width={150} {...AgriLinkGradient} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const NotificationSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center mb-4">
          <Skeleton
            height={40}
            width={40}
            circle
            className="mr-4"
            {...AgriLinkGradient}
          />
          <div className="flex-1">
            <Skeleton height={15} width={250} className="mb-2" {...AgriLinkGradient} />
            <Skeleton height={10} width={150} {...AgriLinkGradient} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const CommentSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center mb-4">
          <Skeleton
            height={40}
            width={40}
            circle
            className="mr-4"
            {...AgriLinkGradient}
          />
          <div className="flex-1">
            <Skeleton height={10} width={180} className="mb-2" {...AgriLinkGradient} />
            <Skeleton height={10} width={120} {...AgriLinkGradient} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const JobListingSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <Skeleton height={20} width={"80%"} className="mb-2" {...AgriLinkGradient} />
          <Skeleton height={15} width={"60%"} className="mb-2" {...AgriLinkGradient} />
          <Skeleton height={15} width={"90%"} className="mb-2" {...AgriLinkGradient} />
          <Skeleton height={20} width={"30%"} {...AgriLinkGradient} />
        </div>
      ))}
    </div>
  );
};

export const GroupChatSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center mb-4">
          <Skeleton
            height={40}
            width={40}
            circle
            className="mr-4"
            {...AgriLinkGradient}
          />
          <div className="flex-1">
            <Skeleton height={15} width={200} className="mb-2" {...AgriLinkGradient} />
            <Skeleton height={10} width={150} {...AgriLinkGradient} />
          </div>
        </div>
      ))}
    </div>
  );
};