type Props = {
    children: React.ReactNode;
    className?: string;
    id?: string;
  };
  
  export default function SectionWrapper({ children, className = '', id }: Props) {
    return (
      <section
        id={id}
        className={`w-full px-4 py-20 bg-black flex justify-center ${className}`}
      >
        <div className="w-full max-w-screen-xl">{children}</div>
      </section>
    );
  }