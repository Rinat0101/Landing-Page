import Image from 'next/image';

type InstructorCardProps = {
  name: string;
  role: string;
  description: string;
  image: string;
};

export default function InstructorCard({
  name,
  role,
  description,
  image,
}: InstructorCardProps) {
  return (
    <div className="bg-[#111111] rounded-xl p-6 flex flex-col items-center text-center">
      <Image
        src={image}
        alt={name}
        width={180}
        height={180}
        className="mb-4"
      />
      <span className="bg-[#F28237] text-xs font-semibold text-white px-3 py-1 rounded-full mb-3">
        {role}
      </span>
      <h3 className="text-lg font-bold mb-2">{name}</h3>
      <p className="text-sm text-gray-300 mb-4">{description}</p>
      <button className="border border-white rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition">
        Join
      </button>
    </div>
  );
}