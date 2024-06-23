import Post from "./Post";

export default function Feed() {
  return (
    <div className="p-4 bg-white rounded-xl flex flex-col gap-10 shadow-sm">
      <Post />
    </div>
  );
}
