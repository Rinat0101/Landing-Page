interface SectionTitleProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
  }
  
  export default function SectionTitle({
    title,
    subtitle,
    align = 'center',
    className = '',
  }: SectionTitleProps) {
    const alignmentClass =
      align === 'left'
        ? 'text-left items-start'
        : align === 'right'
        ? 'text-right items-end'
        : 'text-center items-center';
  
    return (
      <div className={`flex flex-col gap-2 mb-10 ${alignmentClass} ${className}`}>
        <h2 className="text-white text-3xl md:text-4xl font-bold">{title}</h2>
        {subtitle && <p className="text-white/70 text-base md:text-lg max-w-2xl">{subtitle}</p>}
      </div>
    );
  }