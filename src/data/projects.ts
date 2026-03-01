export type Project = {
    id: string;
    name: string;
    category: string;
    image?: string;
    images?: string[];
    description: string;
    socialLinks?: {
        instagram?: string;
        linkedin?: string;
    };
};

export const projects: Project[] = [
    {
        id: "01",
        name: "CAFECITO 5K",
        category: "Branding & Event",
        image: "/projects/cafecito_5k/main.png",
        description: "Visual identity and promotional materials for a local 5K coffee-themed charity run.",
        socialLinks: {
            instagram: "cafecito5k",
            linkedin: "cafecito-5k"
        }
    },
    {
        id: "02",
        name: "(RDP) FUNKY RUN",
        category: "Sports Branding",
        image: "/projects/funky_run.png",
        description: "Vibrant and energetic visual system for an urban obstacle course event."
    },
    {
        id: "03",
        name: "BE THERE - THE FAIR",
        category: "Event Identity",
        image: "/projects/be_there_fair.png",
        description: "Comprehensive branding strategy for a massive city-wide cultural fair."
    },
    {
        id: "04",
        name: "LEGAMIO",
        category: "Corporate Identity",
        image: "/projects/legamio.png",
        description: "Sleek, minimalist corporate branding and logo design for a legal tech startup."
    },
    {
        id: "05",
        name: "STB - STELA",
        category: "Tech & SaaS Branding",
        image: "/projects/stela.png",
        description: "Brand identity, UI concepts, and digital presence for a forward-thinking tech company."
    },
    {
        id: "06",
        name: "ITW",
        category: "Corporate Evolution",
        image: "/projects/itw.png",
        description: "A complete visual rebranding aimed at modernizing a legacy B2B enterprise."
    },
    { id: "07", name: "T-SHIRT LAB", category: "Apparel Branding", description: "Urban streetwear brand formulation." },
    { id: "08", name: "URBAN", category: "Editorial Design", description: "Layout and styling for a modern architecture magazine." },
    { id: "09", name: "SOULBOLT", category: "App UI/UX", description: "User interface for a high-intensity workout application." },
    { id: "10", name: "IDEATE", category: "Agency Branding", description: "Internal branding for a creative design agency." },
    { id: "11", name: "TICKET-EASY", category: "Product Design", description: "Ticketing platform interface and user experience." },
    { id: "12", name: "SALAZARLAWFIRM", category: "Web Design", description: "Professional portfolio site for a law firm." },
    { id: "13", name: "IPMSA", category: "Corporate Identity", description: "Industrial company branding refresh." },
];
