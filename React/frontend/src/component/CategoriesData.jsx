import { useEffect, useState } from "react";

export function useCategories() {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  console.log("Fetching categories...");
  useEffect(() => {
    /* fetch("http://localhost:5191/api/CategoriesControll") */
    fetch("http://localhost:5000/api/word/Categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("DataCategorie Received", data);
        /* const formatted = {}; */
        /* data.forEach((cat) => {
          formatted[cat.name] = cat.words;
        }); */
        const formatted = data.map((item) => item.Category);
        setCategories(formatted);
        setLoading(false);
      })

      .catch((err) => {
        console.log("Fetch Erreur", err);
        setLoading(false);
      });
  }, []);
  return { categories, loading };
}
