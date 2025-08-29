export const competitions = [
    {
        label: "Overall Career",
        options: [
            // THE FIX: The value is now "all-competitions" to match our data structure.
            { value: "all-competitions", name: "All Time Stats" },
        ]
    },
    {
        label: "UEFA Competitions",
        options: [
            { value: "champions-league", name: "UEFA Champions League" },
            { value: "europa-league", name: "UEFA Europa League" },
        ]
    },
    {
        label: "England",
        options: [
            { value: "premier-league", name: "Premier League" },
            { value: "fa-cup", name: "FA Cup" },
        ]
    },
    {
        label: "Spain",
        options: [
            { value: "la-liga", name: "La Liga" },
            { value: "copa-del-rey", name: "Copa Del Rey" },
        ]
    },
    // ... (rest of the competitions remain the same)
    {
        label: "Germany",
        options: [
            { value: "bundesliga", name: "Bundesliga" },
            { value: "dfb-pokal", name: "DFB-Pokal" },
        ]
    },
    {
        label: "Italy",
        options: [
            { value: "serie-a", name: "Serie A" },
            { value: "coppa-italia", name: "Coppa Italia" },
        ]
    },
    {
        label: "France",
        options: [
            { value: "ligue-1", name: "Ligue 1" },
            { value: "coupe-de-france", name: "Coupe de France" },
        ]
    },
];