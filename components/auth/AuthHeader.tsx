import Image from "next/image";

export default function AuthHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8">
      <Image
        src="/logo-mullai.png"
        alt="Mullai Logo"
        width={200}
        height={70}
        priority
        className="mb-6"
      />
      <h2 className="text-2xl tracking-tight font-bold mt-4 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
    </div>
  );
}
