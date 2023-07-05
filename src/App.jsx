import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { getCats } from "./common/services/cats.services";
import { useInView } from "react-intersection-observer";

import { FaHeart } from "react-icons/fa";

const App = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const [cats, setCats] = useState([]);

  const { mutate } = useSWR(
    "getCats",
    async () => {
      const newCats = await getCats();
      setCats([...cats, ...newCats]);
    },
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (!inView) return;
    mutate();
  }, [inView]);

  console.log(import.meta.env.VITE_APP_TEST);

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {cats?.map((cat) => (
        <section
          key={cat.id}
          ref={(e) => {
            if (e && cat.id === cats[cats.length - 3].id) ref(e);
          }}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${cat.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        </section>
      ))}
    </main>
  );
};

export default App;
