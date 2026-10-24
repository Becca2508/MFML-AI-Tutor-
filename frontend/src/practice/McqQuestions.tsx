import { useId, useState } from "react";
import type { McqQuestion as McqData } from "./types";
import { gradeMcq } from "./grading";

type Props = {
  question: McqData;
  onResult?: (id: string, correct: boolean) => void;
};

export function McqQuestion({ question, onResult }: Props) {
  const groupId = useId();

  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        if (selected === null) return;

        const correct = gradeMcq(question, selected);

        setFeedback(
          `${correct ? "Correct!" : "Not quite."} ${
            question.explanation
          }`
        );
        onResult?.(question.id, correct);
      }}
    >
      <fieldset className="practice-choices">
        <legend>{question.prompt}</legend>

        {question.choices.map((choice, index) => (
          <label key={choice}>
            <input
              type="radio"
              name={groupId}
              checked={selected === index}
              onChange={() => {
                setSelected(index);
                setFeedback("");
              }}
              required
            />

            <span>{choice}</span>
          </label>
        ))}
      </fieldset>

      <button type="submit" disabled={selected === null}>
        Check answer
      </button>

      <p className="practice-feedback" role="status">
        {feedback}
      </p>
    </form>
  );
}