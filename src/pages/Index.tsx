import TopBar from "@/components/TopBar";
import ContextHeader from "@/components/ContextHeader";
import PrimaryWorkspace from "@/components/PrimaryWorkspace";
import SecondaryPanel from "@/components/SecondaryPanel";
import ProofFooter from "@/components/ProofFooter";
import { Button } from "@/components/ui/button";

const samplePrompt = `Create a responsive dashboard layout with a sidebar navigation, top header with user avatar, and a main content area showing summary cards for key metrics.`;

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar
        projectName="KodNest Premium"
        currentStep={1}
        totalSteps={6}
        status="in-progress"
      />

      <ContextHeader
        headline="Design System Foundation"
        subtext="Establish the visual language, spacing, and component standards that every screen will follow."
      />

      <div className="flex flex-1 min-h-0">
        <PrimaryWorkspace>
          <div className="space-y-lg">
            {/* Typography Showcase */}
            <section className="space-y-md">
              <h2 className="font-heading text-xl font-semibold text-foreground">Typography</h2>
              <div className="space-y-sm">
                <h1 className="font-heading text-4xl font-bold text-foreground">Heading One</h1>
                <h2 className="font-heading text-2xl font-semibold text-foreground">Heading Two</h2>
                <h3 className="font-heading text-xl font-semibold text-foreground">Heading Three</h3>
                <p className="text-base text-foreground font-body text-block leading-relaxed">
                  Body text at 16px with generous line height. Every decision in this system is intentional — from the serif headings that convey authority, to the restrained color palette that lets content lead.
                </p>
                <p className="text-sm text-muted-foreground font-body">
                  Muted supporting text for secondary information.
                </p>
              </div>
            </section>

            {/* Color Swatches */}
            <section className="space-y-md">
              <h2 className="font-heading text-xl font-semibold text-foreground">Color Palette</h2>
              <div className="flex gap-sm flex-wrap">
                <div className="space-y-1">
                  <div className="w-16 h-16 rounded-lg bg-background border border-border" />
                  <p className="text-xs text-muted-foreground font-body">Background</p>
                </div>
                <div className="space-y-1">
                  <div className="w-16 h-16 rounded-lg bg-foreground" />
                  <p className="text-xs text-muted-foreground font-body">Foreground</p>
                </div>
                <div className="space-y-1">
                  <div className="w-16 h-16 rounded-lg bg-primary" />
                  <p className="text-xs text-muted-foreground font-body">Primary</p>
                </div>
                <div className="space-y-1">
                  <div className="w-16 h-16 rounded-lg bg-secondary" />
                  <p className="text-xs text-muted-foreground font-body">Secondary</p>
                </div>
                <div className="space-y-1">
                  <div className="w-16 h-16 rounded-lg bg-success" />
                  <p className="text-xs text-muted-foreground font-body">Success</p>
                </div>
                <div className="space-y-1">
                  <div className="w-16 h-16 rounded-lg bg-warning" />
                  <p className="text-xs text-muted-foreground font-body">Warning</p>
                </div>
              </div>
            </section>

            {/* Buttons */}
            <section className="space-y-md">
              <h2 className="font-heading text-xl font-semibold text-foreground">Buttons</h2>
              <div className="flex gap-sm flex-wrap items-center">
                <Button variant="default">Primary Action</Button>
                <Button variant="outline">Secondary Action</Button>
                <Button variant="success">Success</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link Style</Button>
              </div>
            </section>

            {/* Cards */}
            <section className="space-y-md">
              <h2 className="font-heading text-xl font-semibold text-foreground">Cards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                <div className="rounded-lg border border-border bg-card p-md">
                  <h3 className="font-heading text-lg font-semibold text-card-foreground">Card Title</h3>
                  <p className="mt-1 text-sm text-muted-foreground font-body leading-relaxed">
                    Clean borders, no drop shadows, balanced padding. Each card serves a single purpose.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-md">
                  <h3 className="font-heading text-lg font-semibold text-card-foreground">Another Card</h3>
                  <p className="mt-1 text-sm text-muted-foreground font-body leading-relaxed">
                    Consistent spacing and typography across all card instances. Predictable and calm.
                  </p>
                </div>
              </div>
            </section>

            {/* Inputs */}
            <section className="space-y-md">
              <h2 className="font-heading text-xl font-semibold text-foreground">Inputs</h2>
              <div className="max-w-sm space-y-sm">
                <input
                  type="text"
                  placeholder="Standard input field"
                  className="w-full rounded-lg border border-input bg-background px-sm py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-normal"
                />
                <input
                  type="text"
                  placeholder="Disabled input"
                  disabled
                  className="w-full rounded-lg border border-input bg-muted px-sm py-2 text-sm font-body text-muted-foreground opacity-50 cursor-not-allowed"
                />
              </div>
            </section>

            {/* Empty State */}
            <section className="space-y-md">
              <h2 className="font-heading text-xl font-semibold text-foreground">Empty State</h2>
              <div className="rounded-lg border border-border bg-card p-xl text-center">
                <p className="text-muted-foreground font-body">No items here yet.</p>
                <Button variant="default" size="sm" className="mt-sm">
                  Create your first item
                </Button>
              </div>
            </section>

            {/* Error State */}
            <section className="space-y-md">
              <h2 className="font-heading text-xl font-semibold text-foreground">Error State</h2>
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-md">
                <p className="text-sm font-body text-foreground font-medium">Something went wrong</p>
                <p className="mt-1 text-sm text-muted-foreground font-body">
                  The build failed due to a missing dependency. Try running the install step again.
                </p>
              </div>
            </section>
          </div>
        </PrimaryWorkspace>

        <SecondaryPanel
          stepTitle="Step 1: Foundation"
          stepDescription="Set up the core design tokens — colors, typography, spacing — before building any components."
          prompt={samplePrompt}
        />
      </div>

      <ProofFooter />
    </div>
  );
};

export default Index;
