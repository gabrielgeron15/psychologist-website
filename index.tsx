import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: PsychologistPage,
})

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')
}

function ContactForm() {
  const [fields, setFields] = useState({ name: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields({ ...fields, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/contact-form.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contacto', ...fields }),
    })
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-[#1a3a5c]/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#1a3a5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[#1a3a5c] mb-2">¡Mensaje recibido!</h3>
        <p className="text-[#4a6580]">Me pondré en contacto contigo en breve.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="form-name" value="contacto" />
      {/* honeypot */}
      <input type="hidden" name="bot-field" />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#1a3a5c] mb-2">
          Nombre completo
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={fields.name}
          onChange={handleChange}
          required
          placeholder="Tu nombre"
          className="w-full px-4 py-3 rounded-xl border border-[#c8d8e8] bg-white text-[#1a3a5c] placeholder-[#9ab0c4] focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] transition"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#1a3a5c] mb-2">
          Teléfono
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={fields.phone}
          onChange={handleChange}
          required
          placeholder="+34 600 000 000"
          className="w-full px-4 py-3 rounded-xl border border-[#c8d8e8] bg-white text-[#1a3a5c] placeholder-[#9ab0c4] focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] transition"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 bg-[#1a3a5c] text-white font-semibold rounded-xl hover:bg-[#122840] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Enviando…' : 'Solicitar cita'}
      </button>
    </form>
  )
}

function PsychologistPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a3a5c]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-white font-bold text-lg tracking-wide">Gabriel Geron</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <a href="#servicios" className="hover:text-white transition">Servicios</a>
            <a href="#sobre-mi" className="hover:text-white transition">Sobre mí</a>
            <a href="#contacto" className="hover:text-white transition">Contacto</a>
          </div>
          <a
            href="#contacto"
            className="bg-white text-[#1a3a5c] font-semibold text-sm px-5 py-2 rounded-full hover:bg-blue-50 transition"
          >
            Pedir cita
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-24 bg-gradient-to-br from-[#1a3a5c] via-[#1e4570] to-[#0d2641] text-white relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/3" />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Psicólogo Clínico · Col. Nº 12345
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Un espacio seguro para <span className="text-blue-200">sanar y crecer</span>
            </h1>
            <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-lg">
              Acompañamiento psicológico profesional y personalizado para adultos.
              Juntos trabajaremos para que alcances el bienestar que mereces.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="bg-white text-[#1a3a5c] font-bold px-8 py-3.5 rounded-full hover:bg-blue-50 transition shadow-lg"
              >
                Solicitar primera cita
              </a>
              <a
                href="#servicios"
                className="border border-white/40 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition"
              >
                Ver servicios
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-[#f0f5fa] border-y border-[#d8e6f0]">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '+10 años', label: 'de experiencia' },
            { value: '+500', label: 'pacientes atendidos' },
            { value: '100%', label: 'confidencialidad' },
            { value: 'Online', label: 'y presencial' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-2xl font-bold text-[#1a3a5c]">{item.value}</p>
              <p className="text-sm text-[#4a6580] mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#1a3a5c] font-semibold text-sm uppercase tracking-widest">Servicios</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mt-3">Áreas de especialización</h2>
            <p className="text-[#4a6580] mt-4 max-w-xl mx-auto">
              Ofrezco un enfoque terapéutico basado en evidencia, adaptado a las necesidades únicas de cada persona.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* TERAPIA ADULTOS */}
            <div className="group rounded-3xl border border-[#d8e6f0] bg-white hover:border-[#1a3a5c]/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-br from-[#1a3a5c] to-[#1e4d78] p-8 text-white">
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Terapia para adultos</h3>
                <p className="text-white/75 text-sm leading-relaxed">
                  Un proceso de autoconocimiento y cambio diseñado para ti.
                </p>
              </div>
              <div className="p-8">
                <p className="text-[#4a6580] leading-relaxed mb-6">
                  La terapia individual para adultos es un espacio confidencial donde exploraremos tus pensamientos,
                  emociones y patrones de comportamiento. Trabajamos con un enfoque cognitivo-conductual y humanista
                  para afrontar desafíos como el estrés laboral, conflictos relacionales, baja autoestima o crisis vitales.
                </p>
                <ul className="space-y-2.5">
                  {[
                    'Evaluación psicológica inicial',
                    'Terapia cognitivo-conductual (TCC)',
                    'Manejo del estrés y emociones',
                    'Desarrollo personal y autoestima',
                    'Relaciones y habilidades sociales',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#4a6580]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1a3a5c] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ANSIEDAD */}
            <div className="group rounded-3xl border border-[#d8e6f0] bg-white hover:border-[#1a3a5c]/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-br from-[#2a5298] to-[#1a3a5c] p-8 text-white">
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Ansiedad</h3>
                <p className="text-white/75 text-sm leading-relaxed">
                  Recupera el control y la calma en tu vida cotidiana.
                </p>
              </div>
              <div className="p-8">
                <p className="text-[#4a6580] leading-relaxed mb-6">
                  La ansiedad puede manifestarse de muchas formas: preocupación constante, ataques de pánico,
                  fobias o tensión física. Con técnicas basadas en evidencia —mindfulness, terapia de exposición
                  y reestructuración cognitiva— aprenderás a comprender y gestionar tu ansiedad de forma duradera.
                </p>
                <ul className="space-y-2.5">
                  {[
                    'Trastorno de ansiedad generalizada',
                    'Ataques de pánico y agorafobia',
                    'Fobias específicas y sociales',
                    'Técnicas de relajación y mindfulness',
                    'Reestructuración cognitiva',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#4a6580]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2a5298] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section id="sobre-mi" className="py-24 bg-[#f0f5fa]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#1a3a5c] font-semibold text-sm uppercase tracking-widest">Sobre mí</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mt-3 mb-6">
                Tu bienestar es mi vocación
              </h2>
              <p className="text-[#4a6580] leading-relaxed mb-5">
                Soy Gabriel Geron, psicólogo clínico colegiado con más de 10 años de experiencia acompañando
                a personas en sus procesos de cambio y crecimiento personal. Me formé en la Universidad Complutense
                de Madrid y completé mi especialidad en el Hospital Universitario La Paz.
              </p>
              <p className="text-[#4a6580] leading-relaxed mb-8">
                Mi enfoque integra la terapia cognitivo-conductual, la psicología positiva y las técnicas
                basadas en mindfulness, siempre desde el respeto, la empatía y la ausencia de juicio.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🎓', label: 'Psicología Clínica', sub: 'UCM + PIR' },
                  { icon: '🏆', label: 'Colegiado', sub: 'Col. Nº 12345' },
                  { icon: '🌐', label: 'Presencial', sub: 'y Online' },
                  { icon: '🔒', label: 'Confidencial', sub: '100% seguro' },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-2xl p-4 border border-[#d8e6f0]">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="font-semibold text-[#1a3a5c] text-sm mt-2">{item.label}</p>
                    <p className="text-[#4a6580] text-xs mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-[#1a3a5c] to-[#2a5298] aspect-[4/5] flex items-center justify-center shadow-2xl">
                <div className="text-center text-white p-8">
                  <div className="w-24 h-24 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="font-bold text-xl">Gabriel Geron</p>
                  <p className="text-white/70 text-sm mt-1">Psicólogo Clínico</p>
                  <div className="mt-6 space-y-2 text-sm text-white/80">
                    <p>✦ Especialista en ansiedad</p>
                    <p>✦ Terapia para adultos</p>
                    <p>✦ Enfoque humanista</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-[#d8e6f0]">
                <p className="text-[#1a3a5c] font-bold text-2xl">+500</p>
                <p className="text-[#4a6580] text-xs">pacientes atendidos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#1a3a5c] font-semibold text-sm uppercase tracking-widest">Testimonios</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mt-3">Lo que dicen mis pacientes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: 'Gracias a Gabriel aprendí a gestionar mi ansiedad. Por primera vez en años me siento dueño de mi vida.',
                name: 'Laura M.',
                role: 'Terapia para adultos',
              },
              {
                text: 'Un ambiente de total confianza y profesionalidad. Las técnicas que aprendí han cambiado mi forma de afrontar el día a día.',
                name: 'Carlos R.',
                role: 'Ansiedad',
              },
              {
                text: 'Después de meses de pánico y miedo, por fin puedo salir de casa con tranquilidad. Un trabajo increíble.',
                name: 'Sofía T.',
                role: 'Ataques de pánico',
              },
            ].map((t) => (
              <div key={t.name} className="bg-[#f0f5fa] rounded-3xl p-7 border border-[#d8e6f0]">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#1a3a5c]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#4a6580] leading-relaxed text-sm mb-5">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-[#1a3a5c] text-sm">{t.name}</p>
                  <p className="text-[#9ab0c4] text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-24 bg-gradient-to-br from-[#1a3a5c] to-[#0d2641] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-blue-200 font-semibold text-sm uppercase tracking-widest">Contacto</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-5">
                Da el primer paso hacia tu bienestar
              </h2>
              <p className="text-white/70 leading-relaxed mb-10">
                Déjame tu nombre y teléfono y me pondré en contacto contigo en menos de 24 horas
                para concertar una primera consulta gratuita y sin compromiso.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                    label: '+34 600 123 456',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    label: 'gabriielgeron@gmail.com',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    label: 'Calle Hortaleza 73, Madrid · Online',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 text-white/80">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-[#1a3a5c] mb-6">Solicitar cita</h3>
              <ContactForm />
              <p className="text-xs text-[#9ab0c4] mt-4 text-center">
                Primera consulta gratuita · Respondo en menos de 24 h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d2641] text-white/50 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2024 Gabriel Geron · Psicólogo Clínico · Col. Nº 12345</p>
          <p>Calle Hortaleza 73, Madrid</p>
        </div>
      </footer>
    </div>
  )
}