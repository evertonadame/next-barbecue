"use client";

import CardDate from "@/components/alpha/CardDate";
import CardGuestsInfo from "@/components/alpha/CardGuestsInfo";
import CardGuestsList from "@/components/alpha/CardGuestsList";
import CardPrice from "@/components/alpha/CardPrice";
import Spin from "@/components/ui/Spin";
import { useRouter } from "next/navigation";
import type { Barbecue } from "@/types/barbecue";
import { useFetch } from "@/utils/useFetch";

type PageProps = {
  params: {
    id: string;
  };
};

const Page = ({ params }: PageProps) => {
  const { push } = useRouter();

  const { data, isLoading, mutate } = useFetch<Barbecue>(
    `/api/barbecues/${params.id}`
  );

  const handleMutate = async (barbecue: Partial<Barbecue>) => {
    try {
      await fetch(`/api/barbecues/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(barbecue),
      });

      await mutate(
        {
          ...data,
          ...barbecue,
        } as Barbecue,
        {
          revalidate: false,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="barbecue-content loading">
        <Spin />
      </div>
    );
  }

  const deleteBarbecue = async () => {
    try {
      await fetch(`/api/barbecues/delete/${params.id}`, {
        method: "DELETE",
      });

      // instead of revalidating the cache, we can just redirect the user to the home page and let the cache be invalidated by the next request
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) {
    push("/");
    return null;
  }

  return (
    <div className="barbecue-content">
      <div className="details">
        <div className="details-row">
          <CardDate date={data.date} />
          <CardGuestsInfo amount={data?.guests?.length ?? 0} />
        </div>
        <div className="details-row">
          <p className="barbecue-title">{data.name}</p>
          <CardPrice price={data.amountRaised} />
        </div>
        {data.description && data.description.length > 0 ? (
          <div className="details-row">
            <p className="barbecue-description">{data.description}</p>
          </div>
        ) : null}
      </div>
      <button
        className="mt-12 flex gap-2 items-center"
        onClick={deleteBarbecue}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        Excluir churras
      </button>
      <CardGuestsList
        price={data.price}
        barbecueGuests={data.guests}
        barbecueId={data.id}
        handleMutate={handleMutate}
      />
    </div>
  );
};

export default Page;
