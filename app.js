// PlayerVerse - Complete Production App.js
// Premium Football Platform

// ============================================
// COUNTRIES DATABASE
// ============================================
const countries = [
    {
        id: 1,
        name: "France",
        flag: "🇫🇷",
        formation: "4-3-3",
        colors: ["#0055A4", "#FFFFFF", "#EF4135"],
        players: [
            { id: 1, name: "Kylian Mbappé", club: "Real Madrid", position: "Forward", age: 25, height: "1.78m", goals: 46, caps: 75, bio: "One of the world's most exciting forwards, known for exceptional pace and finishing.", image: null },
            { id: 2, name: "Antoine Griezmann", club: "Atletico Madrid", position: "Forward", age: 33, height: "1.76m", goals: 44, caps: 127, bio: "Versatile attacker and World Cup winner with exceptional football IQ.", image: null },
            { id: 3, name: "Kylian Mbappé", club: "Real Madrid", position: "Forward", age: 25, height: "1.78m", goals: 46, caps: 75, bio: "One of the world's most exciting forwards, known for exceptional pace and finishing.", image: null },
            { id: 4, name: "Olivier Giroud", club: "AC Milan", position: "Forward", age: 37, height: "1.93m", goals: 56, caps: 131, bio: "Target man and France's all-time leading goalscorer.", image: null },
            { id: 5, name: "Aurélien Tchouaméni", club: "Real Madrid", position: "Midfielder", age: 24, height: "1.87m", goals: 3, caps: 31, bio: "Powerful defensive midfielder with excellent ball-winning ability.", image: null },
            { id: 6, name: "Eduardo Camavinga", club: "Real Madrid", position: "Midfielder", age: 21, height: "1.82m", goals: 1, caps: 17, bio: "Dynamic young midfielder with exceptional versatility.", image: null },
            { id: 7, name: "Adrien Rabiot", club: "Marseille", position: "Midfielder", age: 29, height: "1.88m", goals: 4, caps: 43, bio: "Box-to-box midfielder known for physical presence and technical ability.", image: null },
            { id: 8, name: "Jules Koundé", club: "Barcelona", position: "Defender", age: 25, height: "1.78m", goals: 0, caps: 25, bio: "Modern center-back comfortable on the ball and strong in defense.", image: null },
            { id: 9, name: "Dayot Upamecano", club: "Bayern Munich", position: "Defender", age: 25, height: "1.86m", goals: 2, caps: 18, bio: "Powerful center-back known for aggressive defending and pace.", image: null },
            { id: 10, name: "Ibrahima Konaté", club: "Liverpool", position: "Defender", age: 25, height: "1.94m", goals: 0, caps: 14, bio: "Physical center-back with excellent aerial ability.", image: null },
            { id: 11, name: "Theo Hernandez", club: "AC Milan", position: "Defender", age: 26, height: "1.84m", goals: 2, caps: 24, bio: "Attacking left-back with exceptional pace and crossing.", image: null },
            { id: 12, name: "Benjamin Pavard", club: "Inter Milan", position: "Defender", age: 28, height: "1.86m", goals: 2, caps: 53, bio: "Versatile defender known for defensive solidity.", image: null },
            { id: 13, name: "Mike Maignan", club: "AC Milan", position: "Goalkeeper", age: 28, height: "1.91m", goals: 0, caps: 14, bio: "World-class goalkeeper with exceptional reflexes.", image: null },
            { id: 14, name: "Brice Samba", club: "Lens", position: "Goalkeeper", age: 30, height: "1.87m", goals: 0, caps: 3, bio: "Reliable goalkeeper known for shot-stopping.", image: null },
            { id: 15, name: "Randal Kolo Muani", club: "PSG", position: "Forward", age: 25, height: "1.87m", goals: 7, caps: 18, bio: "Versatile forward with pace and finishing ability.", image: null }
        ]
    },
    {
        id: 2,
        name: "Argentina",
        flag: "🇦🇷",
        formation: "4-4-2",
        colors: ["#75AADB", "#FFFFFF", "#000000"],
        players: [
            { id: 16, name: "Lionel Messi", club: "Inter Miami", position: "Forward", age: 36, height: "1.70m", goals: 106, caps: 180, bio: "Eight-time Ballon d'Or winner, widely regarded as the greatest footballer of all time.", image: null },
            { id: 17, name: "Julián Álvarez", club: "Atletico Madrid", position: "Forward", age: 24, height: "1.70m", goals: 12, caps: 31, bio: "Energetic forward with excellent movement and finishing.", image: null },
            { id: 18, name: "Lautaro Martínez", club: "Inter Milan", position: "Forward", age: 26, height: "1.74m", goals: 24, caps: 56, bio: "Clinical striker and captain material for club and country.", image: null },
            { id: 19, name: "Ángel Di María", club: "Benfica", position: "Midfielder", age: 36, height: "1.78m", goals: 31, caps: 136, bio: "Big-game player with exceptional dribbling and creativity.", image: null },
            { id: 20, name: "Rodrigo De Paul", club: "Atletico Madrid", position: "Midfielder", age: 30, height: "1.80m", goals: 2, caps: 62, bio: "Energetic midfielder known for work rate and passing.", image: null },
            { id: 21, name: "Enzo Fernández", club: "Chelsea", position: "Midfielder", age: 23, height: "1.78m", goals: 4, caps: 23, bio: "Creative midfielder with excellent vision and passing range.", image: null },
            { id: 22, name: "Alexis Mac Allister", club: "Liverpool", position: "Midfielder", age: 25, height: "1.76m", goals: 2, caps: 25, bio: "Versatile midfielder known for technical ability and intelligence.", image: null },
            { id: 23, name: "Nicolás Otamendi", club: "Benfica", position: "Defender", age: 36, height: "1.83m", goals: 4, caps: 108, bio: "Experienced center-back known for aggressive defending.", image: null },
            { id: 24, name: "Cristian Romero", club: "Tottenham", position: "Defender", age: 26, height: "1.85m", goals: 1, caps: 32, bio: "Physical center-back with excellent tackling ability.", image: null },
            { id: 25, name: "Nicolás Tagliafico", club: "Lyon", position: "Defender", age: 31, height: "1.72m", goals: 1, caps: 57, bio: "Experienced left-back known for defensive reliability.", image: null },
            { id: 26, name: "Gonzalo Montiel", club: "Nottingham Forest", position: "Defender", age: 27, height: "1.75m", goals: 1, caps: 25, bio: "Right-back known for penalty-winning heroics.", image: null },
            { id: 27, name: "Emiliano Martínez", club: "Aston Villa", position: "Goalkeeper", age: 31, height: "1.95m", goals: 0, caps: 38, bio: "World Cup-winning goalkeeper with exceptional penalty-saving ability.", image: null },
            { id: 28, name: "Franco Armani", club: "River Plate", position: "Goalkeeper", age: 37, height: "1.89m", goals: 0, caps: 19, bio: "Experienced goalkeeper with excellent reflexes.", image: null },
            { id: 29, name: "Thiago Almada", club: "Botafogo", position: "Midfielder", age: 23, height: "1.71m", goals: 2, caps: 5, bio: "Creative attacking midfielder with excellent dribbling.", image: null },
            { id: 30, name: "Alejandro Garnacho", club: "Manchester United", position: "Forward", age: 19, height: "1.80m", goals: 1, caps: 5, bio: "Exciting young winger with pace and skill.", image: null }
        ]
    },
    {
        id: 3,
        name: "Brazil",
        flag: "🇧🇷",
        formation: "4-3-3",
        colors: ["#FFD700", "#009C3B", "#002776"],
        players: [
            { id: 31, name: "Vinícius Jr", club: "Real Madrid", position: "Forward", age: 23, height: "1.76m", goals: 3, caps: 28, bio: "Electric winger and Champions League winner with exceptional dribbling.", image: null },
            { id: 32, name: "Neymar Jr", club: "Al Hilal", position: "Forward", age: 32, height: "1.75m", goals: 79, caps: 128, bio: "Brazil's all-time leading goalscorer with incredible skill and creativity.", image: null },
            { id: 33, name: "Rodrygo", club: "Real Madrid", position: "Forward", age: 23, height: "1.74m", goals: 5, caps: 22, bio: "Versatile forward with excellent technical ability.", image: null },
            { id: 34, name: "Richarlison", club: "Tottenham", position: "Forward", age: 27, height: "1.84m", goals: 20, caps: 48, bio: "Passionate forward known for work rate and finishing.", image: null },
            { id: 35, name: "Casemiro", club: "Manchester United", position: "Midfielder", age: 32, height: "1.85m", goals: 7, caps: 75, bio: "World-class defensive midfielder with winning mentality.", image: null },
            { id: 36, name: "Bruno Guimarães", club: "Newcastle", position: "Midfielder", age: 26, height: "1.82m", goals: 1, caps: 19, bio: "Complete midfielder with passing and defensive ability.", image: null },
            { id: 37, name: "Lucas Paquetá", club: "West Ham", position: "Midfielder", age: 26, height: "1.80m", goals: 10, caps: 44, bio: "Creative attacking midfielder with flair and vision.", image: null },
            { id: 38, name: "Marquinhos", club: "PSG", position: "Defender", age: 30, height: "1.83m", goals: 6, caps: 85, bio: "Captain and world-class center-back with leadership.", image: null },
            { id: 39, name: "Éder Militão", club: "Real Madrid", position: "Defender", age: 26, height: "1.86m", goals: 2, caps: 30, bio: "Powerful center-back with pace and strength.", image: null },
            { id: 40, name: "Thiago Silva", club: "Fluminense", position: "Defender", age: 39, height: "1.83m", goals: 7, caps: 113, bio: "Legendary defender with exceptional positioning.", image: null },
            { id: 41, name: "Danilo", club: "Juventus", position: "Defender", age: 32, height: "1.84m", goals: 1, caps: 56, bio: "Versatile full-back with defensive solidity.", image: null },
            { id: 42, name: "Alex Telles", club: "Al Nassr", position: "Defender", age: 31, height: "1.81m", goals: 0, caps: 12, bio: "Attacking left-back with crossing ability.", image: null },
            { id: 43, name: "Alisson Becker", club: "Liverpool", position: "Goalkeeper", age: 31, height: "1.93m", goals: 0, caps: 63, bio: "World's best goalkeeper with exceptional shot-stopping.", image: null },
            { id: 44, name: "Ederson", club: "Manchester City", position: "Goalkeeper", age: 30, height: "1.88m", goals: 0, caps: 25, bio: "Modern goalkeeper with incredible distribution.", image: null },
            { id: 45, name: "Raphinha", club: "Barcelona", position: "Forward", age: 27, height: "1.76m", goals: 6, caps: 22, bio: "Dynamic winger with pace and crossing ability.", image: null }
        ]
    },
    {
        id: 4,
        name: "Spain",
        flag: "🇪🇸",
        formation: "4-3-3",
        colors: ["#C60B1E", "#FFC400", "#AD1519"],
        players: [
            { id: 46, name: "Pedri", club: "Barcelona", position: "Midfielder", age: 21, height: "1.74m", goals: 1, caps: 20, bio: "Creative midfielder with exceptional vision and composure.", image: null },
            { id: 47, name: "Gavi", club: "Barcelona", position: "Midfielder", age: 19, height: "1.73m", goals: 5, caps: 25, bio: "Youngest Spain debutant with incredible energy and talent.", image: null },
            { id: 48, name: "Álvaro Morata", club: "Atletico Madrid", position: "Forward", age: 31, height: "1.90m", goals: 34, caps: 72, bio: "Target man with excellent aerial ability.", image: null },
            { id: 49, name: "Dani Olmo", club: "RB Leipzig", position: "Midfielder", age: 26, height: "1.79m", goals: 8, caps: 33, bio: "Creative attacking midfielder with technical excellence.", image: null },
            { id: 50, name: "Rodri", club: "Manchester City", position: "Midfielder", age: 28, height: "1.91m", goals: 2, caps: 47, bio: "World-class defensive midfielder and Ballon d'Or winner.", image: null },
            { id: 51, name: "Fabián Ruiz", club: "PSG", position: "Midfielder", age: 28, height: "1.89m", goals: 3, caps: 27, bio: "Technical midfielder with powerful shot.", image: null },
            { id: 52, name: "Aymeric Laporte", club: "Al Nassr", position: "Defender", age: 30, height: "1.89m", goals: 1, caps: 29, bio: "Ball-playing center-back with excellent passing.", image: null },
            { id: 53, name: "Pau Torres", club: "Aston Villa", position: "Defender", age: 27, height: "1.91m", goals: 1, caps: 23, bio: "Modern center-back comfortable on the ball.", image: null },
            { id: 54, name: "Jordi Alba", club: "Inter Miami", position: "Defender", age: 35, height: "1.70m", goals: 10, caps: 93, bio: "Attacking full-back with exceptional pace.", image: null },
            { id: 55, name: "Dani Carvajal", club: "Real Madrid", position: "Defender", age: 32, height: "1.73m", goals: 1, caps: 44, bio: "Experienced right-back with winning mentality.", image: null },
            { id: 56, name: "Unai Simón", club: "Athletic Bilbao", position: "Goalkeeper", age: 27, height: "1.90m", goals: 0, caps: 38, bio: "First-choice goalkeeper with excellent reflexes.", image: null },
            { id: 57, name: "David Raya", club: "Arsenal", position: "Goalkeeper", age: 28, height: "1.83m", goals: 0, caps: 6, bio: "Shot-stopper with modern distribution skills.", image: null },
            { id: 58, name: "Mikel Oyarzabal", club: "Real Sociedad", position: "Forward", age: 27, height: "1.81m", goals: 11, caps: 31, bio: "Versatile forward with excellent technical ability.", image: null },
            { id: 59, name: "Ferrán Torres", club: "Barcelona", position: "Forward", age: 24, height: "1.84m", goals: 19, caps: 40, bio: "Dynamic winger with goal-scoring instinct.", image: null },
            { id: 60, name: "Nico Williams", club: "Athletic Bilbao", position: "Forward", age: 21, height: "1.81m", goals: 3, caps: 15, bio: "Exciting young winger with explosive pace.", image: null }
        ]
    },
    {
        id: 5,
        name: "England",
        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        formation: "4-2-3-1",
        colors: ["#1B458F", "#FFFFFF", "#E00000"],
        players: [
            { id: 61, name: "Harry Kane", club: "Bayern Munich", position: "Forward", age: 30, height: "1.88m", goals: 63, caps: 90, bio: "England's all-time leading goalscorer and complete striker.", image: null },
            { id: 62, name: "Jude Bellingham", club: "Real Madrid", position: "Midfielder", age: 20, height: "1.86m", goals: 4, caps: 29, bio: "Generational talent with incredible maturity and skill.", image: null },
            { id: 63, name: "Bukayo Saka", club: "Arsenal", position: "Forward", age: 22, height: "1.78m", goals: 11, caps: 32, bio: "Creative winger with excellent dribbling and work rate.", image: null },
            { id: 64, name: "Phil Foden", club: "Manchester City", position: "Midfielder", age: 24, height: "1.71m", goals: 4, caps: 33, bio: "Technical genius with incredible close control.", image: null },
            { id: 65, name: "Declan Rice", club: "Arsenal", position: "Midfielder", age: 25, height: "1.85m", goals: 3, caps: 48, bio: "Elite defensive midfielder with leadership.", image: null },
            { id: 66, name: "Mason Mount", club: "Manchester United", position: "Midfielder", age: 25, height: "1.81m", goals: 8, caps: 36, bio: "Energetic midfielder with goal threat.", image: null },
            { id: 67, name: "John Stones", club: "Manchester City", position: "Defender", age: 30, height: "1.88m", goals: 3, caps: 69, bio: "Ball-playing defender with tactical intelligence.", image: null },
            { id: 68, name: "Harry Maguire", club: "Manchester United", position: "Defender", age: 31, height: "1.94m", goals: 7, caps: 63, bio: "Physical center-back with aerial dominance.", image: null },
            { id: 69, name: "Kyle Walker", club: "Manchester City", position: "Defender", age: 34, height: "1.78m", goals: 1, caps: 82, bio: "Incredible pace and defensive versatility.", image: null },
            { id: 70, name: "Luke Shaw", club: "Manchester United", position: "Defender", age: 28, height: "1.78m", goals: 3, caps: 31, bio: "Attacking left-back with crossing ability.", image: null },
            { id: 71, name: "Jordan Pickford", club: "Everton", position: "Goalkeeper", age: 30, height: "1.85m", goals: 0, caps: 58, bio: "First-choice goalkeeper with shot-stopping excellence.", image: null },
            { id: 72, name: "Aaron Ramsdale", club: "Arsenal", position: "Goalkeeper", age: 26, height: "1.88m", goals: 0, caps: 4, bio: "Modern goalkeeper with good distribution.", image: null },
            { id: 73, name: "Marcus Rashford", club: "Manchester United", position: "Forward", age: 26, height: "1.80m", goals: 17, caps: 59, bio: "Pacey forward with clinical finishing.", image: null },
            { id: 74, name: "Jack Grealish", club: "Manchester City", position: "Midfielder", age: 28, height: "1.75m", goals: 2, caps: 35, bio: "Creative dribbler with exceptional ball control.", image: null },
            { id: 75, name: "Trent Alexander-Arnold", club: "Liverpool", position: "Defender", age: 25, height: "1.80m", goals: 2, caps: 23, bio: "Revolutionary right-back with incredible passing.", image: null }
        ]
    },
    {
        id: 6,
        name: "Germany",
        flag: "🇩🇪",
        formation: "4-2-3-1",
        colors: ["#000000", "#DD0000", "#FFCE00"],
        players: [
            { id: 76, name: "Jamal Musiala", club: "Bayern Munich", position: "Midfielder", age: 21, height: "1.84m", goals: 2, caps: 27, bio: "Dribbling genius with exceptional close control.", image: null },
            { id: 77, name: "Kai Havertz", club: "Arsenal", position: "Forward", age: 25, height: "1.93m", goals: 15, caps: 45, bio: "Versatile attacker with excellent technique.", image: null },
            { id: 78, name: "İlkay Gündoğan", club: "Barcelona", position: "Midfielder", age: 33, height: "1.80m", goals: 18, caps: 76, bio: "Captain with exceptional football intelligence.", image: null },
            { id: 79, name: "Joshua Kimmich", club: "Bayern Munich", position: "Midfielder", age: 29, height: "1.77m", goals: 6, caps: 82, bio: "World-class midfielder with incredible versatility.", image: null },
            { id: 80, name: "Leon Goretzka", club: "Bayern Munich", position: "Midfielder", age: 29, height: "1.89m", goals: 14, caps: 55, bio: "Powerful box-to-box midfielder.", image: null },
            { id: 81, name: "Thomas Müller", club: "Bayern Munich", position: "Forward", age: 34, height: "1.85m", goals: 45, caps: 126, bio: "Legendary Raumdeuter with incredible football IQ.", image: null },
            { id: 82, name: "Leroy Sané", club: "Bayern Munich", position: "Forward", age: 28, height: "1.83m", goals: 13, caps: 58, bio: "Explosive winger with pace and skill.", image: null },
            { id: 83, name: "Antonio Rüdiger", club: "Real Madrid", position: "Defender", age: 31, height: "1.90m", goals: 3, caps: 65, bio: "Physical center-back with aggressive defending.", image: null },
            { id: 84, name: "Niklas Süle", club: "Borussia Dortmund", position: "Defender", age: 28, height: "1.95m", goals: 1, caps: 48, bio: "Powerful center-back with surprising agility.", image: null },
            { id: 85, name: "David Raum", club: "RB Leipzig", position: "Defender", age: 26, height: "1.80m", goals: 0, caps: 21, bio: "Attacking left-back with crossing ability.", image: null },
            { id: 86, name: "Manuel Neuer", club: "Bayern Munich", position: "Goalkeeper", age: 38, height: "1.93m", goals: 0, caps: 119, bio: "Revolutionary goalkeeper and sweeper-keeper.", image: null },
            { id: 87, name: "Marc-André ter Stegen", club: "Barcelona", position: "Goalkeeper", age: 32, height: "1.87m", goals: 0, caps: 38, bio: "Elite shot-stopper with exceptional reflexes.", image: null },
            { id: 88, name: "Florian Wirtz", club: "Bayer Leverkusen", position: "Midfielder", age: 21, height: "1.76m", goals: 2, caps: 18, bio: "Creative prodigy with incredible vision.", image: null },
            { id: 89, name: "Niclas Füllkrug", club: "Borussia Dortmund", position: "Forward", age: 31, height: "1.89m", goals: 11, caps: 16, bio: "Target man with powerful finishing.", image: null },
            { id: 90, name: "Jonathan Tah", club: "Bayer Leverkusen", position: "Defender", age: 28, height: "1.95m", goals: 0, caps: 22, bio: "Physical center-back with aerial strength.", image: null }
        ]
    },
    {
        id: 7,
        name: "Portugal",
        flag: "🇵🇹",
        formation: "4-3-3",
        colors: ["#006600", "#FF0000", "#FFFFFF"],
        players: [
            { id: 91, name: "Cristiano Ronaldo", club: "Al Nassr", position: "Forward", age: 39, height: "1.87m", goals: 128, caps: 205, bio: "Five-time Ballon d'Or winner and all-time leading goalscorer.", image: null },
            { id: 92, name: "Bruno Fernandes", club: "Manchester United", position: "Midfielder", age: 29, height: "1.79m", goals: 22, caps: 64, bio: "Creative playmaker with goal-scoring ability.", image: null },
            { id: 93, name: "Bernardo Silva", club: "Manchester City", position: "Midfielder", age: 29, height: "1.73m", goals: 12, caps: 87, bio: "Technical wizard with incredible work rate.", image: null },
            { id: 94, name: "Rúben Dias", club: "Manchester City", position: "Defender", age: 27, height: "1.87m", goals: 2, caps: 52, bio: "World-class center-back and leader.", image: null },
            { id: 95, name: "João Cancelo", club: "Barcelona", position: "Defender", age: 30, height: "1.82m", goals: 5, caps: 53, bio: "Versatile full-back with technical excellence.", image: null },
            { id: 96, name: "Rafael Leão", club: "AC Milan", position: "Forward", age: 25, height: "1.88m", goals: 4, caps: 25, bio: "Explosive winger with incredible pace.", image: null },
            { id: 97, name: "Diogo Jota", club: "Liverpool", position: "Forward", age: 27, height: "1.78m", goals: 13, caps: 36, bio: "Clinical forward with exceptional finishing.", image: null },
            { id: 98, name: "João Félix", club: "Barcelona", position: "Forward", age: 24, height: "1.81m", goals: 7, caps: 34, bio: "Creative forward with flair and technique.", image: null },
            { id: 99, name: "Rúben Neves", club: "Al Hilal", position: "Midfielder", age: 27, height: "1.80m", goals: 4, caps: 46, bio: "Deep-lying playmaker with passing range.", image: null },
            { id: 100, name: "Vitinha", club: "PSG", position: "Midfielder", age: 24, height: "1.72m", goals: 0, caps: 16, bio: "Technical midfielder with press resistance.", image: null },
            { id: 101, name: "Pepe", club: "Porto", position: "Defender", age: 41, height: "1.88m", goals: 8, caps: 136, bio: "Legendary defender and European champion.", image: null },
            { id: 102, name: "Nuno Mendes", club: "PSG", position: "Defender", age: 21, height: "1.84m", goals: 0, caps: 20, bio: "Explosive left-back with athleticism.", image: null },
            { id: 103, name: "Diogo Costa", club: "Porto", position: "Goalkeeper", age: 24, height: "1.86m", goals: 0, caps: 22, bio: "Modern goalkeeper with excellent reflexes.", image: null },
            { id: 104, name: "Gonçalo Ramos", club: "PSG", position: "Forward", age: 22, height: "1.85m", goals: 4, caps: 11, bio: "Promising striker with goal instinct.", image: null },
            { id: 105, name: "António Silva", club: "Benfica", position: "Defender", age: 20, height: "1.87m", goals: 0, caps: 10, bio: "Young defensive prodigy with composure.", image: null }
        ]
    },
    {
        id: 8,
        name: "Netherlands",
        flag: "🇳🇱",
        formation: "4-3-3",
        colors: ["#FF6200", "#FFFFFF", "#21468B"],
        players: [
            { id: 106, name: "Virgil van Dijk", club: "Liverpool", position: "Defender", age: 32, height: "1.93m", goals: 7, caps: 64, bio: "World-class center-back and captain.", image: null },
            { id: 107, name: "Frenkie de Jong", club: "Barcelona", position: "Midfielder", age: 27, height: "1.81m", goals: 2, caps: 54, bio: "Elegant midfielder with exceptional dribbling.", image: null },
            { id: 108, name: "Memphis Depay", club: "Atletico Madrid", position: "Forward", age: 30, height: "1.76m", goals: 45, caps: 90, bio: "Creative forward with flair and power.", image: null },
            { id: 109, name: "Cody Gakpo", club: "Liverpool", position: "Forward", age: 25, height: "1.93m", goals: 9, caps: 23, bio: "Versatile forward with physical presence.", image: null },
            { id: 110, name: "Xavi Simons", club: "RB Leipzig", position: "Midfielder", age: 21, height: "1.79m", goals: 1, caps: 14, bio: "Creative prodigy with exceptional talent.", image: null },
            { id: 111, name: "Denzel Dumfries", club: "Inter Milan", position: "Defender", age: 28, height: "1.88m", goals: 6, caps: 52, bio: "Athletic right-back with goal threat.", image: null },
            { id: 112, name: "Nathan Aké", club: "Manchester City", position: "Defender", age: 29, height: "1.80m", goals: 5, caps: 43, bio: "Versatile defender with technical ability.", image: null },
            { id: 113, name: "Matthijs de Ligt", club: "Bayern Munich", position: "Defender", age: 24, height: "1.89m", goals: 2, caps: 44, bio: "Physical center-back with leadership.", image: null },
            { id: 114, name: "Daley Blind", club: "Girona", position: "Defender", age: 34, height: "1.80m", goals: 3, caps: 103, bio: "Experienced defender with intelligence.", image: null },
            { id: 115, name: "Marten de Roon", club: "Atalanta", position: "Midfielder", age: 33, height: "1.85m", goals: 1, caps: 42, bio: "Defensive midfielder with work rate.", image: null },
            { id: 116, name: "Teun Koopmeiners", club: "Atalanta", position: "Midfielder", age: 26, height: "1.84m", goals: 2, caps: 21, bio: "Goal-scoring midfielder with technique.", image: null },
            { id: 117, name: "Wout Weghorst", club: "Hoffenheim", position: "Forward", age: 31, height: "1.97m", goals: 11, caps: 36, bio: "Target man with aerial ability.", image: null },
            { id: 118, name: "Steven Bergwijn", club: "Ajax", position: "Forward", age: 26, height: "1.78m", goals: 8, caps: 33, bio: "Pacey winger with dribbling skills.", image: null },
            { id: 119, name: "Justin Bijlow", club: "Feyenoord", position: "Goalkeeper", age: 26, height: "1.88m", goals: 0, caps: 8, bio: "Talented goalkeeper with reflexes.", image: null },
            { id: 120, name: "Mark Flekken", club: "Brentford", position: "Goalkeeper", age: 30, height: "1.95m", goals: 0, caps: 6, bio: "Reliable shot-stopper with presence.", image: null }
        ]
    },
    {
        id: 9,
        name: "Uzbekistan",
        flag: "🇺🇿",
        formation: "4-4-2",
        colors: ["#1EB53A", "#0099B0", "#FFFFFF"],
        players: [
            { id: 121, name: "Eldor Shomurodov", club: "Cagliari", position: "Forward", age: 28, height: "1.90m", goals: 13, caps: 68, bio: "Uzbekistan's star striker with physical presence.", image: null },
            { id: 122, name: "Jaloliddin Masharipov", club: "Esteghlal", position: "Midfielder", age: 30, height: "1.74m", goals: 12, caps: 55, bio: "Creative winger with exceptional dribbling.", image: null },
            { id: 123, name: "Oston Urunov", club: "Persepolis", position: "Midfielder", age: 23, height: "1.79m", goals: 4, caps: 24, bio: "Talented attacking midfielder with vision.", image: null },
            { id: 124, name: "Husniddin Aliqulov", club: "Çaykur Rizespor", position: "Defender", age: 25, height: "1.85m", goals: 1, caps: 27, bio: "Solid center-back with defensive strength.", image: null },
            { id: 125, name: "Farrukh Sayfiev", club: "Pakhtakor", position: "Defender", age: 33, height: "1.80m", goals: 2, caps: 44, bio: "Experienced full-back with leadership.", image: null },
            { id: 126, name: "Odil Ahmedov", club: "Tianjin Jinmen Tiger", position: "Midfielder", age: 36, height: "1.81m", goals: 19, caps: 108, bio: "Legendary captain and midfield general.", image: null },
            { id: 127, name: "Igor Sergeev", club: "Pakhtakor", position: "Forward", age: 31, height: "1.87m", goals: 16, caps: 64, bio: "Clinical striker with goal-scoring instinct.", image: null },
            { id: 128, name: "Azizbek Turgunboev", club: "Navbahor", position: "Midfielder", age: 29, height: "1.78m", goals: 3, caps: 33, bio: "Dynamic midfielder with energy.", image: null },
            { id: 129, name: "Umar Eshmurodov", club: "Nasaf", position: "Defender", age: 31, height: "1.82m", goals: 0, caps: 16, bio: "Reliable center-back with experience.", image: null },
            { id: 130, name: "Dostonbek Khamdamov", club: "Pakhtakor", position: "Midfielder", age: 27, height: "1.77m", goals: 6, caps: 32, bio: "Creative midfielder with technical skill.", image: null },
            { id: 131, name: "Khojiakbar Alijonov", club: "Navbahor", position: "Defender", age: 27, height: "1.82m", goals: 1, caps: 22, bio: "Attacking full-back with crossing.", image: null },
            { id: 132, name: "Abror Ismoilov", club: "Navbahor", position: "Goalkeeper", age: 26, height: "1.91m", goals: 0, caps: 5, bio: "Promising goalkeeper with potential.", image: null },
            { id: 133, name: "Utkir Yusupov", club: "Navbahor", position: "Goalkeeper", age: 33, height: "1.88m", goals: 0, caps: 20, bio: "Experienced goalkeeper with reflexes.", image: null },
            { id: 134, name: "Bobur Abdikholikov", club: "Nasaf", position: "Forward", age: 27, height: "1.86m", goals: 5, caps: 15, bio: "Target forward with aerial ability.", image: null },
            { id: 135, name: "Shakhzod Ubaydullaev", club: "Pakhtakor", position: "Midfielder", age: 26, height: "1.76m", goals: 2, caps: 12, bio: "Technical midfielder with passing.", image: null }
        ]
    },
    {
        id: 10,
        name: "Colombia",
        flag: "🇨🇴",
        formation: "4-3-3",
        colors: ["#FCD116", "#003893", "#CE1126"],
        players: [
            { id: 136, name: "Luis Díaz", club: "Liverpool", position: "Forward", age: 27, height: "1.80m", goals: 12, caps: 48, bio: "Electric winger with incredible dribbling.", image: null },
            { id: 137, name: "James Rodríguez", club: "São Paulo", position: "Midfielder", age: 32, height: "1.80m", goals: 28, caps: 95, bio: "Creative playmaker with golden left foot.", image: null },
            { id: 138, name: "Radamel Falcao", club: "Rayo Vallecano", position: "Forward", age: 38, height: "1.77m", goals: 36, caps: 104, bio: "Legendary striker and all-time great.", image: null },
            { id: 139, name: "Juan Cuadrado", club: "Inter Milan", position: "Midfielder", age: 36, height: "1.79m", goals: 11, caps: 116, bio: "Dynamic winger with pace and skill.", image: null },
            { id: 140, name: "Dávinson Sánchez", club: "Galatasaray", position: "Defender", age: 28, height: "1.87m", goals: 2, caps: 58, bio: "Physical center-back with strength.", image: null },
            { id: 141, name: "Yerry Mina", club: "Cagliari", position: "Defender", age: 29, height: "1.95m", goals: 7, caps: 41, bio: "Towering defender with aerial threat.", image: null },
            { id: 142, name: "Daniel Muñoz", club: "Crystal Palace", position: "Defender", age: 28, height: "1.82m", goals: 1, caps: 25, bio: "Attacking right-back with energy.", image: null },
            { id: 143, name: "Jefferson Lerma", club: "Crystal Palace", position: "Midfielder", age: 29, height: "1.79m", goals: 3, caps: 41, bio: "Defensive midfielder with work rate.", image: null },
            { id: 144, name: "Mateus Uribe", club: "Al Sadd", position: "Midfielder", age: 33, height: "1.82m", goals: 6, caps: 55, bio: "Box-to-box midfielder with goals.", image: null },
            { id: 145, name: "Rafael Santos Borré", club: "Werder Bremen", position: "Forward", age: 28, height: "1.74m", goals: 6, caps: 32, bio: "Hard-working forward with finishing.", image: null },
            { id: 146, name: "Jhon Durán", club: "Aston Villa", position: "Forward", age: 20, height: "1.85m", goals: 1, caps: 7, bio: "Promising young striker with potential.", image: null },
            { id: 147, name: "Jhon Lucumí", club: "Bologna", position: "Defender", age: 26, height: "1.87m", goals: 0, caps: 18, bio: "Ball-playing center-back with composure.", image: null },
            { id: 148, name: "Deiver Machado", club: "Lens", position: "Defender", age: 30, height: "1.78m", goals: 1, caps: 9, bio: "Attacking left-back with pace.", image: null },
            { id: 149, name: "Camilo Vargas", club: "Atlas", position: "Goalkeeper", age: 35, height: "1.85m", goals: 0, caps: 22, bio: "Experienced goalkeeper with leadership.", image: null },
            { id: 150, name: "Álvaro Montero", club: "Millonarios", position: "Goalkeeper", age: 29, height: "1.95m", goals: 0, caps: 8, bio: "Tall goalkeeper with shot-stopping.", image: null }
        ]
    },
    {
        id: 11,
        name: "DR Congo",
        flag: "🇨🇩",
        formation: "4-4-2",
        colors: ["#007FFF", "#F7D117", "#CE1026"],
        players: [
            { id: 151, name: "Yoane Wissa", club: "Brentford", position: "Forward", age: 27, height: "1.76m", goals: 6, caps: 25, bio: "Pacey forward with goal-scoring instinct.", image: null },
            { id: 152, name: "Cédric Bakambu", club: "Betis", position: "Forward", age: 33, height: "1.82m", goals: 16, caps: 48, bio: "Experienced striker with pace.", image: null },
            { id: 153, name: "Chancel Mbemba", club: "Marseille", position: "Defender", age: 29, height: "1.82m", goals: 3, caps: 75, bio: "Powerful center-back with leadership.", image: null },
            { id: 154, name: "Arthur Masuaku", club: "Besiktas", position: "Defender", age: 30, height: "1.79m", goals: 1, caps: 18, bio: "Attacking full-back with skill.", image: null },
            { id: 155, name: "Gaël Kakuta", club: "Amiens", position: "Midfielder", age: 33, height: "1.73m", goals: 4, caps: 28, bio: "Creative attacking midfielder with flair.", image: null },
            { id: 156, name: "Théo Bongonda", club: "Spartak Moscow", position: "Midfielder", age: 28, height: "1.77m", goals: 2, caps: 12, bio: "Dynamic winger with dribbling.", image: null },
            { id: 157, name: "Samuel Moutoussamy", club: "Nantes", position: "Midfielder", age: 27, height: "1.76m", goals: 0, caps: 18, bio: "Box-to-box midfielder with energy.", image: null },
            { id: 158, name: "Edo Kayembe", club: "Watford", position: "Midfielder", age: 26, height: "1.83m", goals: 1, caps: 10, bio: "Defensive midfielder with physicality.", image: null },
            { id: 159, name: "Dylan Batubinsika", club: "Saint-Étienne", position: "Defender", age: 28, height: "1.86m", goals: 0, caps: 8, bio: "Solid center-back with strength.", image: null },
            { id: 160, name: "Henoc Inonga Baka", club: "Simba SC", position: "Defender", age: 26, height: "1.84m", goals: 0, caps: 15, bio: "Versatile defender with pace.", image: null },
            { id: 161, name: "Simon Banza", club: "Braga", position: "Forward", age: 27, height: "1.89m", goals: 4, caps: 11, bio: "Tall striker with aerial ability.", image: null },
            { id: 162, name: "Fiston Mayele", club: "Pyramids FC", position: "Forward", age: 29, height: "1.83m", goals: 5, caps: 20, bio: "Clinical striker with finishing.", image: null },
            { id: 163, name: "Lionel Mpasi", club: "Rodez", position: "Goalkeeper", age: 29, height: "1.84m", goals: 0, caps: 12, bio: "Reliable goalkeeper with reflexes.", image: null },
            { id: 164, name: "Joël Kiassumbua", club: "Le Mont", position: "Goalkeeper", age: 32, height: "1.91m", goals: 0, caps: 6, bio: "Experienced goalkeeper with presence.", image: null },
            { id: 165, name: "Grady Diangana", club: "West Brom", position: "Midfielder", age: 26, height: "1.79m", goals: 1, caps: 4, bio: "Creative winger with dribbling.", image: null }
        ]
    }
];

