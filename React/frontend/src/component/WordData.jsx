import { useEffect, useState } from "react";

export function useWordByCategory(Cat) {
  const [word, setWord] = useState("");
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    if (!Cat) {
      setWord("");
      setLoading(false);
      return;
    }

    setLoading(true);
    /*     fetch(`http://localhost:5191/api/Words/${Cat}`)
     */ fetch(`http://localhost:5000/api/word/${Cat}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then((word) => {
        console.log("API Word:", word);
        setWord(word);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching word:", err);
        setWord("");
        setLoading(false);
      });
  }, [Cat]);
  return { word, Loading };
}
