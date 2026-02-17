interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader = ({ headline, subtext }: ContextHeaderProps) => {
  return (
    <section className="px-lg py-lg border-b border-border">
      <h1 className="font-heading text-3xl font-semibold text-foreground tracking-tight">
        {headline}
      </h1>
      <p className="mt-2 text-base text-muted-foreground font-body text-block">
        {subtext}
      </p>
    </section>
  );
};

export default ContextHeader;
