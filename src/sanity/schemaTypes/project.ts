import { defineField, defineType } from "sanity";

export const projectType = defineType({
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Project Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            description: "e.g. Branding & Event, Sports Branding, Web Design",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 6,
            description: "Use blank lines to separate paragraphs.",
        }),
        defineField({
            name: "date",
            title: "Date / Period",
            type: "string",
            description: 'e.g. "2022 - TODAY" or "2023 - 2024"',
        }),
        defineField({
            name: "mainImage",
            title: "Main Image",
            type: "image",
            description: "Cover image shown in the portfolio card.",
            options: { hotspot: true },
        }),
        defineField({
            name: "images",
            title: "Gallery Images",
            type: "array",
            of: [
                {
                    type: "image",
                    options: { hotspot: true },
                },
            ],
            description: "All images for the project gallery. Drag to reorder.",
        }),
        defineField({
            name: "video",
            title: "Video URL",
            type: "url",
            description: "Optional: direct link to a video file (mp4, webm).",
        }),
        defineField({
            name: "orderRank",
            title: "Display Order",
            type: "number",
            description: "Lower numbers appear first. Use 10, 20, 30... to leave room between items.",
            validation: (Rule) => Rule.required().integer().positive(),
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "category",
            media: "mainImage",
        },
    },
    orderings: [
        {
            title: "Display Order",
            name: "orderRankAsc",
            by: [{ field: "orderRank", direction: "asc" }],
        },
    ],
});
