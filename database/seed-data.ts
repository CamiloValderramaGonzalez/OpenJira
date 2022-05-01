interface ISeedData {
    entries: ISeedEntry[];
}

interface ISeedEntry {
    description: string;
    status: string;
    createAt: number;
}

export const seedData: ISeedData = {
    entries: [
        {
            description:
                "Pendiente lorem dasfhjasdk dlsk sdlksa aslk31dmdps sdksl ",
            status: "pending",
            createAt: Date.now(),
        },
        {
            description:
                "Terminada lorem dasfhjasdk dlsk sdlksa aslk31dmdps sdksl ",
            status: "finished",
            createAt: Date.now() - 1000000,
        },
        {
            description:
                "En progreso lorem dasfhjasdk dlsk sdlksa aslk31dmdps sdksl ",
            status: "in-progress",
            createAt: Date.now() - 2000000,
        },
    ],
};
