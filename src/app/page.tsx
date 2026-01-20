// src/app/page.tsx

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Placeholder */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center bg-gradient-to-br from-wood-dark to-wood-darker">
        <div className="text-center text-white px-4">
          <p className="text-lg md:text-xl mb-4 tracking-widest uppercase text-wood-light">
            Stolarska radionica
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="block">Drvodjelja</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/80">
            30 godina sa vama
          </p>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
            Tradicija. Kvaliteta. Povjerenje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#usluge" 
              className="btn-primary text-lg"
            >
              Pogledaj radove
            </a>
            <a 
              href="#kontakt" 
              className="btn bg-white/10 text-white border-2 border-white/50 hover:bg-white hover:text-wood-darker"
            >
              Kontaktirajte nas
            </a>
          </div>
        </div>
      </section>

      {/* O nama Section - Placeholder */}
      <section id="o-nama" className="section bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-wood-dark">O nama</h2>
            <p className="text-lg text-gray-600 mb-4">
              Drvodjelja je stolarska radionica s preko 30 godina iskustva u izradi 
              kvalitetnog drvenog namještaja i stolarije.
            </p>
            <p className="text-gray-600">
              Naša tradicija, znanje i ljubav prema drvu čine svaki naš proizvod posebnim.
              Od generacije do generacije prenosimo zanat i posvećenost kvaliteti.
            </p>
          </div>
        </div>
      </section>

      {/* Usluge Section - Placeholder */}
      <section id="usluge" className="section">
        <div className="container-custom">
          <h2 className="text-center mb-12 text-wood-dark">Naše usluge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Kuhinje po mjeri', desc: 'Izrađujemo kuhinje koje savršeno odgovaraju vašem prostoru' },
              { title: 'Vrata i prozori', desc: 'Drvena vrata i prozori izrađeni od najkvalitetnijeg drva' },
              { title: 'Namještaj po mjeri', desc: 'Ormare, komode, police i drugi namještaj prema vašim željama' },
              { title: 'Stepenice', desc: 'Drvene stepenice - ravne, zavojite i konzolne' },
              { title: 'Restauracija', desc: 'Obnavljamo stari namještaj i vraćamo mu nekadašnji sjaj' },
              { title: 'Poslovni prostori', desc: 'Opremamo restorane, hotele i poslovne prostore' },
            ].map((service, index) => (
              <div key={index} className="card p-6">
                <div className="w-12 h-12 bg-wood-light/20 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-wood rounded" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-wood-dark">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt Section - Placeholder */}
      <section id="kontakt" className="section bg-cream">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mb-6 text-wood-dark">Kontaktirajte nas</h2>
            <p className="text-gray-600 mb-8">
              Imate pitanja ili želite besplatnu ponudu? Javite nam se!
            </p>
            <div className="bg-white rounded-xl shadow-md p-8">
              <p className="text-lg mb-4">
                📧 <a href="mailto:info@drvodjelja.hr" className="text-wood hover:underline">info@drvodjelja.hr</a>
              </p>
              <p className="text-lg mb-4">
                📞 <a href="tel:+385XXXXXXXX" className="text-wood hover:underline">+385 XX XXX XXXX</a>
              </p>
              <p className="text-gray-500">
                Kontakt forma dolazi u Fazi 2!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
