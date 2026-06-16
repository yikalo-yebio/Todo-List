function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
}) {
  return (
    <div className="text-input-container">
      <label htmlFor={elementId} className="text-input-label">{labelText}</label>
      <input
        className="text-input"
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInputWithLabel;
