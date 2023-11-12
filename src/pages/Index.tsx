import Card from "@/components/Base/Card";
import Loading from "@/components/Base/Loading";
import Pagination from "@/components/Base/Pagination";
import { LIMIT_DATA_URL } from "@/constant";
import useBusinessStore from "@/store/useBusinessStore";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

function Index() {
  const businessStore = useBusinessStore((state) => state);
  const [formData, setformData] = useState({
    location: "",
    open_now: false,
    keyword: "",
    term: "",
    latitude: 0,
    longitude: 0,
  });
  const [errorMessage, seterrorMessage] = useState("");

  function _handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const currentFormValue = formData;
    const keyField = e.target.name;
    const typeField = e.target.type;
    const valueField = e.target.value;
    const valueChecked = e.target.checked;

    Object.assign(currentFormValue, {
      [keyField]: typeField == "checkbox" ? valueChecked : valueField,
    });
    setformData(currentFormValue);
  }
  async function _handleSearch() {
    seterrorMessage("");
    try {
      await businessStore.searchData({
        latitude: formData.latitude,
        longitude: formData.longitude,
        limit: LIMIT_DATA_URL,
        location: formData.location,
        offset: 1,
        open_now: formData.open_now,
        term: formData.term,
      });
    } catch (error) {
      if (error instanceof Error) {
        seterrorMessage(error.message);
      }
    }
  }

  async function _handleSubmtiSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await _handleSearch();
  }
  return (
    <>
      <Helmet>
        <title>Business Tale</title>
      </Helmet>
      <div className="w-full">
        {/* HEADER */}
        <section id="header">
          <h1 className="text-4xl font-ud-1 text-center text-ud-white font-bold">
            BUSINESS TALE
          </h1>
          <h2 className="font-mono mt-2 text-ud-white text-center">
            Place for search business
          </h2>
        </section>

        {/* FORM */}
        <section id="search" className="flex  w-fit mx-auto mt-10">
          <form onSubmit={_handleSubmtiSearch}>
            <div className="flex gap-5">
              <input
                type="text"
                placeholder="Search Location"
                className="px-3 w-full py-1 placeholder:text-sm font-mono placeholder:text-ud-gray outline-ud-gray"
                name="location"
                required
                onChange={_handleChange}
              />
            </div>
            <div className="flex flex-col mt-2 gap-2">
              <p className="text-white font-mono mt-2 font-bold">Filter</p>

              {/* GROUP */}
              <div className="mt-1 flex-col flex gap-1">
                <label
                  htmlFor="keyword"
                  className="text-white font-ud-1 text-sm"
                >
                  Keyword
                </label>
                <input
                  type="text"
                  placeholder="Keyword"
                  className="px-3 py-1 placeholder:text-sm font-mono placeholder:text-ud-gray outline-ud-gray text-sm"
                  name="term"
                  onChange={_handleChange}
                />
              </div>
              <div className="flex gap-3">
                <div className="flex gap-2 ">
                  <input
                    onChange={_handleChange}
                    type="checkbox"
                    name="open_now"
                    id="opennow"
                    className="accent-white"
                  />
                  <label htmlFor="opennow" className="text-white font-mono">
                    Open Now
                  </label>
                </div>
                <div className="flex gap-2 ">
                  <input
                    type="checkbox"
                    name="location"
                    id="location"
                    className="accent-white"
                  />
                  <label htmlFor="location" className="text-white font-mono">
                    Current location
                  </label>
                </div>
              </div>
            </div>

            <button className="bg-white w-full py-1 px-2 mt-3 font-ud-2 text-xl">
              Search
            </button>
          </form>
        </section>

        {/* CARDLIST */}
        {!businessStore.loading &&
          errorMessage == "" &&
          businessStore.list.length > 0 && (
            <section id="card" className="mt-7">
              <h2 className="text-white text-2xl font-ud-1 font-bold">List</h2>

              <div className="mt-4">
                <div className="grid grid-cols-12 gap-4">
                  {businessStore.list.map((el) => (
                    <div className="col-span-12 md:col-span-4 auto">
                      <Card
                        key={el.id}
                        title={el.name}
                        address={el.location.display_address}
                        img={el.image_url}
                        is_closed={el.is_closed}
                        phone={el.display_phone}
                        rating={el.rating}
                        review_count={el.review_count}
                        transaction={el.transactions}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        {!businessStore.loading && errorMessage != "" && (
          <div className="w-full justify-center mt-24">
            <p className="text-xl font-mono text-white font-bold">
              {errorMessage}
            </p>
          </div>
        )}

        {businessStore.loading && (
          <div className="w-full h-full flex justify-center mt-24">
            <Loading />
          </div>
        )}

        {/* PAGINATION */}
        {businessStore.list.length > 0 && <Pagination />}
      </div>
    </>
  );
}

export default Index;
