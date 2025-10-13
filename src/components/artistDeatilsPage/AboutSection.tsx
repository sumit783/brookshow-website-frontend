interface AboutSectionProps {
  bio: string;
}

export const AboutSection = ({ bio }: AboutSectionProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-accent">About</h3>
      <p className="text-foreground/80 leading-relaxed text-lg">{bio}</p>
    </div>
  );
};


