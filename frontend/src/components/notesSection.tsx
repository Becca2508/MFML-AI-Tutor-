import type {sectionNotes} from "../types/notesTemplate.ts";

type NotesPanel = {
  notes: sectionNotes;
  onGuide?: () => void;
};

export function NotesPanel({ notes, onGuide }: NotesPanel) {
  return (
    <section>
      <h2>{notes.topic}</h2>
      <p>{notes.objective}</p>
      <div className="notes-intro"><strong>Start with the prerequisites.</strong> Review dot products, transpose, eigenvalues, and vector normalization. Expand a term to see its example.</div>
      <h3>Vocabulary</h3>
      {notes.vocabulary.map((entry) => (
        <details key={entry.term}>
          <summary>{entry.term}</summary>
          <p>{entry.definition}</p>
          {entry.example && <p>{entry.example}</p>}
        </details>
      ))}
      {notes.formulas && <><h3>Formulas to Keep in Mind</h3><div className="formula-grid">{notes.formulas.map(formula => <article key={formula.expression}><code>{formula.expression}</code><p>{formula.explanation}</p></article>)}</div></>}
      {notes.commonPitfalls && <><h3>Common slips</h3><ul>{notes.commonPitfalls.map(pitfall => <li key={pitfall}>{pitfall}</li>)}</ul></>}
      <details><summary>Full versus reduced SVD</summary><p>For an m × n matrix, the full SVD has U of size m × m, Σ of size m × n, and V of size n × n. </p></details>
      <details><summary>How does this relate to machine learning?</summary><p>SVD provides low-rank approximations. PCA uses singular vectors of centered data to describe directions of variation. </p></details>
      {onGuide && <button className="primary" onClick={onGuide}>Work through the example →</button>}
    </section>
  );
}