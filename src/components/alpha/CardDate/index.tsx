const CardDate = ({ date }: { date: string }) => {
  const dateObject = new Date(date);

  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return <p className="date">{formattedDate}</p>;
};

export default CardDate;
