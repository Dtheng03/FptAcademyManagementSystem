import { CancelButton } from "./CancelButton";
import { SaveButton } from "./SaveButton";

export function ChipSaving({ title, mainClick, cancleClick }) {
  const ChipSavingstyle = {
    display: "flex",
  };
  return (
    <div style={ChipSavingstyle}>
      <CancelButton onClick={cancleClick} />
      <SaveButton title={title} onClick={mainClick} />
    </div>
  );
}
