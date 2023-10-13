import { useState } from "react";

export default function Checkbox({ label, id }: { label: string; id: string }) {
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
          name={id}
          id={id}
        />
        <label>{label}</label>
      </div>
    </>
  );
}
