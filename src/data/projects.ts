export type Project = {
    id: string;
    name: string;
    category: string;
    image?: string;
    images?: string[];
    video?: string;
    description: string;
};

export const projects: Project[] = [
    {
        id: "01",
        name: "CAFECITO 5K",
        category: "Branding & Event",
        image: "/projects/cafecito_5k/main.webp",
        images: [
            "/projects/cafecito_5k/01_001.webp",
            "/projects/cafecito_5k/01_002.webp",
            "/projects/cafecito_5k/01_003.webp",
            "/projects/cafecito_5k/01_004.webp",
            "/projects/cafecito_5k/01_005.webp",
            "/projects/cafecito_5k/01_006.webp",
            "/projects/cafecito_5k/01_008.webp",
            "/projects/cafecito_5k/01_009.webp",
            "/projects/cafecito_5k/03.webp"
        ],
        description: "Cafecito 5K is a community-driven annual race held at Haulover Park in Miami Beach, created and produced by ODNLG LLC.\n\nWe developed the complete visual identity of the event — from logo design and medals to race shirts and the overall look & feel across every brand touchpoint."
    },
    {
        id: "02",
        name: "(RDP) FUNKY RUN",
        category: "Sports Branding",
        image: "/projects/02_T54FR/02_002.webp",
        images: [
            "/projects/02_T54FR/02_002.webp",
            "/projects/02_T54FR/02_006.webp",
            "/projects/02_T54FR/02_007.webp",
            "/projects/02_T54FR/02_008.webp"
        ],
        video: "/projects/02_T54FR/02_medalla.mp4",
        description: "Vibrant and energetic visual system for an urban obstacle course event."
    },
    {
        id: "03",
        name: "BE THERE - THE FAIR",
        category: "Event Identity",
        image: "/projects/03_Be_There/03_002.webp",
        images: [
            "/projects/03_Be_There/03_002.webp",
            "/projects/03_Be_There/03_003.webp",
            "/projects/03_Be_There/03_004.webp",
            "/projects/03_Be_There/03_005.webp",
            "/projects/03_Be_There/03_007.webp",
            "/projects/03_Be_There/03_008.webp",
            "/projects/03_Be_There/03_009.webp"
        ],
        description: "Comprehensive branding strategy and visual identity for a massive event experience."
    },
    {
        id: "04",
        name: "RDP",
        category: "Sports Branding",
        image: "/projects/04_RDP/04_002.webp",
        description: "Visual identity and high-impact branding for sports events."
    },
    {
        id: "05",
        name: "LEGAMIO",
        category: "Corporate Identity",
        image: "/projects/05_LEGAMIO/05_001.webp",
        images: [
            "/projects/05_LEGAMIO/05_001.webp",
            "/projects/05_LEGAMIO/05_002.webp",
            "/projects/05_LEGAMIO/05_003.webp",
            "/projects/05_LEGAMIO/05_004.webp",
            "/projects/05_LEGAMIO/05_005.webp",
            "/projects/05_LEGAMIO/05_006.webp",
            "/projects/05_LEGAMIO/05_00-.webp"
        ],
        video: "/projects/05_LEGAMIO/Bird animate FRONT.webp",
        description: "Sleek, minimalist corporate branding and logo design for a legal tech environment."
    },
    {
        id: "06",
        name: "STB - STELA",
        category: "Tech & SaaS Branding",
        image: "/projects/06_STB-STELLA/06_002.webp",
        images: [
            "/projects/06_STB-STELLA/06_001.webp",
            "/projects/06_STB-STELLA/06_002.webp",
            "/projects/06_STB-STELLA/06_003.webp",
            "/projects/06_STB-STELLA/06_004.webp",
            "/projects/06_STB-STELLA/06_005.webp",
            "/projects/06_STB-STELLA/06_006.webp",
            "/projects/06_STB-STELLA/06_007.webp"
        ],
        description: "Brand identity and digital presence for a forward-thinking tech company."
    },
    {
        id: "07",
        name: "T-SHIRT LAB",
        category: "Apparel Branding",
        image: "/projects/07_T-SHIRT LAB/07_001.webp",
        images: [
            "/projects/07_T-SHIRT LAB/07_001.webp",
            "/projects/07_T-SHIRT LAB/07_002.webp",
            "/projects/07_T-SHIRT LAB/07_003.webp",
            "/projects/07_T-SHIRT LAB/07_004.webp",
            "/projects/07_T-SHIRT LAB/07_005.webp",
            "/projects/07_T-SHIRT LAB/07_006.webp",
            "/projects/07_T-SHIRT LAB/07_007.webp"
        ],
        description: "Urban streetwear brand formulation."
    },
    {
        id: "08",
        name: "ITW",
        category: "Web Design",
        image: "/projects/08_ITW/08_001.webp",
        images: ["/projects/08_ITW/08_001.webp"],
        description: "Innovative tech solutions branding."
    },
    {
        id: "09",
        name: "URBAN",
        category: "Editorial Design",
        image: "/projects/09_URBAN/09_001.webp",
        images: ["/projects/09_URBAN/09_001.webp"],
        description: "Layout and styling for a modern architecture magazine."
    },
    {
        id: "10",
        name: "SOULBOLT",
        category: "App UI/UX",
        image: "/projects/10_SOULBOLT/10_001.webp",
        images: ["/projects/10_SOULBOLT/10_001.webp"],
        description: "User interface for a high-intensity workout application."
    },
    {
        id: "11",
        name: "IDEATE",
        category: "Agency Branding",
        image: "/projects/11_ideate/11_001.webp",
        images: ["/projects/11_ideate/11_001.webp"],
        description: "Internal branding for a creative design agency."
    },
    {
        id: "12",
        name: "TICKET-EASY",
        category: "Product Design",
        image: "/projects/12_TE/ANIMA HEADER.webp",
        images: [
            "/projects/12_TE/ANIMA HEADER.webp",
            "/projects/12_TE/12_001.webp"
        ],
        description: "Ticketing platform interface and user experience."
    },
    {
        id: "13",
        name: "IPM",
        category: "Corporate Identity",
        image: "/projects/13_IPM/13_001.webp",
        images: ["/projects/13_IPM/13_001.webp"],
        description: "Industrial company branding refresh."
    },
];
