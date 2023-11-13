import clsx from "clsx";

interface PaginationProps {
  total: number;
  current: number;
  limit: number;

  handleChangePage: (num: number) => void;
}

function Pagination({ limit = 5, ...props }: PaginationProps) {
  const intersect = Math.ceil(props.current / limit);
  const upper = limit * (intersect - 1);

  console.log(props.total);

  const listPage = Array(limit)
    .fill(0)
    .map((_, el) => el + 1 + upper);

  return (
    <>
      <div className="flex text-white gap-2 mt-10 justify-center font-ud-2 text-2xl items-center">
        {intersect > 1 && (
          <>
            <button
              id="prev-last"
              onClick={() => {
                props.handleChangePage(1);
              }}
            >
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
            <button
              id="prev"
              onClick={() => {
                props.handleChangePage(props.current - 1);
              }}
            >
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
          </>
        )}

        {listPage.map((idx: number) => (
          <button
            onClick={() => props.handleChangePage(idx)}
            key={idx}
            className={clsx(
              "w-7 h-7 flex justify-center items-center",
              props.current == idx && "bg-white text-black ",
              props.current != idx && "border-dashed border-white border"
            )}
          >
            {idx}
          </button>
        ))}

        {upper < props.total - 5 && (
          <>
            <button
              onClick={() => {
                props.handleChangePage(props.current + 1);
              }}
            >
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
            <button
              onClick={() => {
                props.handleChangePage(props.total);
              }}
            >
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
          </>
        )}
      </div>
    </>
  );
}

export default Pagination;
