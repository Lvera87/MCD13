// One-time script to import all projects from static data into Sanity.
// Run with: node scripts/seed.mjs
// Requires SANITY_API_TOKEN in .env.local

import { createReadStream, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@sanity/client";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

config({ path: join(ROOT, ".env.local") });

const TOKEN = process.env.SANITY_API_TOKEN;
if (!TOKEN) { console.error("Missing SANITY_API_TOKEN in .env.local"); process.exit(1); }

const client = createClient({
    projectId: "4jlrffy8",
    dataset: "production",
    apiVersion: "2025-01-01",
    token: TOKEN,
    useCdn: false,
});

const projects = [
    { id: "01", name: "CAFECITO 5K", category: "Branding & Event", date: "2022 - TODAY", orderRank: 10,
      image: "/projects/cafecito_5k/01_001.webp",
      images: ["/projects/cafecito_5k/01_001.webp","/projects/cafecito_5k/01_002.webp","/projects/cafecito_5k/01_003.webp","/projects/cafecito_5k/01_004.webp","/projects/cafecito_5k/01_005.webp","/projects/cafecito_5k/01_006.webp","/projects/cafecito_5k/01_008.webp","/projects/cafecito_5k/01_009.webp","/projects/cafecito_5k/03.webp"],
      description: "Cafecito 5K is a community-driven annual race held at Haulover Park in Miami Beach, created and produced by ODNLG LLC.\n\nWe developed the complete visual identity of the event — from logo design and medals to race shirts and the overall look & feel across every brand touchpoint." },
    { id: "02", name: "THE 5.4 FUNKY RUN", category: "Sports Branding", date: "2021 - TODAY", orderRank: 20,
      image: "/projects/02_T54FR/02_002.webp",
      images: ["/projects/02_T54FR/02_002.webp","/projects/02_T54FR/02_006.webp","/projects/02_T54FR/02_007.webp","/projects/02_T54FR/02_008.webp"],
      description: "The 5.4 Funky Run is a high-energy annual race known for its vibrant and playful identity. Over four consecutive years, we have led the visual development of the event.\n\nWe designed a cohesive brand system across all touchpoints — from medals and race kits to dynamic social media visuals, ensuring a consistent and engaging experience for participants and audiences alike." },
    { id: "03", name: "BE THERE 5K – THE FAIR", category: "Event Identity", date: "2023 - TODAY", orderRank: 30,
      image: "/projects/03_Be_There/03_002.webp",
      images: ["/projects/03_Be_There/03_002.webp","/projects/03_Be_There/03_003.webp","/projects/03_Be_There/03_004.webp","/projects/03_Be_There/03_005.webp","/projects/03_Be_There/03_007.webp","/projects/03_Be_There/03_008.webp","/projects/03_Be_There/03_009.webp"],
      description: "Be There 5K is a signature race experience connected to The Fair, blending fitness with entertainment and community. We developed the full visual identity of the event.\n\nOur work covered everything from medal design and race assets to social media visuals, creating a unified and recognizable brand presence across all platforms." },
    { id: "04", name: "RACE DAY PROFESSIONALS (RDP)", category: "Sports Branding", date: "2022 - TODAY", orderRank: 40,
      image: "/projects/04_RDP/04_002.webp",
      description: "Race Day Professionals is a company specialized in producing race events and experiences. We supported both the brand and its clients through comprehensive design solutions.\n\nFrom branded assets like inflatables and apparel to medals and race materials for multiple events, we ensured consistency, quality, and scalability across all visual outputs." },
    { id: "05", name: "LEGAMIO", category: "Corporate Identity", date: "2023 - 2025", orderRank: 50,
      image: "/projects/05_LEGAMIO/05_001.webp",
      images: ["/projects/05_LEGAMIO/05_001.webp","/projects/05_LEGAMIO/05_002.webp","/projects/05_LEGAMIO/05_003.webp","/projects/05_LEGAMIO/05_004.webp","/projects/05_LEGAMIO/05_005.webp","/projects/05_LEGAMIO/05_006.webp"],
      description: "Legamio is a digital platform focused on simplifying legal processes. We led the brand evolution from logo redesign to full product experience.\n\nOur work included UI/UX design for the web app, custom illustrations, and social media content, creating a modern, accessible, and user-friendly visual ecosystem." },
    { id: "06", name: "STB – STELA", category: "Tech & SaaS Branding", date: "2020 - 2025", orderRank: 60,
      image: "/projects/06_STB-STELLA/06_001.webp",
      images: ["/projects/06_STB-STELLA/06_001.webp","/projects/06_STB-STELLA/06_002.webp","/projects/06_STB-STELLA/06_003.webp","/projects/06_STB-STELLA/06_004.webp","/projects/06_STB-STELLA/06_005.webp","/projects/06_STB-STELLA/06_006.webp","/projects/06_STB-STELLA/06_007.webp"],
      description: "STB – Stela is a company focused on automated and AI-driven solutions based in Uruguay. We supported the brand's corporate design evolution from 2020 to 2025.\n\nOur scope included website design and B2B marketing assets, building a strong, professional identity aligned with the company's technological positioning." },
    { id: "07", name: "T-SHIRT LAB", category: "Apparel Branding", date: "2018 - 2024", orderRank: 70,
      image: "/projects/07_T-SHIRT LAB/07_001.webp",
      images: ["/projects/07_T-SHIRT LAB/07_001.webp","/projects/07_T-SHIRT LAB/07_002.webp","/projects/07_T-SHIRT LAB/07_003.webp","/projects/07_T-SHIRT LAB/07_004.webp","/projects/07_T-SHIRT LAB/07_005.webp","/projects/07_T-SHIRT LAB/07_006.webp","/projects/07_T-SHIRT LAB/07_007.webp"],
      description: "T-Shirt Lab is a Bogotá-based company specialized in garment printing and customization. We collaborated with the brand from 2018 to 2024.\n\nOur work focused on social media campaigns and corporate design, helping position the brand with a strong, consistent, and commercially effective visual identity." },
    { id: "08", name: "ITW", category: "Corporate Services", date: "2024", orderRank: 80,
      image: "/projects/08_ITW/08_001.webp",
      images: ["/projects/08_ITW/08_001.webp"],
      description: "ITW is a company focused on advanced solutions and corporate services. We developed a consistent and professional visual system aligned with its business objectives.\n\nFrom website design to B2B marketing materials, we created a cohesive brand presence that supports communication, credibility, and growth." },
    { id: "09", name: "URBAN", category: "Editorial Design", date: "2022 - 2024", orderRank: 90,
      image: "/projects/09_URBAN/09_001.webp",
      images: ["/projects/09_URBAN/09_001.webp"],
      description: "Urban is a travel insurance company based in Uruguay. We developed visual content aimed at both digital and traditional media channels.\n\nFrom social media video production to TV spots and corporate design, we created clear and engaging communication tailored to diverse audiences." },
    { id: "10", name: "SOULBOLT", category: "App UI/UX", date: "2024", orderRank: 100,
      image: "/projects/10_SOULBOLT/10_001.webp",
      images: ["/projects/10_SOULBOLT/10_001.webp"],
      description: "Soulbolt is a craft coffee brand launched in 2024 with a focus on quality and identity. We developed its complete corporate image.\n\nOur work included logo design and social media content, building a brand that feels authentic, warm, and visually distinctive." },
    { id: "11", name: "IDEATE", category: "Agency Branding", date: "2018 - 2024", orderRank: 110,
      image: "/projects/11_ideate/11_001.webp",
      images: ["/projects/11_ideate/11_001.webp"],
      description: "Ideate is an Australia-based company focused on high-level editorial design. We collaborated with the brand from 2018 to 2024.\n\nWe produced financial reports and infographics, delivering clean, structured, and visually compelling materials for corporate communication." },
    { id: "12", name: "TICKET EASY", category: "Product Design", date: "2024", orderRank: 120,
      image: "/projects/12_TE/12_001.webp",
      images: ["/projects/12_TE/ANIMA HEADER.webp","/projects/12_TE/12_001.webp"],
      description: "Ticket Easy is a Miami-based company specializing in traffic ticket assistance. We designed its website in 2024.\n\nThe project focused on creating a clear, user-friendly digital experience that communicates trust and simplifies access to legal support services." },
    { id: "13", name: "SALAZAR LAW FIRM", category: "Web Design", date: "2024", orderRank: 130,
      image: "/projects/12_TE/12_001.webp",
      images: ["/projects/12_TE/12_001.webp"],
      description: "Salazar Law Firm is the legal entity behind Ticket Easy. In 2024, we developed its corporate website.\n\nThe design highlights the firm's professionalism and expertise, creating a strong digital presence aligned with its legal services." },
    { id: "14", name: "ipm s.a.", category: "Corporate Identity", date: "2025", orderRank: 140,
      image: "/projects/13_IPM/13_001.webp",
      images: ["/projects/13_IPM/13_001.webp"],
      description: "ipm s.a. is a Colombian company dedicated to the exploitation and commercialization of mineral coal. We developed its corporate website in 2025.\n\nThe project focused on delivering a high-level digital presence that reflects the company's experience, scale, and professionalism within the industry." },
];

// Cache to avoid uploading the same image twice
const uploadCache = new Map();

async function uploadImage(localPath) {
    if (uploadCache.has(localPath)) return uploadCache.get(localPath);
    const fullPath = join(ROOT, "public", localPath);
    if (!existsSync(fullPath)) {
        console.warn(`  ⚠ Skipping missing file: ${localPath}`);
        return null;
    }
    const asset = await client.assets.upload("image", createReadStream(fullPath), {
        filename: localPath.split("/").pop(),
    });
    const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
    uploadCache.set(localPath, ref);
    return ref;
}

async function seed() {
    console.log("Starting import...\n");
    for (const project of projects) {
        process.stdout.write(`→ ${project.name} `);

        const mainImage = project.image ? await uploadImage(project.image) : null;
        process.stdout.write(".");

        const galleryImages = [];
        if (project.images) {
            for (const imgPath of project.images) {
                const img = await uploadImage(imgPath);
                if (img) galleryImages.push({ ...img, _key: Math.random().toString(36).slice(2) });
                process.stdout.write(".");
            }
        }

        await client.create({
            _type: "project",
            name: project.name,
            category: project.category,
            date: project.date,
            description: project.description,
            orderRank: project.orderRank,
            ...(mainImage && { mainImage }),
            ...(galleryImages.length > 0 && { images: galleryImages }),
        });

        console.log(" ✓");
    }
    console.log("\n✅ All projects imported successfully!");
}

seed().catch((err) => { console.error(err); process.exit(1); });
