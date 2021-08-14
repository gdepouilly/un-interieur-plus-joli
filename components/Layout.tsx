import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h1>
              <span>Un intérieur plus joli</span>
            </h1>
          </a>
        </Link>
      </header>

      <div className="page-content">{children}</div>
    </div>
  );
}
