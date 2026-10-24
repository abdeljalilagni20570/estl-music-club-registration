import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { User, Send, Sparkles, RefreshCw } from 'lucide-react';
import logo from './logo.jpeg'; // استيراد الصورة من مجلد src

// إعداد اتصال Supabase بالمفاتيح الخاصة بك
const supabaseUrl = 'https://tibsyifxepxkdvfpniot.supabase.co';
const supabaseAnonKey = 'sb_publishable_a4prjO5tSVGwZldGVGFtYA_QdTnT26O';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ClubMusiqueDesign() {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // حالة حقول النموذج مطابقة تماماً لأعمدة قاعدة البيانات
  const [formData, setFormData] = useState({
    nom_complet: '',
    filiere: 'CDL',
    niveau: 'Débutant',
    instrument: 'Guitare',
    telephone: '',
  });

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nom_complet || !formData.telephone) {
      showNotification('Veuillez remplir les champs obligatoires !', 'error');
      return;
    }

    setLoading(true);

    try {
      // إرسال البيانات مباشرة إلى جدول data في Supabase
      const { error } = await supabase
        .from('data')
        .insert([
          {
            Full_Name: formData.nom_complet,
            Filiere: formData.filiere,
            Niveau: formData.niveau,
            musical_instrument: formData.instrument,
            Telephone: formData.telephone,
          }
        ]);

      if (error) throw error;

      showNotification('🎉 Votre inscription au Club de Musique ESTL a été effectuée avec succès !');
      setFormData({
        nom_complet: '',
        filiere: 'CDL',
        niveau: 'Débutant',
        instrument: 'Guitare',
        telephone: '',
      });
    } catch (err) {
      console.error('Erreur Supabase:', err);
      showNotification("Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard.", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black flex flex-col justify-between">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl font-medium text-sm animate-bounce ${
          notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-amber-500 text-neutral-950'
        }`}>
          <Sparkles className="w-5 h-5" />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo Image Integration */}
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-amber-500/30 shadow-lg shadow-amber-500/10 bg-neutral-900 flex items-center justify-center">
              <img 
                src={logo} 
                alt="Club de Musique ESTL Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Club de Musique — ESTL
              </h1>
              <p className="text-xs text-neutral-400 font-medium">École Supérieure de Technologie de Laâyoune</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-10 w-full">
        <div className="space-y-8">
          
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" /> Saison Universitaire ESTL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Rejoignez la magie de la musique à l'école 🎸
            </h2>
            <p className="text-sm text-neutral-400 max-w-lg mx-auto">
              Inscrivez-vous et choisissez votre instrument préféré pour participer aux prochaines activités et ateliers artistiques.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <h3 className="text-base font-semibold text-neutral-100 flex items-center gap-2">
                <User className="w-5 h-5 text-amber-400" />
                Formulaire d'Inscription Étudiant
              </h3>
              <p className="text-xs text-neutral-400 mt-1">Veuillez saisir des informations correctes afin que nous puissions vous contacter.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Nom complet */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">Nom et Prénom </label>
                <input
                  type="text"
                  name="nom_complet"
                  value={formData.nom_complet}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Filière */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">Filière </label>
                <select
                  name="filiere"
                  value={formData.filiere}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="CDL">CDL (Conception et Développement des logiciels)</option>
                  <option value="SDIA">SDIA (Sciences des données et IA)</option>
                  <option value="GC">GC (Génie Civil)</option>
                  <option value="GBB">GBB (Génie Biomédical)</option>
                  <option value="MPCN">MPCN (Medias et Production)</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              {/* Niveau */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">Niveau d'expérience </label>
                <select
                  name="niveau"
                  value={formData.niveau}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                </select>
              </div>

              {/* Instrument */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">Instrument Principal </label>
                <select
                  name="instrument"
                  value={formData.instrument}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="Guitare">Guitare</option>
                  <option value="Chant">Chant / Voix</option>
                  <option value="Piano">Piano</option>
                  <option value="Percussion">Percussion / Batterie</option>
                  <option value="Basse">Basse</option>
                </select>
              </div>

              {/* Téléphone */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">Téléphone / WhatsApp </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  placeholder="06XXXXXXXX"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 font-bold text-sm shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{loading ? 'Envoi en cours...' : "Confirmer et envoyer l'inscription"}</span>
            </button>
          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500">
        <p>© 2026 École Supérieure de Technologie de Laâyoune (ESTL) — Club de Musique</p>
      </footer>
    </div>
  );
}