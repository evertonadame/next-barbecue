"use client";

import type { Barbecue } from "@/types/barbecue";
import { useFetch } from "@/utils/useFetch";
import Card from "@/components/alpha/Card";
import CreateCard from "@/components/alpha/CreateCard";

const Home = () => {
  const { data, isLoading, mutate } = useFetch<Barbecue[]>("/api/barbecues");

  const barbecues = data ?? [];

  return isLoading ? (
    <div className="home-skeleton">
      <div className="card" />
      <div className="card" />
      <div className="card" />
      <div className="card" />
    </div>
  ) : (
    <div className="home-page">
      <CreateCard handleMutate={mutate} />
      {barbecues.map((barbecue) => (
        <Card
          key={barbecue.id}
          id={barbecue.id}
          date={barbecue.date}
          name={barbecue.name}
          guests={barbecue?.guests?.length ?? 0}
          amountRaised={barbecue?.amountRaised ?? 0}
        />
      ))}
    </div>
  );
};

export default Home;
