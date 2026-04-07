import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
    name: "mcd-portfolio",
    title: "MCD Design Portfolio",

    projectId,
    dataset,

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title("Portfolio")
                    .items([
                        S.listItem()
                            .title("Projects")
                            .child(
                                S.documentList()
                                    .title("Projects")
                                    .filter('_type == "project"')
                                    .defaultOrdering([
                                        { field: "orderRank", direction: "asc" },
                                    ])
                            ),
                    ]),
        }),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
});
