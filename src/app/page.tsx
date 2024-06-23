import AddPost from "./_components/AddPost";
import Feed from "./_components/Feed";
import LeftMenu from "./_components/LeftMenu";
import RightMenu from "./_components/RightMenu";

function HomePage() {
  return (
    <>
      <div className="h-full flex gap-6 py-3 px-3 lg:px-0">
        <div className="hidden xl:block w-[20%]">
          <LeftMenu type="home" />
        </div>
        <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-3">
          {/* <Stories /> */}
          <AddPost />
          <Feed />
        </div>
        <div className="hidden lg:block w-[30%]">
          <RightMenu />
        </div>
      </div>
    </>
  );
}

export default HomePage;
