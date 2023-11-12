import { Helmet } from "react-helmet-async";

function Index() {
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
          <form>
            <div className="flex gap-5">
              <input
                type="text"
                placeholder="Search Location"
                className="px-3 w-full py-1 placeholder:text-sm font-mono placeholder:text-ud-gray outline-ud-gray"
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
                />
              </div>
              <div className="flex gap-3">
                <div className="flex gap-2 ">
                  <input
                    type="checkbox"
                    name="opennow"
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
        <section id="card" className="mt-7">
          <h2 className="text-white text-2xl font-ud-1 font-bold">List</h2>

          <div className="mt-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4">
                <div className="w-full bg-ud-white flex ">
                  <div className="flex-[1]">
                    <img
                      className="flex w-full h-full object-cover"
                      src="https://s3-media1.fl.yelpcdn.com/bphoto/91RtGGwbZYMurzxGHAbhzw/o.jpg"
                      alt="restaurant"
                    />
                  </div>
                  <div className="flex flex-col flex-[2] p-2 gap-1">
                    <h3 className="font-ud-2 text-2xl font-medium">
                      Best Bagel & Coffee
                    </h3>
                    <p className="text-xs font-mono">
                      11 Madison Ave, New York, NY 10010
                    </p>
                    <div className="text-xs font-mono bg-ud-red w-fit p-1 text-white mt-1">
                      Closed
                    </div>
                    <div className="flex">
                      <p className="text-sm font-bold font-mono text-ud-orange">
                        4.5
                      </p>
                      <p className="text-sm font-mono text-ud-gray">
                        (199 reviews)
                      </p>
                    </div>
                    <div className="text-sm mt-2 font-bold font-mono text-ud-lightgreen">
                      Deliver, Takeout
                    </div>
                  </div>
                  {/* <h3>Best Bagel & Coffee</h3>
            <div className="flex gap-3">
              <p>225 W 35th St ew York, NY 10001</p>
              <p>4.5</p>
            </div>
            <div>
              <img
                src="https://s3-media1.fl.yelpcdn.com/bphoto/91RtGGwbZYMurzxGHAbhzw/o.jpg"
                alt="restaurant"
              />
            </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PAGINATION */}
        <div className="flex text-white gap-2 mt-10 justify-center font-ud-2 text-2xl items-center">
          <button>
            <svg
              width="95"
              height="110"
              viewBox="0 0 95 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                d="M62.7 109.725L62.7 94.05L47.025 94.05L47.025 109.725L62.7 109.725ZM31.35 78.375L31.35 94.05L47.025 94.05L47.025 78.375L31.35 78.375ZM15.675 62.7L15.675 78.375L31.35 78.375L31.35 62.7L15.675 62.7ZM15.675 47.025L7.13037e-07 47.025L-6.57315e-07 62.7L15.675 62.7L15.675 47.025ZM31.35 31.35L31.35 47.025L15.675 47.025L15.675 31.35L31.35 31.35ZM31.35 31.35L47.025 31.35L47.025 15.675L31.35 15.675L31.35 31.35ZM62.7 4.76837e-06L62.7 15.675L47.025 15.675L47.025 3.39802e-06L62.7 4.76837e-06Z"
                fill="white"
              />
              <path
                d="M94.7 109.725L94.7 94.05L79.025 94.05L79.025 109.725L94.7 109.725ZM63.35 78.375L63.35 94.05L79.025 94.05L79.025 78.375L63.35 78.375ZM47.675 62.7L47.675 78.375L63.35 78.375L63.35 62.7L47.675 62.7ZM47.675 47.025L32 47.025L32 62.7L47.675 62.7L47.675 47.025ZM63.35 31.35L63.35 47.025L47.675 47.025L47.675 31.35L63.35 31.35ZM63.35 31.35L79.025 31.35L79.025 15.675L63.35 15.675L63.35 31.35ZM94.7 4.76837e-06L94.7 15.675L79.025 15.675L79.025 3.39802e-06L94.7 4.76837e-06Z"
                fill="white"
              />
            </svg>
          </button>
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
          <button className="bg-white text-black w-7 h-7 flex justify-center items-center">
            1
          </button>
          <button className="border-dashed border-white border w-7 h-7 flex justify-center items-center">
            2
          </button>
          <button className="border-dashed border-white border w-7 h-7 flex justify-center items-center">
            3
          </button>
          <button className="border-dashed border-white border w-7 h-7 flex justify-center items-center">
            4
          </button>
          <button className="border-dashed border-white border w-7 h-7 flex justify-center items-center">
            5
          </button>
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
          <button>
            <svg
              className="w-5 h-5"
              width="95"
              height="110"
              viewBox="0 0 95 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 0V15.675H47.675V0H32ZM63.35 31.35V15.675H47.675V31.35H63.35ZM79.025 47.025V31.35H63.35V47.025H79.025ZM79.025 62.7H94.7V47.025H79.025V62.7ZM63.35 78.375V62.7H79.025V78.375H63.35ZM63.35 78.375H47.675V94.05H63.35V78.375ZM32 109.725V94.05H47.675V109.725H32Z"
                fill="white"
              />
              <path
                d="M0 0V15.675H15.675V0H0ZM31.35 31.35V15.675H15.675V31.35H31.35ZM47.025 47.025V31.35H31.35V47.025H47.025ZM47.025 62.7H62.7V47.025H47.025V62.7ZM31.35 78.375V62.7H47.025V78.375H31.35ZM31.35 78.375H15.675V94.05H31.35V78.375ZM0 109.725V94.05H15.675V109.725H0Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default Index;
