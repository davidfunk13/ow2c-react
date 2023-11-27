interface Game {
    id?: number;
    created_at: Date; // 'timestamps()' creates 'created_at' and 'updated_at'
    updated_at: Date;
    game_role: "Tank" | "Damage" | "Support";
    game_mode: 0 | 1; // 0 for Quick Play, 1 for Competitive
    game_type: string; // "Control", "Escort", "Hybrid", "Push", "Flashpoint"
    hero_played: string;
    map_played: string;
    map_section_1?: string | null;
    map_section_2?: string | null;
    map_section_3?: string | null;
    map_played_id: number; // Foreign key reference to 'overwatch_maps'
    result: 0 | 1 | 2; // 0: loss, 1: win, 2: draw
    round_losses: number;
    round_1_outcome?: 0 | 1 | null; // 0: loss, 1: win, null: Not Played
    round_2_outcome?: 0 | 1 | null;
    round_3_outcome?: 0 | 1 | null;
    round_wins: number;
    additional_hero_played_1?: string | null;
    additional_hero_played_2?: string | null;
    user_id: number; // Foreign key reference to 'users'
}

export default Game;
