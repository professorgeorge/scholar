export const themes = [
  {
    id: "education",
    name: "Education & institutional change",
    question:
      "How can universities adapt while protecting access and academic purpose?",
    description:
      "Research on academic leadership, internationalization, educational technology, and the organizational changes that make innovation possible.",
    lenses: ["Sociology", "Philosophy"],
    color: "#326b69",
  },
  {
    id: "technology",
    name: "Technology & human judgment",
    question: "What changes when people share decisions with digital systems?",
    description:
      "Work on artificial intelligence, technology adoption, trust, and the relationship between human agency and automated systems.",
    lenses: ["Psychology", "Philosophy"],
    color: "#9a593b",
  },
  {
    id: "organizations",
    name: "Leadership & responsible enterprise",
    question: "How do organizations make decisions under competing demands?",
    description:
      "Studies of strategic leadership, governance, organizational behavior, consumer decisions, and service relationships.",
    lenses: ["Psychology", "Economics"],
    color: "#6a668b",
  },
  {
    id: "communities",
    name: "Mobility, inclusion & sustainability",
    question: "Who benefits from economic change, and who bears its costs?",
    description:
      "Research across tourism, healthcare, finance, and community development examines participation, place, and the tensions within sustainable growth.",
    lenses: ["Economics", "Sociology"],
    color: "#8a742f",
  },
] as const;
