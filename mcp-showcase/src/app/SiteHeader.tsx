import Link from 'next/link';

type PageKey = 'overview' | 'mcps' | 'skills' | 'codex' | 'security';

type SectionLink = {
  href: string;
  label: string;
};

type CtaLink = {
  href: string;
  label: string;
};

const primaryLinks: Array<{ key: PageKey; href: string; label: string }> = [
  { key: 'overview', href: '/', label: 'Overview' },
  { key: 'mcps', href: '/mcps-used', label: 'MCPs Used' },
  { key: 'skills', href: '/skills-used', label: 'Skills Used' },
  { key: 'codex', href: '/codex-in-practice', label: 'Codex In Practice' },
  { key: 'security', href: '/security-lab', label: 'Security Lab' },
];

export default function SiteHeader({
  currentPage,
  sectionLinks = [],
  cta,
}: {
  currentPage: PageKey;
  sectionLinks?: SectionLink[];
  cta?: CtaLink;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#043873]/85 shadow-lg backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-6 py-4 lg:px-10 xl:px-16 2xl:px-[220px]">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-3 group cursor-pointer">
            <div className="flex h-[29px] w-[37px] items-center justify-center rounded-sm bg-gradient-to-br from-[#4F9CF9] to-[#FFE492] transition-all group-hover:shadow-lg group-hover:shadow-[#4F9CF9]/50">
              <div className="h-4 w-4 rounded-sm bg-[#043873]"></div>
            </div>
            <span className="bg-gradient-to-r from-white to-[#C4DEFD] bg-clip-text text-[28px] font-bold tracking-tight text-transparent">
              MCP Hub
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-4">
            <nav className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
              {primaryLinks.map((link) =>
                link.key === currentPage ? (
                  <span
                    key={link.key}
                    className="inline-flex items-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-[16px] font-semibold text-[#FFE492]"
                  >
                    {link.label}
                  </span>
                ) : (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="rounded-xl px-4 py-2 text-[16px] font-medium text-white/85 transition-colors hover:bg-white/8 hover:text-white"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {cta ? (
              <a
                href={cta.href}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FFE492] to-[#ffd966] px-5 py-3 text-[16px] font-semibold text-[#043873] transition-all hover:shadow-lg hover:shadow-[#FFE492]/40"
              >
                {cta.label}
              </a>
            ) : null}
          </div>
        </div>

        <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {primaryLinks.map((link) =>
            link.key === currentPage ? (
              <span
                key={link.key}
                className="shrink-0 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-[#FFE492]"
              >
                {link.label}
              </span>
            ) : (
              <Link
                key={link.key}
                href={link.href}
                className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            )
          )}

          {cta ? (
            <a
              href={cta.href}
              className="shrink-0 rounded-full bg-gradient-to-r from-[#FFE492] to-[#ffd966] px-4 py-2 text-sm font-semibold text-[#043873]"
            >
              {cta.label}
            </a>
          ) : null}
        </div>

        {sectionLinks.length > 0 ? (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-full border border-white/10 bg-[#032b59]/80 px-4 py-2 text-sm font-medium text-[#C4DEFD] transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}
