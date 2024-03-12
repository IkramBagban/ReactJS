const { useEffect, useState } = require("react");
const { fetchData } = require("../utils/api");

const useFetch = (endpoint, headers) => {
  const [dataState, setDataState] = useState({
    data: null,
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    const fetchApiData = async () => {
      let response;
      try {
        if (headers) {
          response = await fetchData(endpoint, headers);
        } else {
          response = await fetchData(endpoint);
        }

        console.log(response.data);
        if (response.status === 401) {
          localStorage.clear();
          return alert("Authorization Failed! Refresh the page and login");
          // throw new Error("Authorization Failed!");
        }

        if (response.status === 200) {
          setDataState({
            data: response.data.data,
            isLoading: false,
            isError: false,
          });
        } else {
          throw new Error("Error in API fetching");
        }
      } catch (err) {
        console.log(err);
        
        setDataState({
          data: null,
          isLoading: false,
          isError: true,
        });
      }
    };

    fetchApiData();
  }, [endpoint]);

  return [dataState.data, dataState.isLoading, dataState.isError];
};

export default useFetch;
