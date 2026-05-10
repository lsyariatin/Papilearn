export const sessions = [
  {
    id: 1,
    title: "Introduction to Cervical Cancer",
    speaker: "Dr. Andi",
    date: "10 April 2026",
    time: "19:00 WIB",
    zoom: "https://zoom.us/",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    attendance: "#",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=200&fit=crop",
    description: "Sesi ini membahas pengenalan dasar tentang kanker serviks, termasuk definisi, epidemiologi, dan faktor risiko utama.",
    materials: [
      {
        title: "Slide Presentasi",
        link: "https://drive.google.com/file/d/12f0SwepO8mR5gTRm3nE-f7o_5h5O89rD/view?usp=sharing",
      },
      {
        title: "E-book Cervical Cancer",
        link: "https://drive.google.com/",
      },
      {
        title: "Artikel WHO",
        link: "https://who.int/",
      },
    ],
  },

  {
    id: 2,
    title: "Early Detection & Screening",
    speaker: "Dr. Budi",
    date: "12 April 2026",
    time: "19:00 WIB",
    zoom: "https://zoom.us/",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    attendance: "https://forms.google.com/",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=200&fit=crop",
    description: "Pelajari metode deteksi dini kanker serviks, termasuk Pap smear, HPV testing, dan rekomendasi skrining.",
    materials: [
      { title: "Slide Screening", link: "#" },
      { title: "Panduan Pap Smear", link: "#" },
    ],
  },

  {
    id: 3,
    title: "HPV & Risk Factors",
    speaker: "Dr. Clara",
    date: "14 April 2026",
    time: "19:00 WIB",
    zoom: "https://zoom.us/",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    attendance: "https://forms.google.com/",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=200&fit=crop",
    description: "Memahami peran HPV dalam perkembangan kanker serviks dan faktor risiko yang dapat dikontrol.",
    materials: [
      { title: "HPV Guide", link: "#" },
      { title: "Research Paper", link: "#" },
    ],
  },

  {
    id: 4,
    title: "Intravaginal Treatment",
    speaker: "Dr. Dimas",
    date: "16 April 2026",
    time: "19:00 WIB",
    zoom: "https://zoom.us/",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    attendance: "https://forms.google.com/",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=200&fit=crop",
    description: "Eksplorasi metode pengobatan intravaginal untuk kanker serviks, termasuk mekanisme kerja dan efektivitas.",
    materials: [
      { title: "Treatment Slides", link: "#" },
      { title: "Clinical Study", link: "#" },
    ],
  },

  {
    id: 5,
    title: "Advanced Treatment",
    speaker: "Dr. Eka",
    date: "18 April 2026",
    time: "19:00 WIB",
    zoom: "https://zoom.us/",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    attendance: "https://forms.google.com/",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=200&fit=crop",
    description: "Pendekatan pengobatan modern dan terapi target untuk stadium lanjut kanker serviks.",
    materials: [
      { title: "Advanced Therapy", link: "#" },
    ],
  },

  {
    id: 6,
    title: "Case Study & Q&A",
    speaker: "Dr. Farah",
    date: "20 April 2026",
    time: "19:00 WIB",
    zoom: "https://zoom.us/",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    attendance: "https://forms.google.com/",
    image: "https://images.unsplash.com/photo-1631217868484-e4b0c8f74335?w=400&h=200&fit=crop",
    description: "Diskusi kasus nyata dan sesi tanya jawab untuk memperdalam pemahaman.",
    materials: [
      { title: "Case Study PDF", link: "#" },
      { title: "Discussion Notes", link: "#" },
    ],
  },
];

export function getSessions() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("sessions");
    if (stored) return JSON.parse(stored);
  }
  return sessions;
}
