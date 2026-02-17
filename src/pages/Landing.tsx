import { useNavigate } from "react-router-dom";
import { Code, Video, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Code,
    title: "Practice Problems",
    description: "Solve curated coding challenges across data structures, algorithms, and more.",
  },
  {
    icon: Video,
    title: "Mock Interviews",
    description: "Simulate real interview scenarios with timed sessions and feedback.",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "Visualize your growth with detailed analytics and performance trends.",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-sm py-xl">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-md">
            Ace Your Placement
          </h1>
          <p className="text-lg text-muted-foreground mb-lg max-w-xl mx-auto">
            Practice, assess, and prepare for your dream job
          </p>
          <Button
            size="lg"
            className="text-base px-lg py-md h-auto"
            onClick={() => navigate("/dashboard")}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="px-sm py-xl bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-lg p-lg text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mx-auto mb-md">
                  <feature.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-sm py-md border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Placement Prep. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