// ============================================
// UTILITIES
// ============================================
const getRandomImage = (playerName) => {
    const emojis = ["⭐", "🔥", "⚡", "🎯", "💫", "✨", "🌟", "⚽", "🏆", "🎩"];
    return emojis[Math.floor(Math.random() * emojis.length)];
};

// ============================================
// PARTICLE BACKGROUND SYSTEM
// ============================================
class ParticleBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5
            });
        }
        
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let p of this.particles) {
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 243, 255, ${p.alpha})`;
            this.ctx.fill();
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// MOUSE GLOW EFFECT
// ============================================
class MouseGlow {
    constructor() {
        this.glow = null;
        this.init();
    }

    init() {
        this.glow = document.createElement('div');
        this.glow.style.position = 'fixed';
        this.glow.style.width = '400px';
        this.glow.style.height = '400px';
        this.glow.style.borderRadius = '50%';
        this.glow.style.background = 'radial-gradient(circle, rgba(0,243,255,0.1) 0%, transparent 70%)';
        this.glow.style.pointerEvents = 'none';
        this.glow.style.zIndex = '1';
        this.glow.style.transition = 'transform 0.1s ease';
        document.body.appendChild(this.glow);
        
        document.addEventListener('mousemove', (e) => {
            this.glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
        });
    }
}

// ============================================
// RENDER COUNTRIES
// ============================================
function renderCountries() {
    const grid = document.getElementById('countryGrid');
    if (!grid) return;
    
    grid.innerHTML = countries.map(country => `
        <div class="country-card" data-country-id="${country.id}" style="animation: fadeInUp 0.5s ease forwards">
            <div class="country-flag">${country.flag}</div>
            <div class="country-name">${country.name}</div>
            <div class="country-formation">⚙️ ${country.formation}</div>
            <div class="country-players">👥 ${country.players.length} Players</div>
        </div>
    `).join('');
    
    document.querySelectorAll('.country-card').forEach(card => {
        card.addEventListener('click', () => openCountry(parseInt(card.dataset.countryId)));
        card.addEventListener('mouseenter', (e) => {
            e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', (e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============================================
// OPEN COUNTRY
// ============================================
function openCountry(countryId) {
    const country = countries.find(c => c.id === countryId);
    if (!country) return;
    
    const teamSection = document.getElementById('teamSection');
    const teamName = document.getElementById('teamName');
    const teamFlag = document.getElementById('teamFlag');
    const teamFormation = document.getElementById('teamFormation');
    const playersGrid = document.getElementById('playersGrid');
    
    if (teamName) teamName.textContent = country.name;
    if (teamFlag) teamFlag.textContent = country.flag;
    if (teamFormation) teamFormation.textContent = `FORMATION: ${country.formation}`;
    
    if (playersGrid) {
        playersGrid.innerHTML = country.players.map((player, index) => `
            <div class="player-card" data-player-id="${player.id}" style="animation: fadeInUp ${0.2 + index * 0.02}s ease forwards">
                <div class="player-image">${player.image || getRandomImage(player.name)}</div>
                <div class="player-name">${player.name}</div>
                <div class="player-info">${player.club} • ${player.position}</div>
                <div class="player-stats">⚽ ${player.goals} goals • 🎯 ${player.caps} caps</div>
            </div>
        `).join('');
        
        document.querySelectorAll('.player-card').forEach(card => {
            card.addEventListener('click', () => openPlayerModal(parseInt(card.dataset.playerId)));
            card.addEventListener('mouseenter', (e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)';
            });
            card.addEventListener('mouseleave', (e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    if (teamSection) {
        teamSection.style.display = 'block';
        teamSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// RENDER PLAYERS (ALL PLAYERS PAGE)
// ============================================
function renderPlayers() {
    const playersGrid = document.getElementById('playersGrid');
    if (!playersGrid) return;
    
    const allPlayers = countries.flatMap(c => c.players);
    
    playersGrid.innerHTML = allPlayers.map((player, index) => `
        <div class="player-card" data-player-id="${player.id}" style="animation: fadeInUp ${0.1 + index * 0.01}s ease forwards">
            <div class="player-image">${player.image || getRandomImage(player.name)}</div>
            <div class="player-name">${player.name}</div>
            <div class="player-info">${player.club} • ${player.position}</div>
            <div class="player-stats">⚽ ${player.goals} goals • 🎯 ${player.caps} caps</div>
        </div>
    `).join('');
    
    document.querySelectorAll('.player-card').forEach(card => {
        card.addEventListener('click', () => openPlayerModal(parseInt(card.dataset.playerId)));
        card.addEventListener('mouseenter', (e) => {
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)';
        });
        card.addEventListener('mouseleave', (e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============================================
// SEARCH PLAYERS
// ============================================
function searchPlayers() {
    const searchInput = document.getElementById('playerSearch');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const allPlayers = countries.flatMap(c => c.players);
    const playersGrid = document.getElementById('playersGrid');
    
    const filtered = allPlayers.filter(player => 
        player.name.toLowerCase().includes(searchTerm) ||
        player.club.toLowerCase().includes(searchTerm) ||
        player.position.toLowerCase().includes(searchTerm)
    );
    
    if (playersGrid) {
        if (filtered.length === 0) {
            playersGrid.innerHTML = '<div style="text-align: center; grid-column: 1/-1; padding: 60px;">🔍 No players found</div>';
            return;
        }
        
        playersGrid.innerHTML = filtered.map((player, index) => `
            <div class="player-card" data-player-id="${player.id}" style="animation: fadeInUp ${0.05 * index}s ease forwards">
                <div class="player-image">${player.image || getRandomImage(player.name)}</div>
                <div class="player-name">${player.name}</div>
                <div class="player-info">${player.club} • ${player.position}</div>
                <div class="player-stats">⚽ ${player.goals} goals • 🎯 ${player.caps} caps</div>
            </div>
        `).join('');
        
        document.querySelectorAll('.player-card').forEach(card => {
            card.addEventListener('click', () => openPlayerModal(parseInt(card.dataset.playerId)));
        });
    }
}

// ============================================
// OPEN PLAYER MODAL
// ============================================
function openPlayerModal(playerId) {
    const allPlayers = countries.flatMap(c => c.players);
    const player = allPlayers.find(p => p.id === playerId);
    if (!player) return;
    
    const country = countries.find(c => c.players.some(p => p.id === playerId));
    
    const modal = document.getElementById('playerModal');
    const playerName = document.getElementById('playerName');
    const playerClub = document.getElementById('playerClub');
    const playerPosition = document.getElementById('playerPosition');
    const playerAge = document.getElementById('playerAge');
    const playerHeight = document.getElementById('playerHeight');
    const playerCaps = document.getElementById('playerCaps');
    const playerGoals = document.getElementById('playerGoals');
    const playerBio = document.getElementById('playerBio');
    
    if (playerName) playerName.textContent = player.name;
    if (playerClub) playerClub.textContent = player.club;
    if (playerPosition) playerPosition.textContent = player.position;
    if (playerAge) playerAge.textContent = player.age;
    if (playerHeight) playerHeight.textContent = player.height;
    if (playerCaps) playerCaps.textContent = player.caps;
    if (playerGoals) playerGoals.textContent = player.goals;
    if (playerBio) playerBio.textContent = player.bio;
    
    if (modal) modal.style.display = 'flex';
    
    // Animate counter
    animateNumber(playerCaps, 0, player.caps);
    animateNumber(playerGoals, 0, player.goals);
}

// ============================================
// CLOSE PLAYER MODAL
// ============================================
function closePlayerModal() {
    const modal = document.getElementById('playerModal');
    if (modal) modal.style.display = 'none';
}

// ============================================
// ANIMATE NUMBER COUNTER
// ============================================
function animateNumber(element, start, end) {
    if (!element) return;
    let current = start;
    const increment = end > start ? 1 : -1;
    const duration = 1000;
    const stepTime = Math.abs(Math.floor(duration / (end - start)));
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        if (current === end) clearInterval(timer);
    }, stepTime);
}

// ============================================
// ADD CSS ANIMATIONS
// ============================================
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .country-card, .player-card {
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            cursor: pointer;
        }
        
        .country-card:hover, .player-card:hover {
            box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(0,243,255,0.3);
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    new ParticleBackground();
    new MouseGlow();
    addStyles();
    renderCountries();
    renderPlayers();
    
    const searchInput = document.getElementById('playerSearch');
    if (searchInput) {
        searchInput.addEventListener('input', searchPlayers);
    }
    
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePlayerModal);
    }
    
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('playerModal');
        if (e.target === modal) closePlayerModal();
    });
    
    console.log('🔥 PlayerVerse Initialized!');
});
