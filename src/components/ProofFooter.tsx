import { useState } from "react";
import { Check, Square } from "lucide-react";

const checklistItems = [
  { id: "ui", label: "UI Built" },
  { id: "logic", label: "Logic Working" },
  { id: "test", label: "Test Passed" },
  { id: "deployed", label: "Deployed" },
];

const ProofFooter = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <footer className="border-t border-border px-lg py-md bg-card">
      <div className="flex items-center gap-lg flex-wrap">
        {checklistItems.map((item) => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className="flex items-center gap-2 text-sm font-body transition-all duration-normal ease-in-out group"
          >
            {checked[item.id] ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <Square className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors duration-normal" />
            )}
            <span className={checked[item.id] ? "text-foreground" : "text-muted-foreground group-hover:text-foreground transition-colors duration-normal"}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </footer>
  );
};

export default ProofFooter;
