import { use, useEffect, useState } from "react";
import "./App.css";
import Keyboard from "./component/keyboard.jsx";
import Confetti from "react-Confetti";
import Chips from "./component/LanguagesChips.jsx";
import { useCategories } from "./component/CategoriesData.jsx";
import { useWordByCategory } from "./component/WordData.jsx";
import Timer from "./component/Timer.jsx";
import clsx from "clsx";

export default function Game() {
  const { categories, loading } = useCategories();
  const [Category, setCategory] = useState("");
  const { word, Loading } = useWordByCategory(Category);
  const [currentWord, setcurrentWord] = useState("");
  const [guessWord, setguessWord] = useState([]);
  const [TimerOn, setTimerOn] = useState(false);
  const [TimeLost, setTimeLost] = useState(false);
  const [score, setscore] = useState(0);
  const [userId, setuserId] = useState(null);
  const [scoreUpdated, setScoreUpdated] = useState(false);

  const wrongGuessCount = guessWord.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameWon =
    currentWord.split("").every((letter) => guessWord.includes(letter)) &&
    currentWord.length >= 1;
  const isLost = wrongGuessCount >= 8 || TimeLost;
  const isGameOver = isGameWon || isLost;
  const DispalyWord = currentWord.split("").map((letter, index) => {
    const IsletterGuessed = guessWord.includes(letter);
    const className = clsx("letters", {
      Hints: isLost,
      correct: isGameWon,
    });

    return (
      <span className={className} key={index}>
        {isGameOver
          ? letter.toUpperCase()
          : IsletterGuessed
          ? letter.toUpperCase()
          : "_"}
      </span>
    );
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const id = payload.id;
    setuserId(id);
    console.log("id:", userId);

    fetch(`http://localhost:5000/api/score/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setscore(data);
      })
      .catch((err) => {
        console.error("Error fetching Score:", err);
      });
  }, []);

  useEffect(() => {
    /*  if (!isGameOver || scoreUpdated) return; */

    if (isGameWon) {
      setscore((prev) => prev + 5);
    } else if (isLost) {
      setscore((prev) => (prev > 0 ? prev - 5 : 0));
    }

    /*     setScoreUpdated(true);
     */
  }, [isGameWon, isLost]);

  /*   const isCorrect = currentWord.split("").includes(letter); */
  function addGuessedLetter(letter) {
    setguessWord((prev) => (prev.includes(letter) ? prev : [...prev, letter]));
  }
  function StartNew() {
    setguessWord([]);
    setCategory("");
    setcurrentWord("");
    setTimerOn(false);
    setTimeLost(false);
    /*     setScoreUpdated(false);
     */
  }
  useEffect(() => {
    if (word) {
      setcurrentWord(word);
    }
  }, [word]);
  function SelectCategory(Cat) {
    setCategory(Cat);
    setTimerOn(true);
  }
  async function LogOut() {
    if (!userId) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/score/update/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score }),
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      await res.json();

      localStorage.clear();
      window.location.reload();
    } catch (err) {
      console.error("Error updating score:", err);
    }
  }

  /* async function LogOut() {
    if (userId === null) return;
    try {
      const res = await fetch(`http://localhost:5000/api/score/update/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: score }).then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          await res.json();
        })
      })
        
        .then((data) => console.log(data.message));
    } catch (error) {
      console.error("Error updating score:", err);
    }

    localStorage.clear();
    window.location.reload();
  } */
  return (
    <main>
      {isGameWon && <Confetti />}
      <span className="Score">Your Score : {score}</span>
      <section className="category">
        {currentWord !== "" ? (
          <span>{Category}</span>
        ) : loading ? (
          "Loading..."
        ) : (
          <Chips Categories={categories} onSelect={SelectCategory} />
        )}
      </section>
      <section className="GameStatus">
        <p>
          {currentWord === ""
            ? "Please Select A chip"
            : isGameWon
            ? "You Win!"
            : isLost
            ? "You Lose!"
            : `You Have ${8 - wrongGuessCount} try`}
        </p>
      </section>
      <section className="Word">{DispalyWord}</section>
      <section className="keyboard">
        <Keyboard
          addGuessedLetter={addGuessedLetter}
          GameOver={isGameOver}
          currentWord={currentWord}
          guessedLetters={guessWord}
        />
      </section>
      <button onClick={StartNew} disabled={!isGameOver}>
        New Game
      </button>
      <button id="LogOut" onClick={LogOut}>
        LogOut
      </button>
      <section className="Timer">
        {TimerOn && (
          <Timer
            OnGameLost={() => setTimeLost(true)}
            GameOver={isGameOver}
            isGameLost={isLost}
          />
        )}
      </section>
    </main>
  );
}
