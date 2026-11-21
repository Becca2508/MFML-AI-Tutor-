import { useId, useState } from "react";
import type { NumericQuestion as NumericData } from "./types";
import { gradeNumeric, parseNumericAnswer } from "./grading";
import { AnswerReveal } from '../components/AnswerReveal';
import { canRevealSolution, recordDistinctAttempt } from '../utils/learningPolicy';

type Props = {
  question: NumericData;
  onResult?: (id: string, correct: boolean) => void;
  onAttempt?: (count: number) => void;
  showWorkedFeedback?: boolean;
};

export function NumericQuestion({ question, onResult , onAttempt, showWorkedFeedback = true}: Props) {
  const inputId = useId();

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);

  return <div className="question-block">
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

        const next = recordDistinctAttempt(attempts, value);
        setAttempts(next);
        onAttempt?.(next.length);
        const correct = gradeNumeric(question, value);
        setSolved(solved || correct);
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
              "Not quite. Recheck your calculation and try again."
          );
        }

        onResult?.(question.id, correct);
      }}
    >
      <label htmlFor={inputId}>{question.prompt}</label>
      <div className="question-actions"> 
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
      </div>

      <p className="practice-feedback" role="status">
        {feedback}
      </p>
    </form>
    {showWorkedFeedback && <AnswerReveal allowed={canRevealSolution(attempts.length, solved)} label="explanation">
      <p>{question.explanation}</p>
    </AnswerReveal>}
  </div>;
}