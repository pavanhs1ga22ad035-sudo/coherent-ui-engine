import { ReactNode } from "react";

interface PrimaryWorkspaceProps {
  children: ReactNode;
}

const PrimaryWorkspace = ({ children }: PrimaryWorkspaceProps) => {
  return (
    <main className="flex-[7] min-w-0 p-lg">
      {children}
    </main>
  );
};

export default PrimaryWorkspace;
