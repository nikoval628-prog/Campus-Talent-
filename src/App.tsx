/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  MessageCircle, 
  TrendingUp, 
  Search, 
  PlusCircle, 
  Navigation,
  ExternalLink,
  BookOpen,
  Palette,
  Briefcase,
  Layers,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  schedule: string;
  whatsapp: string;
  timestamp: number;
}

interface Metrics {
  profilesCount: number;
  connectionsCount: number;
  topCategory: string;
}

const CATEGORIES = ['Tutorías', 'Diseño', 'Asesoría Financiera', 'Idiomas', 'Programación', 'Otros'];

// --- Components ---

export default function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [connectionsCount, setConnectionsCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'impact' | 'offer'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todas');

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedServices = localStorage.getItem('campustalent_services');
      const savedConnections = localStorage.getItem('campustalent_connections');
      
      if (savedServices && JSON.parse(savedServices).length > 0) {
        setServices(JSON.parse(savedServices));
      } else {
        // Seed data for MVP validation
        const seedData: Service[] = [
          {
            id: '1',
            name: 'Carlos Mendoza',
            category: 'Asesoría Financiera',
            description: 'Modelado financiero en Excel y análisis de estados financieros para tareas y proyectos.',
            price: '$25/hr',
            schedule: 'Lunes a Jueves (Noche)',
            whatsapp: '3005556677',
            timestamp: Date.now()
          },
          {
            id: '2',
            name: 'Elena Torres',
            category: 'Diseño',
            description: 'Diseño de presentaciones corporativas, logos y edición básica de video para emprendimientos.',
            price: '$40/proyecto',
            schedule: 'Sábados y Domingos',
            whatsapp: '3104443322',
            timestamp: Date.now()
          },
          {
            id: '3',
            name: 'Juan Portilla',
            category: 'Idiomas',
            description: 'Preparación para el TOEFL y práctica de conversación en inglés nivel avanzado.',
            price: '$30/sesión',
            schedule: 'Viernes (Todo el día)',
            whatsapp: '3201118899',
            timestamp: Date.now()
          }
        ];
        saveServices(seedData);
      }
      
      if (savedConnections) setConnectionsCount(parseInt(savedConnections, 10));
    } catch (e) {
      console.error("Error loading localStorage data", e);
    }
  }, []);

  // Save services to localStorage
  const saveServices = (newServices: Service[]) => {
    setServices(newServices);
    localStorage.setItem('campustalent_services', JSON.stringify(newServices));
  };

  // Increment connections
  const trackConnection = () => {
    const newCount = connectionsCount + 1;
    setConnectionsCount(newCount);
    localStorage.setItem('campustalent_connections', newCount.toString());
  };

  // Calculate top category
  const topCategory = useMemo(() => {
    if (services.length === 0) return 'Ninguna';
    const counts: Record<string, number> = {};
    services.forEach(s => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  }, [services]);

  const filteredServices = useMemo(() => {
    return services.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           s.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'Todas' || s.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchQuery, filterCategory]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F8FAFC] font-sans text-[#0F172A] overflow-hidden">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex w-[320px] bg-white border-r border-slate-200 flex-col p-8 shrink-0">
        <div className="mb-12 cursor-pointer" onClick={() => setActiveTab('home')}>
          <h1 className="text-2xl font-black tracking-tighter text-indigo-600 uppercase italic">
            Campus<span className="text-slate-900">Talent</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Economy for Students</p>
        </div>

        <nav className="space-y-6 flex-1">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Principal</p>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => setActiveTab('home')}
                  className={`flex items-center w-full transition-colors ${activeTab === 'home' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-indigo-600 font-medium'}`}
                >
                  {activeTab === 'home' && <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>}
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('explore')}
                  className={`flex items-center w-full transition-colors ${activeTab === 'explore' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-indigo-600 font-medium'}`}
                >
                  {activeTab === 'explore' && <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>}
                  Explorar Servicios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('impact')}
                  className={`flex items-center w-full transition-colors ${activeTab === 'impact' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-indigo-600 font-medium'}`}
                >
                  {activeTab === 'impact' && <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>}
                  Nuestro Impacto
                </button>
              </li>
            </ul>
          </div>
          
          <div className="pt-8">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Acciones</p>
            <button 
              onClick={() => setActiveTab('offer')}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl mb-3 hover:bg-indigo-600 transition-all shadow-lg active:scale-[0.98]"
            >
              Ofrecer mi Servicio
            </button>
            <button 
              onClick={() => setActiveTab('explore')}
              className="w-full border-2 border-slate-900 text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
              Solicitar un Servicio
            </button>
          </div>
        </nav>

        <div className="bg-indigo-50 p-6 rounded-2xl">
          <p className="text-xs font-bold text-indigo-800 mb-1 italic uppercase">¿Necesitas Ayuda?</p>
          <p className="text-[11px] text-indigo-600 leading-relaxed">Soporte técnico disponible 24/7 para estudiantes registrados.</p>
        </div>
      </aside>

      {/* Mobile Header Navigation */}
      <nav className="md:hidden sticky top-0 bg-white border-b border-slate-200 p-4 shrink-0 transition-all z-20">
        <div className="flex justify-between items-center">
          <div className="flex flex-col" onClick={() => setActiveTab('home')}>
            <h1 className="text-xl font-black tracking-tighter text-indigo-600 uppercase italic">
              Campus<span className="text-slate-900">Talent</span>
            </h1>
            <p className="text-[8px] uppercase tracking-widest font-bold text-slate-400">Economy for Students</p>
          </div>
          <button 
            onClick={() => setActiveTab('offer')}
            className="bg-slate-900 text-white text-[10px] font-bold px-4 py-2.5 rounded-lg active:scale-95"
          >
            Ofrecer
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-4 md:p-10 overflow-y-auto scrollbar-hide bg-[#F8FAFC]">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <HeroSection 
              key="hero-tab"
              onExplore={() => setActiveTab('explore')} 
              onOffer={() => setActiveTab('offer')} 
              servicesCount={services.length}
              connectionsCount={connectionsCount}
              topCategory={topCategory}
            />
          )}
          
          {activeTab === 'offer' && (
            <OfferForm 
              key="offer-tab"
              onServiceAdded={(service) => {
                const updatedServices = [service, ...services];
                saveServices(updatedServices);
                setActiveTab('explore');
              }} 
            />
          )}

          {activeTab === 'explore' && (
            <Marketplace 
              key="explore-tab"
              services={filteredServices} 
              onTrack={trackConnection}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
            />
          )}

          {activeTab === 'impact' && (
            <ImpactPanel 
              key="impact-tab"
              profilesCount={services.length} 
              connectionsCount={connectionsCount} 
              topCategory={topCategory} 
            />
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden flex h-16 bg-white border-t border-slate-200 shrink-0">
        <TabButton icon={<Navigation className="w-5 h-5 rotate-45" />} active={activeTab === 'home'} onClick={() => setActiveTab('home')} label="Inicio" />
        <TabButton icon={<Search className="w-5 h-5" />} active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} label="Explorar" />
        <TabButton icon={<TrendingUp className="w-5 h-5" />} active={activeTab === 'impact'} onClick={() => setActiveTab('impact')} label="Impacto" />
      </div>
    </div>
  );
}

