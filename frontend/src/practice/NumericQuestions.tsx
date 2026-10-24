import { useId, useState } from "react";
import type { NumericQuestion as NumericData } from "./types";
import { gradeNumeric, parseNumericAnswer } from "./grading";

type Props = {
  question: NumericData;
  onResult?: (id: string, correct: boolean) => void;
};

export function NumericQuestion({ question, onResult }: Props) {
  const inputId = useId();

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <form
      className="numeric-question"
      onSubmit={event => {
        event.preventDefault();

        const value = parseNumericAnswer(answer);

        if (!Number.isFinite(value)) {
          setFeedback(
            "Enter a number or fraction, such as 2 or 1/2."
          );
          return;
        }

        const correct = gradeNumeric(question, value);

        const mistake = question.mistakes?.find(
          item =>
            Math.abs(value - item.value) <=
            (question.tolerance ?? 0.001)
        );

        if (correct) {
          setFeedback(`Correct! ${question.explanation}`);
        } else {
          setFeedback(
            mistake?.feedback ??
              "Not quite. Recheck your calculation or use a hint."
          );
        }

        onResult?.(question.id, correct);
      }}
    >
      <label htmlFor={inputId}>{question.prompt}</label>

      <input
        id={inputId}
        value={answer}
        onChange={event => {
          setAnswer(event.target.value);
          setFeedback("");
        }}
        placeholder="Number or fraction"
      />

      <button type="submit">Check answer</button>

      <p className="practice-feedback" role="status">
        {feedback}
      </p>
    </form>
  );
}