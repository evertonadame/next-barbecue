import Image from "next/image";

const Logo = () => {
  return (
    <div className="logo-wrapper">
      <a
        href="https://trin.ca/?gclid=Cj0KCQjwl8anBhCFARIsAKbbpyQyYrt4YXoQfXcdCUkzrR3-mZnZ9pZNPmlHWgaFEfcGKPJj2QLPp-AaAkVTEALw_wcB"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/logo.svg"
          alt="logo"
          className="logo"
          width={48}
          height={48}
        />
      </a>
    </div>
  );
};

export default Logo;
