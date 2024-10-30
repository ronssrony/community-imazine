import Productlist from "../component/Product/Productlist";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getData } from "../Utility/QueryFn";

function Allproducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Allproducts"],
    queryFn: getData,
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10,
  });

  return (
    <div className="w-full grid scrollbar h-full  overflow-y-scroll">
      {isLoading && (
        <div className="loading flex w-full h-4/6 justify-center items-center">
          <div className="w-10 h-10 rounded-3xl border-4 border-red-400 stroke-pink-500"></div>
        </div>
      )}
      <div className="">
        {data && <Productlist products={data} title="All Products" />}
      </div>
    </div>
  );
}

export default Allproducts;