function TabButton({ icon, active, onClick, label }: { icon: React.ReactNode, active: boolean, onClick: () => void, label: string, key?: React.Key }) {
  return (
    <button onClick={onClick} className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${active ? 'text-indigo-600 bg-indigo-50 border-t-4 border-indigo-600' : 'text-slate-400'}`}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </button>
  );
}

// --- Sections ---

function HeroSection({ onExplore, onOffer, servicesCount, connectionsCount, topCategory }: { onExplore: () => void, onOffer: () => void, servicesCount: number, connectionsCount: number, topCategory: string, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="max-w-4xl"
    >
      <header className="mb-12">
        <h2 className="text-6xl md:text-[80px] font-black leading-[0.85] tracking-tight italic uppercase block">
          Monetiza<br/><span className="text-indigo-600">tu Talento.</span>
        </h2>
        <p className="mt-8 text-slate-500 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
          La plataforma colaborativa donde los estudiantes enseñan, aprenden y validan el futuro del campus en tiempo real.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <button 
            onClick={onOffer}
            className="w-full sm:w-auto px-8 py-5 bg-slate-900 text-white font-black text-sm uppercase tracking-wider rounded-2xl hover:bg-slate-800 transition-all shadow-xl active:scale-95"
          >
            Ofrecer mi Servicio
          </button>
          <button 
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-5 border-2 border-slate-900 text-slate-900 font-black text-sm uppercase tracking-wider rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
          >
            Solicitar un Servicio
          </button>
        </div>
      </header>

      {/* Hero Stats */}
      <section className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Dashboard de Impacto</h3>
          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">EN VIVO</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Estudiantes Activos</p>
            <p className="text-4xl font-black text-slate-900 tracking-tighter">{servicesCount}</p>
            <div className="w-full bg-slate-100 h-1.5 mt-5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-[65%]" style={{ width: `${Math.min(100, (servicesCount / 10) * 100)}%` }}></div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Conexiones Totales</p>
            <p className="text-4xl font-black text-slate-900 tracking-tighter">{connectionsCount}</p>
            <p className="text-[10px] text-emerald-600 font-bold mt-4 flex items-center gap-1 italic uppercase underline decoration-emerald-200 decoration-2">
              <TrendingUp className="w-3 h-3" /> Generando valor
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Categoría Top</p>
            <p className="text-4xl font-black text-indigo-600 tracking-tighter italic uppercase truncate">{topCategory}</p>
            <p className="text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-widest">{servicesCount > 0 ? 'Demanda en crecimiento' : 'Esperando datos'}</p>
          </div>
        </div>
      </section>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<BookOpen className="text-indigo-600" />} 
          title="Tutorías" 
          desc="Nivelación académica directa de pares." 
        />
        <FeatureCard 
          icon={<Palette className="text-slate-900" />} 
          title="Diseño" 
          desc="Visuales potentes para tus proyectos." 
        />
        <FeatureCard 
          icon={<Briefcase className="text-slate-500" />} 
          title="Asesoría" 
          desc="Consultoría estratégica universitaria." 
        />
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:border-indigo-100 transition-all">
      <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter mb-2">{title}</h3>
      <p className="text-slate-500 text-xs font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function OfferForm({ onServiceAdded }: { onServiceAdded: (s: Service) => void, key?: React.Key }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tutorías',
    description: '',
    price: '',
    schedule: '',
    whatsapp: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: Service = {
      ...formData,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };
    onServiceAdded(newService);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="max-w-2xl mx-auto w-full bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-100/30 border border-slate-100"
    >
      <div className="mb-10 text-left">
        <h2 className="text-4xl font-black text-slate-900 mb-2 uppercase italic tracking-tighter">Ofrece tu Talento</h2>
        <p className="text-slate-400 font-medium text-sm">Completa el formulario para ser parte del marketplace masivo.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-1">Nombre Completo</label>
          <input 
            required
            type="text" 
            placeholder="Ej: Sofía Rodríguez"
            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-bold transition-all placeholder:text-slate-300"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-1">Categoría</label>
            <select 
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-bold transition-all appearance-none cursor-pointer"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-1">Precio / Inversión</label>
            <input 
              required
              type="text" 
              placeholder="Ej: $25 / total"
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-bold transition-all placeholder:text-slate-300"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-1">Descripción Detallada</label>
          <textarea 
            required
            rows={3}
            placeholder="Se específico. Ej: Enseño macros de Excel aplicadas a finanzas corporativas."
            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-bold transition-all resize-none placeholder:text-slate-300"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-1">Disponibilidad</label>
            <input 
              required
              type="text" 
              placeholder="Ej: L-V 6pm en adelante"
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-bold transition-all placeholder:text-slate-300"
              value={formData.schedule}
              onChange={e => setFormData({...formData, schedule: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-1">WhatsApp de Contacto</label>
            <input 
              required
              type="tel" 
              placeholder="300 000 0000"
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-bold transition-all placeholder:text-slate-300"
              value={formData.whatsapp}
              onChange={e => setFormData({...formData, whatsapp: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100/50 flex items-center justify-center gap-3 mt-4 active:scale-[0.98]"
        >
          Publicar mi Servicio
          <Navigation className="w-5 h-5 rotate-45" />
        </button>
      </form>
    </motion.div>
  );
}

function Marketplace({ 
  services, 
  onTrack, 
  searchQuery, 
  setSearchQuery, 
  filterCategory, 
  setFilterCategory 
}: { 
  services: Service[], 
  onTrack: () => void,
  searchQuery: string,
  setSearchQuery: (s: string) => void,
  filterCategory: string,
  setFilterCategory: (s: string) => void,
  key?: React.Key
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-12"
    >
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div className="w-full lg:max-w-md">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Filtrar Market</h3>
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
            <input 
              type="text"
              placeholder="Buscar por palabra clave..."
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-indigo-600/10 font-bold shadow-sm"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="w-full lg:w-auto">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Categorías</h3>
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {['Todas', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`whitespace-nowrap px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border-2 ${filterCategory === cat ? 'bg-slate-900 border-slate-900 text-white shadow-lg active:scale-95' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Servicios Disponibles</h3>
        <span className="text-[10px] font-bold text-slate-400">{services.length} resultados encontrados</span>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
          <Layers className="mx-auto w-12 h-12 text-slate-200 mb-6" />
          <h3 className="text-xl font-black text-slate-300 uppercase italic">Nada por aquí aún</h3>
          <p className="text-slate-300 text-xs font-bold uppercase tracking-widest mt-2">¡Saca tu talento a la luz!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} onContact={onTrack} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ServiceCard({ service, onContact }: { service: Service, onContact: () => void, key?: React.Key }) {
  const handleContact = () => {
    onContact();
    const cleanNumber = service.whatsapp.replace(/\D/g, ''); // Extract only digits
    const message = encodeURIComponent(`¡Hola ${service.name}! Vi tu anuncio en CampusTalent (Categoría: ${service.category}) y me interesa el servicio.`);
    window.open(`https://wa.me/57${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <motion.div 
      layout
      className="group bg-white rounded-[2rem] border border-slate-100 p-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-indigo-100/50 hover:border-indigo-100 transition-all duration-300 h-full"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
            {service.category}
          </span>
          <p className="text-sm font-black italic text-slate-900">
            {service.price}
          </p>
        </div>
        
        <h4 className="text-2xl font-black leading-none text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors uppercase italic tracking-tighter">
          {service.name}
        </h4>
        
        <p className="text-slate-400 text-xs font-bold leading-relaxed mb-8 line-clamp-3 uppercase tracking-tight">
          {service.description}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-3 text-slate-300 text-[10px] font-black uppercase mb-8 tracking-widest border-t border-slate-50 pt-6">
          <Navigation className="w-3 h-3 text-indigo-400" />
          {service.schedule}
        </div>

        <button 
          onClick={handleContact}
          className="w-full py-4 bg-emerald-500 text-white rounded-xl font-black text-[11px] uppercase tracking-[0.15em] hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-lg shadow-emerald-100"
        >
          Contactar Vía WhatsApp
        </button>
      </div>
    </motion.div>
  );
}

function ImpactPanel({ profilesCount, connectionsCount, topCategory }: { profilesCount: number, connectionsCount: number, topCategory: string, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-12"
    >
      <div className="text-left space-y-4">
        <h2 className="text-6xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">Métricas de<br/><span className="text-indigo-600">Impacto Real.</span></h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Monitoreo 24/7 de la validación del modelo de negocio de CampusTalent.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Estudiantes Monetizando</p>
          <div className="flex items-baseline gap-2">
            <p className="text-7xl font-black text-slate-900 tracking-tighter">{profilesCount}</p>
            <span className="text-indigo-600 font-black text-xl italic uppercase">Activos</span>
          </div>
          <div className="w-full bg-slate-100 h-2 mt-8 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, profilesCount * 2)}%` }}
              className="bg-indigo-600 h-full"
            />
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Interacciones Totales</p>
            <p className="text-7xl font-black text-slate-900 tracking-tighter">{connectionsCount}</p>
          </div>
          <p className="text-[10px] text-emerald-600 font-black mt-8 uppercase italic border-l-4 border-emerald-500 pl-4">
            Crecimiento exponencial en la confianza de la comunidad.
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Dominio del Campus</p>
          <p className="text-5xl font-black text-indigo-600 tracking-tighter uppercase italic break-words">{topCategory}</p>
          <p className="text-[11px] text-slate-400 font-bold mt-8 uppercase tracking-widest border-t border-slate-50 pt-6">Área con mayor validación de mercado.</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-6">
            <h3 className="text-5xl font-black uppercase italic tracking-tighter">¿Tu Talento está<br/>en el Radar?</h3>
            <p className="text-slate-400 font-medium text-lg leading-relaxed">Suma tu perfil al dashboard y ayuda a que CampusTalent alcance la siguiente meta de crecimiento.</p>
          </div>
          <button className="bg-white text-slate-900 px-10 py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl active:scale-95 shrink-0">
            Añadir mi Dato de Impacto
          </button>
        </div>
      </div>
    </motion.div>
  );
}

