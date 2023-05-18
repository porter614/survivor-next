import Hero from "@components/Hero";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Players() {
  const { data, error } = useSWR("http://localhost:5000/contestants", fetcher);

  return (
    <>
      {data && (
        <h4>
          {data.map((contestant) => {
            return <p>{JSON.stringify(contestant)}</p>;
          })}
        </h4>
      )}
    </>
  );
}
