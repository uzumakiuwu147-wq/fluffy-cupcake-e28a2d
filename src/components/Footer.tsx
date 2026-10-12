export function Footer() {
  return (
    <footer className="bg-tinta text-crema/80 mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl text-crema">
            Ámbar <span className="italic text-oro">&</span> Bruma
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Perfumería de autor elaborada a mano en pequeños lotes. Materias
            primas nobles, maceración lenta y frascos rellenables.
          </p>
        </div>
        <div className="text-sm space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-crema mb-3">
            Ayuda
          </p>
          <p>Envíos y devoluciones</p>
          <p>Muestras gratuitas</p>
          <p>hola@ambarybruma.es</p>
        </div>
        <div className="text-sm space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-crema mb-3">
            Compromiso
          </p>
          <p>Vegano y cruelty-free</p>
          <p>Envío neutro en carbono</p>
          <p>Frascos rellenables</p>
        </div>
      </div>
      <div className="border-t border-crema/10 py-6 text-center text-xs tracking-wide text-crema/50">
        © {new Date().getFullYear()} Ámbar & Bruma · Hecho a mano en Sevilla
      </div>
    </footer>
  )
}
