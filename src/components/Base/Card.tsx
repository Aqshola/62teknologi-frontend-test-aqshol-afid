interface CardProps {
  img: string;
  title: string;
  address: Array<string>;
  phone: string;
  is_closed: boolean;
  rating: number;
  review_count: number;
  transaction: Array<string>;
}
function Card(props: CardProps) {
  return (
    <div className="w-full bg-ud-white flex h-full card">
      <div className="flex-[1]">
        <img
          loading="lazy"
          className="flex w-full h-full object-cover"
          src={props.img}
          alt="restaurant"
        />
      </div>
      <div className="flex flex-col flex-[2] p-2 gap-1">
        <h3 className="font-ud-2 text-2xl font-medium">{props.title}</h3>
        <p className="text-xs font-mono">{props.address.join(", ")}</p>
        <div className="flex gap-1 items-center">
          <svg
            className="h-4 w-4"
            width="63"
            height="95"
            viewBox="0 0 63 95"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H62.7V94.05H0V0ZM52.25 83.6V10.45H41.8V20.9H20.9V10.45H10.45V83.6H52.25ZM26.125 62.7H36.575V73.15H26.125V62.7Z"
              fill="black"
            />
          </svg>

          <p className="font-mono text-xs">{props.phone}</p>
        </div>

        {props.is_closed && (
          <div className="text-xs font-mono bg-ud-red w-fit p-1 text-white mt-1">
            Closed
          </div>
        )}

        {!props.is_closed && (
          <div className="text-xs font-mono bg-ud-lightgreen w-fit p-1 text-white mt-1">
            OPEN
          </div>
        )}
        <div className="flex">
          <p className="text-sm font-bold font-mono text-ud-orange">
            Rating {props.rating}
          </p>
          <p className="text-sm font-mono text-ud-gray">
            ({props.review_count} reviews)
          </p>
        </div>
        <div className="text-sm mt-2 font-bold font-mono text-ud-blue flex gap-2 flex-wrap">
          {props.transaction.map((el, idx) => (
            <p className="capitalize">
              {el.replace("_", " ")}
              {idx == props.transaction.length - 1 ? "" : ","}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
