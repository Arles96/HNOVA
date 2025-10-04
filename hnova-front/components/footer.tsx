export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">HNOVA: Exploring the cosmos, one planet at a time</p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              GitHub
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
