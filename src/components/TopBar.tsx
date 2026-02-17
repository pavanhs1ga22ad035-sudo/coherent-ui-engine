import StatusBadge from "./StatusBadge";

interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: "not-started" | "in-progress" | "shipped";
}

const TopBar = ({ projectName, currentStep, totalSteps, status }: TopBarProps) => {
  return (
    <header className="flex items-center justify-between border-b border-border px-lg py-sm bg-card">
      <span className="font-heading text-base font-semibold text-foreground">
        {projectName}
      </span>
      <span className="text-sm text-muted-foreground font-body">
        Step {currentStep} / {totalSteps}
      </span>
      <StatusBadge status={status} />
    </header>
  );
};

export default TopBar;
