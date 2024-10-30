import PostShimmer from "../component/Shimmers/PostShimmer";
import Productcart from "../component/Homepage/Productcart";
import Profilecart from "../component/Homepage/Profilecart";
import Topdesigner from "../component/Homepage/Topdesigner";
import Designershimmer from "../component/Shimmers/Designershimmer";
import { getHomepage } from "../Utility/QueryFn";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Homepage"],
    queryFn: getHomepage,
  });
  return (
    <>
      <div className="container  grid grid-cols-7 h-full">
        {isLoading && (
          <div className="scrollbarShimmer overflow-y-scroll col-span-7 lg:col-span-5 ">
            <PostShimmer />
          </div>
        )}
        {error && <div>{error}</div>}
        {data && (
          <div className=" col-span-7 lg:col-span-5  ">
            {data.posts.map((post, id) => (
              <div
                className="flex flex-col relative items-center   justify-center  "
                key={id}
              >
                <Profilecart data={post.referid} user={data.user} size={96} />
                <Productcart post={post} user={data.user} />
              </div>
            ))}
          </div>
        )}

        <div className=" pl-5 lg:block hidden col-span-2 min-w-fit px-2">
          <div className="fixed">
            <h1 className="text-[joan] text-lg">Top Designers</h1>
            {isLoading && (
              <div>
                <Designershimmer />{" "}
              </div>
            )}
            {data && (
              <div className="  ">
                {data.designer.map((post, id) => (
                  <div className="flex relative" key={id}>
                    <Topdesigner data={post} user={data.user} size={44} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
