"use client";

import Guest from "../Guest";
import GuestButton from "../GuestButton";
import { type ChangeEvent, useState } from "react";
import type { Barbecue, GuestModel } from "@/types/barbecue";

function getAmountRaised(guests: GuestModel[]) {
  const paidGuests = guests.filter((guest) => guest.paid);
  const amountRaised = paidGuests.reduce(
    (acc, curr) => acc + curr.contribution,
    0
  );

  return amountRaised;
}

type BarbecueGuestsListProps = {
  price: Barbecue["price"];
  barbecueId: Barbecue["id"];
  barbecueGuests: Barbecue["guests"];
  handleMutate: (barbecue: Partial<Barbecue>) => Promise<void>;
};

const CardGuestsList = ({
  price,
  barbecueGuests,
  barbecueId,
  handleMutate,
}: BarbecueGuestsListProps) => {
  const [guests, setGuests] = useState<GuestModel[]>(barbecueGuests);

  const handleUpdateGuests = (newGuest: GuestModel) => {
    const newGuests = [...guests, newGuest];

    setGuests([...guests, newGuest]);
    handleMutate({
      guests: newGuests,
    });
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    setGuests((prevGuests) => {
      const guestIndex = prevGuests.findIndex((guest) => guest.id === id);
      if (guestIndex === -1) return prevGuests;

      const updatedGuests = [...prevGuests];
      updatedGuests[guestIndex] = {
        ...updatedGuests[guestIndex],
        paid: checked,
      };

      handleMutate({
        guests: updatedGuests,
        amountRaised: getAmountRaised(updatedGuests),
      });

      return updatedGuests;
    });
  };

  const handleDeleteGuest = (guestId: GuestModel["id"]) => {
    const guestIndex = guests.findIndex((guest) => guest.id === guestId);

    const newGuests = [...guests];

    newGuests.splice(guestIndex, 1);

    setGuests(newGuests);
    handleMutate({
      guests: [...newGuests],
      amountRaised: getAmountRaised(newGuests),
    });
  };

  return (
    <div className="barbecue-guests-list-container">
      <GuestButton
        barbecueId={barbecueId}
        price={price}
        guests={guests}
        setGuests={handleUpdateGuests}
      />
      {guests.map((guest) => (
        <Guest
          key={guest.id}
          guest={guest}
          handleCheckboxChange={handleCheckboxChange}
          handleDeleteGuest={handleDeleteGuest}
        />
      ))}
    </div>
  );
};

export default CardGuestsList;
