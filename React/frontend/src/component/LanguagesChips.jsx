export default function Chips(props) {
  if (!props.Categories) return <span>Loading...</span>;
  const chip = props.Categories;

  return chip.map((cat, i) => (
    <span key={i} onClick={() => props.onSelect(cat)}>
      {cat}
    </span>
  ));
}
