import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, CheckCircle, AlertCircle, Image } from "lucide-react";

interface SecondaryPanelProps {
  stepTitle: string;
  stepDescription: string;
  prompt: string;
}

const SecondaryPanel = ({ stepTitle, stepDescription, prompt }: SecondaryPanelProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
  };

  return (
    <aside className="flex-[3] min-w-0 border-l border-border p-lg space-y-md">
      <div>
        <h3 className="font-heading text-lg font-semibold text-foreground">{stepTitle}</h3>
        <p className="mt-1 text-sm text-muted-foreground font-body leading-relaxed">
          {stepDescription}
        </p>
      </div>

      <div className="rounded-lg border border-border bg-secondary/50 p-sm">
        <p className="text-sm font-body text-foreground leading-relaxed whitespace-pre-wrap">
          {prompt}
        </p>
      </div>

      <div className="space-y-2">
        <Button variant="default" size="sm" className="w-full" onClick={handleCopy}>
          <Copy className="mr-1" /> Copy Prompt
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          <ExternalLink className="mr-1" /> Build in Lovable
        </Button>
        <div className="flex gap-2">
          <Button variant="success" size="sm" className="flex-1">
            <CheckCircle className="mr-1" /> It Worked
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <AlertCircle className="mr-1" /> Error
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="w-full">
          <Image className="mr-1" /> Add Screenshot
        </Button>
      </div>
    </aside>
  );
};

export default SecondaryPanel;
