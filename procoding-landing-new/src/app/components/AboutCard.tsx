import Image from "next/image";

interface AboutCardProps {
  icon: string;
  title: string;
  description: string;
  dark?: boolean;
}

export default function AboutCard({ icon, title, description, dark = false }: AboutCardProps) {
  return (
    <div className={`rounded-2xl p-6 ${dark ? "bg-[#1A001E]" : "bg-[#0C0C0C]"} text-white flex flex-col gap-4`}>
      <Image
        src={`/images/${icon}`}
        alt={title}
        width={40}
        height={40}
        className="w-10 h-10"
      />
      <h3 className="font-semibold text-lg text-left">{title}</h3>
      <p className="text-white/80 text-sm leading-relaxed text-left">{description}</p>
    </div>
  );
}