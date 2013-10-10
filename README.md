Programancer is a game in which the player plays as a programmer trapped in the game he was creating. Gameplay functions via creating "rules" that apply to entities in the game.

Levels are top-down dungeon-crawler style, with fixed gridbased obstacles and unfixed integer movement.

Difficulty levels:
- Easy: Craft spells on the fly through a paused menu
- Medium: Prepare spells before attempting the level
- Hard: Prepare spells, and spells are projectiles that must be aimed

All entities in the game are based on triggering events - "onRender", "onMove", "onTakeDamage", etc. Each has an associated "frequency" cost - the more frequent, the higher cost

Each entity has an "obfuscation" score, which is a multiplier that increases the cost of spells targeted against it
