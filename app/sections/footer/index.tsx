export function Footer() {
  return (
    <footer className="relative w-full border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-serif uppercase font-bold text-2xl text-center tracking-[0.07rem] leading-[1.2] text-foreground">
            LILIAN<br />CARVALHO
          </p>
        </div>
        <div className="flex items-center gap-6 font-sans font-semibold text-[10px] uppercase tracking-[0.2em] text-muted">
          <a
            href="mailto:liliancarvalhomkt@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/lilian-carvalho-95b0093b8/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
