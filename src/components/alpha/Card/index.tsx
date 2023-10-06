import Link from "next/link";
import CardDate from "../CardDate";
import CardGuestsInfo from "../CardGuestsInfo";
import CardPrice from "../CardPrice";

type CardProps = {
  id: string;
  date: string;
  name: string;
  guests: number;
  amountRaised: number;
};

const Card = ({ id, date, name, guests, amountRaised }: CardProps) => {
  return (
    <Link href={`/${id}`} className="barbecue-card">
      <CardDate date={date} />
      <p className="name">{name}</p>
      <div className="infos">
        <CardGuestsInfo amount={guests} />
        <CardPrice price={amountRaised} />
      </div>
    </Link>
  );
};

export default Card;
