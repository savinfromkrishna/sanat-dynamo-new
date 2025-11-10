// components/cta-button.tsx
import Link from "next/link";

interface CTAButtonProps {
  url: string;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function CTAButton({ url, label, onClick }: CTAButtonProps) {
  return (
    <Link href={url} passHref legacyBehavior>
      <a
        onClick={onClick}
        className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm py-2 px-3 rounded-md transition-colors"
      >
        {label}
      </a>
    </Link>
  );
}