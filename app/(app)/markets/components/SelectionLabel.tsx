const SPREAD_RE = /^(.+?)\s([+-]\d+(?:\.\d+)?)$/;
const TOTAL_RE = /^(Over|Under)\s+([\d.]+)$/i;

const SelectionLabel = ({
  selection,
  size = "sm",
}: {
  selection: string;
  size?: "sm" | "lg";
}) => {
  const numberClass = size === "lg" ? "font-mono text-brand" : "font-mono text-brand";
  const labelClass = "text-text-high";

  const spread = SPREAD_RE.exec(selection);
  if (spread) {
    return (
      <>
        <span className={labelClass}>{spread[1]} </span>
        <span className={numberClass}>{spread[2]}</span>
      </>
    );
  }
  const total = TOTAL_RE.exec(selection);
  if (total) {
    return (
      <>
        <span className={labelClass}>{total[1]} </span>
        <span className={numberClass}>{total[2]}</span>
      </>
    );
  }
  return <span className={labelClass}>{selection}</span>;
};

export default SelectionLabel;
