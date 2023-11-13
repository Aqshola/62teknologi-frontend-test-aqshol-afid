import Card from "@/components/Base/Card";
import Loading from "@/components/Base/Loading";
import Pagination from "@/components/Base/Pagination";
import { LIMIT_DATA_URL } from "@/constant";
import useBusinessStore from "@/store/useBusinessStore";
import { View_Business_Search_Request } from "@/types/business";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

type DataForm = {
  location: string;
  open_now: boolean;
  term: string;
  latitude: number;
  longitude: number;
};

function Index() {
  const isNavigateExist = navigator.geolocation;

  const businessStore = useBusinessStore((state) => state);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const queryFormData = {
    location: String(searchParams.get("location") || ""),
    open_now: Boolean(searchParams.get("open_now") || false),
    term: String(searchParams.get("term") || ""),
    latitude: Number(searchParams.get("latitude") || 0),
    longitude: Number(searchParams.get("longitude") || 0),
  };

  const [nearbyLocation, setnearbyLocation] = useState(
    Boolean(queryFormData.latitude && queryFormData.longitude)
  );
  const [formData, setformData] = useState<DataForm>({
    location: "",
    open_now: false,
    term: "",
    latitude: 0,
    longitude: 0,
  });
  const [errorMessage, seterrorMessage] = useState("");

  useEffect(() => {
    if (queryFormData.location) {
      _handleSearch({
        latitude: queryFormData.latitude,
        longitude: queryFormData.longitude,
        location: queryFormData.location,
        offset: currentPage,
        open_now: queryFormData.open_now,
        term: queryFormData.term,
      });
    }
  }, []);

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

  function _handleQueryUrl(paramObj: any) {
    const objReq: any = {};
    for (const key in paramObj) {
      if (Object.prototype.hasOwnProperty.call(paramObj, key)) {
        const element = paramObj[key];
        if (element) {
          objReq[key] = element;
        }
      }
    }

    setSearchParams(objReq);
  }

  function _handleChangeLocation() {
    if (nearbyLocation) {
      setformData({
        ...formData,
        latitude: 0,
        longitude: 0,
      });
      setnearbyLocation(false);
      return;
    }
    _handleLocation((latitude, longitude) => {
      setnearbyLocation(true);
      setformData({
        ...formData,
        location: "",
        longitude,
        latitude,
      });
    });
  }

  async function _handleSearch(props: View_Business_Search_Request) {
    seterrorMessage("");

    try {
      await businessStore.searchData({
        latitude: props.latitude,
        longitude: props.longitude,
        limit: LIMIT_DATA_URL,
        location: props.location,
        offset: props.offset,
        open_now: props.open_now,
        term: props.term,
      });
    } catch (error) {
      if (error instanceof Error) {
        seterrorMessage(error.message);
      }
    }
  }

  async function _handleSubmtiSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    _handleQueryUrl(formData);

    await _handleSearch({
      latitude: formData.latitude,
      longitude: formData.longitude,
      location: formData.location,
      offset: 1,
      open_now: formData.open_now,
      term: formData.term,
    });
  }

  async function _handleChangePage(num: number) {
    let additionalReq: any = { page: num };

    additionalReq = {
      ...queryFormData,
      ...additionalReq,
    };

    _handleSearch({
      latitude: queryFormData.latitude,
      longitude: queryFormData.longitude,
      location: queryFormData.location,
      offset: num,
      open_now: queryFormData.open_now,
      term: queryFormData.term,
    });

    _handleQueryUrl(additionalReq);
  }

  async function _handleLocation(
    callback: (latitude: number, longitude: number) => void
  ) {
    navigator.geolocation.getCurrentPosition(
      (coordinate) => {
        callback(coordinate.coords.latitude, coordinate.coords.longitude);
      },
      (err) => console.log(err)
    );
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
            {!nearbyLocation && (
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
            )}
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
                {isNavigateExist && (
                  <div className="flex gap-2 ">
                    <input
                      type="checkbox"
                      name="location"
                      id="location"
                      className="accent-white"
                      defaultChecked={nearbyLocation}
                      onChange={_handleChangeLocation}
                    />
                    <label htmlFor="location" className="text-white font-mono">
                      Current location
                    </label>
                  </div>
                )}
              </div>
            </div>

            <button className="bg-white w-full py-1 px-2 mt-3 font-ud-2 text-xl">
              Search
            </button>
          </form>
        </section>

        {(queryFormData.location || formData.location) && !nearbyLocation && (
          <div>
            <h3 className="mt-5 font-ud-1 font-bold capitalize text-center text-5xl text-ud-orange">
              - {queryFormData.location || formData.location} -
            </h3>
          </div>
        )}
        {/* CARDLIST */}
        {!businessStore.loading &&
          errorMessage == "" &&
          businessStore.list.length > 0 && (
            <section id="card" className="mt-5">
              <h2 className="text-white text-2xl font-ud-1 font-bold">List</h2>

              <div className="mt-4">
                <div className="grid grid-cols-12 gap-4">
                  {businessStore.list.map((el, idx) => (
                    <div
                      className="col-span-12 md:col-span-4 auto"
                      key={el.id + idx}
                    >
                      <Card
                        key={el.id + idx}
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

        {!businessStore.loading &&
          businessStore.list.length == 0 &&
          errorMessage == "" && (
            <div className="w-full justify-center mt-24">
              <p className="text-xl font-mono text-white font-bold text-center">
                Business Not Found
              </p>
            </div>
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
        {businessStore.list.length > 0 && (
          <Pagination
            handleChangePage={_handleChangePage}
            current={currentPage}
            limit={5}
            total={
              businessStore.totalPage > 1000
                ? 1000 - LIMIT_DATA_URL
                : businessStore.totalPage
            }
          />
        )}
      </div>
    </>
  );
}

export default Index;
