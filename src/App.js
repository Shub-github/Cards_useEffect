import React from "react";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
import { apiUrl, filterData } from "./data";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// spinner ka code hum Css loader generator se copy kiya hai
import Spinner from "./components/spinner";

const App = () => {
  // Api call function
  // async function jo eventloop me jata hai and response anne mai time hot hai to hum await lgate hai.

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  // category mei title ke basis pr cards alag alag aate hai vo hai.By-default ye pehla title vala value laiga.

  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try {
      let response = await fetch(apiUrl);
      // response nhi aya to await lgya and response ko json me convert kiya.
      // idr hum ek setState ka variable bnyegai jisme api ke value save karyegai.
      // output->
      let output = await response.json();
      setCourses(output.data);
    } catch (error) {
      // error hum toast ke through show karegai
      toast.error("Network problem!!");
    }
    setLoading(false);
  }

  // Iss function ko call bhi krna hai to we will use useEffect now.
  // useEffect sub render hone ke baad chalta hai, idr ye first render pr chalega bs.

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <div>
          <Filter
            filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div
          className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]"
        >
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <Cards courses={courses} category={category} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
