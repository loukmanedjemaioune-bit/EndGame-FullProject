import clsx from "clsx";
export default function Keyboard({
  guessedLetters,
  currentWord,
  GameOver,
  addGuessedLetter,
}) {
  const keys = "abcdefghijklmnopqrstuvwxyz";
  return (
    <>
      {keys.split("").map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = isGuessed && currentWord.includes(letter);
        const isWrong = isGuessed && !currentWord.includes(letter);

        const className = clsx({
          correct: isCorrect,
          wrong: isWrong,
        });
        return (
          <button
            className={className}
            disabled={GameOver || currentWord === ""}
            key={letter}
            onClick={() => addGuessedLetter(letter)}
          >
            {letter.toUpperCase()}
          </button>
        );
      })}
    </>
  );
}
