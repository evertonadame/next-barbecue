import Image from "next/image";

const CardGuestsInfo = ({ amount }: { amount: number }) => {
  return (
    <div className="barbecue-guests">
      <div className="guests-icon">
        <Image
          src="/icons/people.svg"
          alt="guests-icon"
          className="w-full h-full"
          width={18}
          height={15.3}
        />
      </div>
      <p className="guests-quantity">{amount}</p>
    </div>
  );
};

export default CardGuestsInfo;
