import { useState } from "react";

export default function CreateListButton() {
  const [open, setOpen] = useState(false);
  return (
    <div>
        <button>Create List</button>

    </div>
  );
}