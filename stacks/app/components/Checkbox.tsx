import { useState } from "react";

export default function Checkbox({ label }: { label: string }) {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <div className="space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          name={label}
          id={label}
        />
        <label>{label}</label>
      </div>
    </>
  );
}
