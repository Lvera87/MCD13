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
        image: "/projects/cafecito_5k/01_001.webp",
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
        name: "THE 5.4 FUNKY RUN",
        category: "Sports Branding",
        image: "/projects/02_T54FR/02_002.webp",
        images: [
            "/projects/02_T54FR/02_002.webp",
            "/projects/02_T54FR/02_006.webp",
            "/projects/02_T54FR/02_007.webp",
            "/projects/02_T54FR/02_008.webp"
        ],
        video: "/projects/02_T54FR/02_medalla.mp4",
        description: "The 5.4 Funky Run is a high-energy annual race known for its vibrant and playful identity. Over four consecutive years, we have led the visual development of the event.\n\nWe designed a cohesive brand system across all touchpoints — from medals and race kits to dynamic social media visuals, ensuring a consistent and engaging experience for participants and audiences alike."
    },
    {
        id: "03",
        name: "BE THERE 5K – THE FAIR",
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
        description: "Be There 5K is a signature race experience connected to The Fair, blending fitness with entertainment and community. We developed the full visual identity of the event.\n\nOur work covered everything from medal design and race assets to social media visuals, creating a unified and recognizable brand presence across all platforms."
    },
    {
        id: "04",
        name: "RACE DAY PROFESSIONALS (RDP)",
        category: "Sports Branding",
        image: "/projects/04_RDP/04_002.webp",
        description: "Race Day Professionals is a company specialized in producing race events and experiences. We supported both the brand and its clients through comprehensive design solutions.\n\nFrom branded assets like inflatables and apparel to medals and race materials for multiple events, we ensured consistency, quality, and scalability across all visual outputs."
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
        description: "Legamio is a digital platform focused on simplifying legal processes. We led the brand evolution from logo redesign to full product experience.\n\nOur work included UI/UX design for the web app, custom illustrations, and social media content, creating a modern, accessible, and user-friendly visual ecosystem."
    },
    {
        id: "06",
        name: "STB – STELA",
        category: "Tech & SaaS Branding",
        image: "/projects/06_STB-STELLA/06_001.webp",
        images: [
            "/projects/06_STB-STELLA/06_001.webp",
            "/projects/06_STB-STELLA/06_002.webp",
            "/projects/06_STB-STELLA/06_003.webp",
            "/projects/06_STB-STELLA/06_004.webp",
            "/projects/06_STB-STELLA/06_005.webp",
            "/projects/06_STB-STELLA/06_006.webp",
            "/projects/06_STB-STELLA/06_007.webp"
        ],
        description: "STB – Stela is a company focused on automated and AI-driven solutions based in Uruguay. We supported the brand’s corporate design evolution from 2020 to 2025.\n\nOur scope included website design and B2B marketing assets, building a strong, professional identity aligned with the company’s technological positioning."
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
        description: "T-Shirt Lab is a Bogotá-based company specialized in garment printing and customization. We collaborated with the brand from 2018 to 2024.\n\nOur work focused on social media campaigns and corporate design, helping position the brand with a strong, consistent, and commercially effective visual identity."
    },
    {
        id: "08",
        name: "ITW",
        category: "Corporate Services",
        image: "/projects/08_ITW/08_001.webp",
        images: ["/projects/08_ITW/08_001.webp"],
        description: "ITW is a company focused on advanced solutions and corporate services. We developed a consistent and professional visual system aligned with its business objectives.\n\nFrom website design to B2B marketing materials, we created a cohesive brand presence that supports communication, credibility, and growth."
    },
    {
        id: "09",
        name: "URBAN",
        category: "Editorial Design",
        image: "/projects/09_URBAN/09_001.webp",
        images: ["/projects/09_URBAN/09_001.webp"],
        description: "Urban is a travel insurance company based in Uruguay. We developed visual content aimed at both digital and traditional media channels.\n\nFrom social media video production to TV spots and corporate design, we created clear and engaging communication tailored to diverse audiences."
    },
    {
        id: "10",
        name: "SOULBOLT",
        category: "App UI/UX",
        image: "/projects/10_SOULBOLT/10_001.webp",
        images: ["/projects/10_SOULBOLT/10_001.webp"],
        description: "Soulbolt is a craft coffee brand launched in 2024 with a focus on quality and identity. We developed its complete corporate image.\n\nOur work included logo design and social media content, building a brand that feels authentic, warm, and visually distinctive."
    },
    {
        id: "11",
        name: "IDEATE",
        category: "Agency Branding",
        image: "/projects/11_ideate/11_001.webp",
        images: ["/projects/11_ideate/11_001.webp"],
        description: "Ideate is an Australia-based company focused on high-level editorial design. We collaborated with the brand from 2018 to 2024.\n\nWe produced financial reports and infographics, delivering clean, structured, and visually compelling materials for corporate communication."
    },
    {
        id: "12",
        name: "TICKET EASY",
        category: "Product Design",
        image: "/projects/12_TE/12_001.webp",
        images: [
            "/projects/12_TE/ANIMA HEADER.webp",
            "/projects/12_TE/12_001.webp"
        ],
        description: "Ticket Easy is a Miami-based company specializing in traffic ticket assistance. We designed its website in 2024.\n\nThe project focused on creating a clear, user-friendly digital experience that communicates trust and simplifies access to legal support services."
    },
    {
        id: "13",
        name: "SALAZAR LAW FIRM",
        category: "Web Design",
        image: "/projects/12_TE/12_001.webp", // Reuse folder 12 as they are related
        images: [
            "/projects/12_TE/12_001.webp"
        ],
        description: "Salazar Law Firm is the legal entity behind Ticket Easy. In 2024, we developed its corporate website.\n\nThe design highlights the firm’s professionalism and expertise, creating a strong digital presence aligned with its legal services."
    },
    {
        id: "14",
        name: "ipm s.a.",
        category: "Corporate Identity",
        image: "/projects/13_IPM/13_001.webp",
        images: ["/projects/13_IPM/13_001.webp"],
        description: "ipm s.a. is a Colombian company dedicated to the exploitation and commercialization of mineral coal. We developed its corporate website in 2025.\n\nThe project focused on delivering a high-level digital presence that reflects the company’s experience, scale, and professionalism within the industry."
    },
];
