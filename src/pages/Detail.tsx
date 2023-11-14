import "react-slideshow-image/dist/styles.css";
import MapGL from "react-map-gl";
import Loading from "@/components/Base/Loading";
import useBusinessStore from "@/store/useBusinessStore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { LIMIT_DATA_URL, MAP_KEY } from "@/constant";
import { Helmet } from "react-helmet-async";
import Pagination from "@/components/Base/Pagination";

function Detail() {
  const { id } = useParams();
  const businessStore = useBusinessStore((state) => state);
  const [loadingReview, setloadingReview] = useState(false);
  const [offsetReview, setoffsetReview] = useState(1);

  async function _handlePageNasabah(num: number) {
    setoffsetReview(num);
    setloadingReview(true);
    await businessStore.reviewsPage(id || "", LIMIT_DATA_URL, num);
    setloadingReview(false);
  }

  useEffect(() => {
    const asyncFunction = async () => {
      await businessStore.detailData(id || "");

      console.log(businessStore.detail, "sas");
    };

    asyncFunction();
  }, []);

  if (!businessStore.loading && !businessStore.detail) {
    return (
      <div className="flex h-full w-full justify-center items-center text-center">
        <h1 className=" font-mono text-3xl text-ud-red">Detail Not Found</h1>
      </div>
    );
  }

  if (!businessStore.loading && businessStore.detail) {
    return (
      <>
        <Helmet>
          <title>Business {businessStore.detail.name}</title>
        </Helmet>
        <div className="flex flex-col mx-auto">
          <h1 className="text-4xl text-center text-ud-white font-ud-2">
            {businessStore.detail.name}
          </h1>
          <div className="font-mono text-white text-center">
            {businessStore.detail?.location.display_address}
          </div>
          <div className="w-[300px] md:w-[500px]  mx-auto mt-10 border border-white border-dashed p-2">
            <Slide
              autoplay={false}
              transitionDuration={300}
              prevArrow={
                <button>
                  <svg
                    className="w-5 h-5"
                    width="63"
                    height="110"
                    viewBox="0 0 63 110"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M62.7 0V15.675H47.025V0H62.7ZM31.35 31.35V15.675H47.025V31.35H31.35ZM15.675 47.025V31.35H31.35V47.025H15.675ZM15.675 62.7H0V47.025H15.675V62.7ZM31.35 78.375V62.7H15.675V78.375H31.35ZM31.35 78.375H47.025V94.05H31.35V78.375ZM62.7 109.725V94.05H47.025V109.725H62.7Z"
                      fill="white"
                    />
                  </svg>
                </button>
              }
              nextArrow={
                <button>
                  <svg
                    className="w-5 h-5"
                    width="63"
                    height="110"
                    viewBox="0 0 63 110"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0V15.675H15.675V0H0ZM31.35 31.35V15.675H15.675V31.35H31.35ZM47.025 47.025V31.35H31.35V47.025H47.025ZM47.025 62.7H62.7V47.025H47.025V62.7ZM31.35 78.375V62.7H47.025V78.375H31.35ZM31.35 78.375H15.675V94.05H31.35V78.375ZM0 109.725V94.05H15.675V109.725H0Z"
                      fill="white"
                    />
                  </svg>
                </button>
              }
            >
              {businessStore.detail.photos.map((el) => (
                <div className="each-slide-effect" key={el}>
                  <div
                    style={{
                      backgroundImage: `url(${el})`,
                    }}
                  ></div>
                </div>
              ))}
            </Slide>
          </div>

          <div id="summary" className="flex gap-5 mt-2 mx-auto items-end">
            <div className="flex items-end text-white gap-2">
              <p>Rate</p>
              <p className="font-bold text-ud-orange">
                {businessStore.detail?.rating}
              </p>
            </div>
            {businessStore.detail?.is_closed && (
              <div className="text-xs font-mono bg-ud-red w-fit p-1 text-white mt-1">
                Closed
              </div>
            )}

            {!businessStore.detail?.is_closed && (
              <div className="text-xs font-mono bg-ud-lightgreen w-fit p-1 text-white mt-1">
                OPEN
              </div>
            )}

            <p className="font-medium text-white font-mono  ">
              {businessStore.detail?.display_phone}
            </p>
            <p className="font-medium text-white font-mono  ">
              {businessStore.detail?.transactions.join(", ")}
            </p>
          </div>

          <div className="mx-auto">
            <div className="mt-2 w-[300px] md:w-[500px]  h-[300px] overflow-hidden">
              <MapGL
                reuseMaps={true}
                optimizeForTerrain={true}
                mapboxAccessToken={MAP_KEY}
                initialViewState={{
                  longitude: businessStore.detail.coordinates.longitude,
                  latitude: businessStore.detail.coordinates.latitude,
                  zoom: 15,
                }}
                attributionControl={false}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></MapGL>
            </div>

            <div className="mt-2 flex justify-center">
              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${businessStore.detail.coordinates.latitude},${businessStore.detail.coordinates.longitude}`}
                target="_blank"
                rel="norefereer noopener"
                className="px-2 py-1 bg-ud-blue font-ud-2 text-white"
              >
                See on Gmaps
              </Link>
            </div>
          </div>

          <div className="mt-5 mx-auto" id="review">
            <h4 className="text-white font-semibold font-mono text-2xl text-center mb-2">
              Reviews
            </h4>

            {loadingReview && (
              <div className="mx-auto flex justify-center">
                <Loading />
              </div>
            )}
            {!loadingReview && (
              <div className="flex flex-col gap-2 ">
                {businessStore.detail.reviews.map((el) => (
                  <div className="flex flex-col text-white border  border-dotted p-1">
                    <p className="font-ud-1 text-sm font-bold">
                      {el.user.name}{" "}
                    </p>
                    <p className="text-ud-orange font-mono text-xs">
                      Rating {el.rating}
                    </p>
                    <p className="font-mono text-xs">{el.text}</p>
                  </div>
                ))}
              </div>
            )}

            <Pagination
              handleChangePage={_handlePageNasabah}
              limit={5}
              total={businessStore.detail.review_count}
              current={offsetReview}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex justify-center w-full">
      <Loading />;
    </div>
  );
}

export default Detail;
