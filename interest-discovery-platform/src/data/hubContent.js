export const HUB_CONTENT = {
    science: {
        learn: { title: "How do simple experiments work?", content: "Experiments help us test ideas! When you mix things or observe nature, you are being a scientist." },
        try: { title: "Try a safe experiment", content: "Mix baking soda and vinegar to make a volcano!" },
        see: { title: "See a scientist in action", content: "Watch how a 12-year-old discovered a new molecule." },
        ask: { title: "Ask a mentor", content: "How can I learn science at home?" }
    },
    technology: {
        learn: { title: "What is a gadget?", content: "Gadgets are tools that make life easier. They use electricity or mechanics to work." },
        try: { title: "Build a paper circuit", content: "Use copper tape and an LED to make a glowing card." },
        see: { title: "Robot Builder", content: "A story about a student who built a simple robot." },
        ask: { title: "Start small", content: "What should I start with?" }
    },
    math: {
        learn: { title: "Math is mostly patterns", content: "Everything in nature follows a pattern. Math is just the language we use to describe them." },
        try: { title: "Logic Puzzle", content: "Solve today’s logic puzzle: If A > B and B > C..." },
        see: { title: "Math in Art", content: "See how artists use geometry to create beautiful shapes." },
        ask: { title: "Getting unstuck", content: "What do I do when I don't understand a problem?" }
    },
    // Default content for others to ensure the UI works for all 24
    default: {
        learn: { title: "Discover new things", content: "Learning about this interest opens up new worlds." },
        try: { title: "Give it a go", content: "The best way to learn is by doing. Try a simple activity." },
        see: { title: "Inspiration", content: "See how others have turned this interest into a passion." },
        ask: { title: "Get advice", content: "Ask someone who loves this topic how they got started." }
    }
};

export const getHubContent = (id) => {
    return HUB_CONTENT[id] || HUB_CONTENT.default;
};
