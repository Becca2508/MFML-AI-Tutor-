import type { Matrix } from '../types/guide';

export function MatrixDisplay({
  matrix,
  label,
}: {
  matrix: Matrix;
  label: string;
}) {
  return (
    <div className="guide-matrix">
      <table>
        <caption>{label}</caption>

        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, columnIndex) => (
                <td key={columnIndex}>
                  {Number(value.toFixed(3))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}