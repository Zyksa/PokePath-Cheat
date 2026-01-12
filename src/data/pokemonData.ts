// Complete Pokemon database extracted from PokePath TD save data
// Name array indices: [0]=English, [1]=Spanish, [2]=French, [3]=Portuguese, [4]=Italian, [5]=German, [6]=Japanese, [7]=Korean

export interface PokemonData {
  id: number;
  names: {
    en: string;
    es: string;
    fr: string;
    pt: string;
    it: string;
    de: string;
    ja: string;
    ko: string;
  };
  color: string;
  abilityId: string;
  abilityNames: {
    en: string;
    es: string;
    fr: string;
  };
  evolution?: {
    level: number;
    pokemon: string;
  };
}

export const POKEMON_DATABASE: PokemonData[] = [
  {
    id: 0,
    names: { en: "charmander", es: "charmander", fr: "salamèche", pt: "charmander", it: "charmander", de: "glumanda", ja: "ヒトカゲ", ko: "파이리" },
    color: "#ff8463",
    abilityId: "burn",
    abilityNames: { en: "Burn", es: "Quemadura", fr: "Brûlure" },
    evolution: { level: 16, pokemon: "charmeleon" }
  },
  {
    id: 1,
    names: { en: "treecko", es: "treecko", fr: "arcko", pt: "treecko", it: "treecko", de: "geckarbor", ja: "キモリ", ko: "나무지기" },
    color: "#b7d667",
    abilityId: "ambusher",
    abilityNames: { en: "Ambusher", es: "Acechador", fr: "Guetteur" },
    evolution: { level: 16, pokemon: "grovyle" }
  },
  {
    id: 2,
    names: { en: "froakie", es: "froakie", fr: "grenousse", pt: "froakie", it: "froakie", de: "groxy", ja: "ケロマツ", ko: "개구마르" },
    color: "#20adbc",
    abilityId: "ninja",
    abilityNames: { en: "Ninja", es: "Ninja", fr: "Ninja" },
    evolution: { level: 16, pokemon: "frogadier" }
  },
  {
    id: 3,
    names: { en: "spoink", es: "spoink", fr: "spoink", pt: "spoink", it: "spoink", de: "spoink", ja: "バネブー", ko: "피그점프" },
    color: "#aeb6bf",
    abilityId: "frisk",
    abilityNames: { en: "Frisk", es: "Cacheo", fr: "Fouille" },
    evolution: { level: 32, pokemon: "grumpig" }
  },
  {
    id: 4,
    names: { en: "natu", es: "natu", fr: "natu", pt: "natu", it: "natu", de: "natu", ja: "ネイティ", ko: "네이티" },
    color: "#9fcf6f",
    abilityId: "frisk",
    abilityNames: { en: "Frisk", es: "Cacheo", fr: "Fouille" },
    evolution: { level: 25, pokemon: "xatu" }
  },
  {
    id: 5,
    names: { en: "voltorb", es: "voltorb", fr: "voltorbe", pt: "voltorb", it: "voltorb", de: "voltobal", ja: "ビリリダマ", ko: "찌리리공" },
    color: "#d63901",
    abilityId: "stunMonoNerf",
    abilityNames: { en: "Stun", es: "Aturdir", fr: "Étourdir" },
    evolution: { level: 30, pokemon: "electrode" }
  },
  {
    id: 6,
    names: { en: "ekans", es: "ekans", fr: "abo", pt: "ekans", it: "ekans", de: "rettan", ja: "アーボ", ko: "아보" },
    color: "#b594df",
    abilityId: "poison",
    abilityNames: { en: "Poison", es: "Veneno", fr: "Poison" },
    evolution: { level: 22, pokemon: "arbok" }
  },
  {
    id: 7,
    names: { en: "machop", es: "machop", fr: "machoc", pt: "machop", it: "machop", de: "machollo", ja: "ワンリキー", ko: "알통몬" },
    color: "#8cacb5",
    abilityId: "armorBreak",
    abilityNames: { en: "Armor Break", es: "Rompearmadura", fr: "Brise-Armure" },
    evolution: { level: 28, pokemon: "machoke" }
  },
  {
    id: 8,
    names: { en: "mankey", es: "mankey", fr: "férosinge", pt: "mankey", it: "mankey", de: "menki", ja: "マンキー", ko: "망키" },
    color: "#fff79c",
    abilityId: "armorBreak",
    abilityNames: { en: "Armor Break", es: "Rompearmadura", fr: "Brise-Armure" },
    evolution: { level: 28, pokemon: "primeape" }
  },
  {
    id: 9,
    names: { en: "chimchar", es: "chimchar", fr: "ouisticram", pt: "chimchar", it: "chimchar", de: "panflam", ja: "ヒコザル", ko: "chimchar" },
    color: "#df771e",
    abilityId: "burn",
    abilityNames: { en: "Burn", es: "Quemadura", fr: "Brûlure" },
    evolution: { level: 16, pokemon: "monferno" }
  },
  {
    id: 10,
    names: { en: "yamask", es: "yamask", fr: "tutafeh", pt: "yamask", it: "yamask", de: "makabaja", ja: "デスマス", ko: "데스마스" },
    color: "#708088",
    abilityId: "curse",
    abilityNames: { en: "Curse", es: "Maldición", fr: "Malédiction" },
    evolution: { level: 35, pokemon: "cofagrigus" }
  },
  {
    id: 11,
    names: { en: "riolu", es: "riolu", fr: "riolu", pt: "riolu", it: "riolu", de: "riolu", ja: "リオル", ko: "리오르" },
    color: "#1e9ee6",
    abilityId: "splash",
    abilityNames: { en: "Splash", es: "Splash", fr: "Éclaboussure" },
    evolution: { level: 20, pokemon: "lucario" }
  },
  {
    id: 13,
    names: { en: "mareep", es: "mareep", fr: "wattouat", pt: "mareep", it: "mareep", de: "voltilamm", ja: "メリープ", ko: "메리프" },
    color: "#ffe69e",
    abilityId: "stunArea",
    abilityNames: { en: "Stun", es: "Aturdir", fr: "Étourdir" },
    evolution: { level: 15, pokemon: "flaaffy" }
  },
  {
    id: 14,
    names: { en: "gulpin", es: "gulpin", fr: "gloupti", pt: "gulpin", it: "gulpin", de: "schluppuck", ja: "ゴクリン", ko: "꼴깍몬" },
    color: "#8fff67",
    abilityId: "poison",
    abilityNames: { en: "Poison", es: "Veneno", fr: "Poison" },
    evolution: { level: 26, pokemon: "swalot" }
  },
  {
    id: 15,
    names: { en: "cryogonal", es: "cryogonal", fr: "hexagel", pt: "cryogonal", it: "cryogonal", de: "frigometri", ja: "フリージオ", ko: "프리지오" },
    color: "#607dcb",
    abilityId: "stunMono",
    abilityNames: { en: "Stun", es: "Aturdir", fr: "Étourdir" }
  },
  {
    id: 16,
    names: { en: "sableye", es: "sableye", fr: "ténéfix", pt: "sableye", it: "sableye", de: "zobiris", ja: "ヤミラミ", ko: "깜까미" },
    color: "#8e67bf",
    abilityId: "curse",
    abilityNames: { en: "Curse", es: "Maldición", fr: "Malédiction" }
  },
  {
    id: 17,
    names: { en: "druddigon", es: "druddigon", fr: "drakkarmin", pt: "druddigon", it: "druddigon", de: "shardrago", ja: "クリムガン", ko: "크리만" },
    color: "#a42530",
    abilityId: "splash",
    abilityNames: { en: "Splash", es: "Splash", fr: "Éclaboussure" }
  },
  {
    id: 18,
    names: { en: "meowth", es: "meowth", fr: "miaouss", pt: "meowth", it: "meowth", de: "mauzi", ja: "ニャース", ko: "나옹" },
    color: "#d6bd62",
    abilityId: "greed",
    abilityNames: { en: "Greed", es: "Codicia", fr: "Avidité" },
    evolution: { level: 28, pokemon: "persian" }
  },
  {
    id: 19,
    names: { en: "sunkern", es: "sunkern", fr: "tournegrin", pt: "sunkern", it: "sunkern", de: "sonnkern", ja: "ヒマナッツ", ko: "해너츠" },
    color: "#fff700",
    abilityId: "powerAura",
    abilityNames: { en: "Power Aura", es: "Aura de Poder", fr: "Aura de Puissance" },
    evolution: { level: 25, pokemon: "sunflora" }
  },
  {
    id: 20,
    names: { en: "tangela", es: "tangela", fr: "saquedeneu", pt: "tangela", it: "tangela", de: "tangela", ja: "モンジャラ", ko: "덩쿠리" },
    color: "#6285ac",
    abilityId: "slow",
    abilityNames: { en: "Slow", es: "Ralentizar", fr: "Ralentir" },
    evolution: { level: 36, pokemon: "tangrowth" }
  },
  {
    id: 21,
    names: { en: "chikorita", es: "chikorita", fr: "germignon", pt: "chikorita", it: "chikorita", de: "endivie", ja: "チコリータ", ko: "치코리타" },
    color: "#d7efa6",
    abilityId: "heal",
    abilityNames: { en: "Heal", es: "Curación", fr: "Soin" },
    evolution: { level: 16, pokemon: "bayleef" }
  },
  {
    id: 22,
    names: { en: "hoppip", es: "hoppip", fr: "granivol", pt: "hoppip", it: "hoppip", de: "hoppspross", ja: "ハネッコ", ko: "두코" },
    color: "#e73f67",
    abilityId: "ambusher",
    abilityNames: { en: "Ambusher", es: "Acechador", fr: "Guetteur" },
    evolution: { level: 18, pokemon: "skiploom" }
  },
  {
    id: 23,
    names: { en: "cottonee", es: "cottonee", fr: "doudouvet", pt: "cottonee", it: "cottonee", de: "waumboll", ja: "モンメン", ko: "소미안" },
    color: "#bee293",
    abilityId: "heal",
    abilityNames: { en: "Heal", es: "Curación", fr: "Soin" },
    evolution: { level: 28, pokemon: "whimsicott" }
  },
  {
    id: 24,
    names: { en: "petilil", es: "petilil", fr: "chlorobule", pt: "petilil", it: "petilil", de: "lilminip", ja: "チュリネ", ko: "치릴리" },
    color: "#aed162",
    abilityId: "doubleShot",
    abilityNames: { en: "Double Shot", es: "Disparo Doble", fr: "Tir Double" },
    evolution: { level: 28, pokemon: "lilligant" }
  },
  {
    id: 25,
    names: { en: "spinarak", es: "spinarak", fr: "mimigal", pt: "spinarak", it: "spinarak", de: "webarak", ja: "イトマル", ko: "페이검" },
    color: "#9fce6f",
    abilityId: "poison",
    abilityNames: { en: "Poison", es: "Veneno", fr: "Poison" },
    evolution: { level: 22, pokemon: "ariados" }
  },
  {
    id: 26,
    names: { en: "maractus", es: "maractus", fr: "maracachi", pt: "maractus", it: "maractus", de: "maracamba", ja: "マラカッチ", ko: "마라카치" },
    color: "#5ff051",
    abilityId: "ambusher",
    abilityNames: { en: "Ambusher", es: "Acechador", fr: "Guetteur" }
  },
  {
    id: 27,
    names: { en: "shroomish", es: "shroomish", fr: "balignon", pt: "shroomish", it: "shroomish", de: "knilz", ja: "キノココ", ko: "버섯꼬" },
    color: "#fee79f",
    abilityId: "heal",
    abilityNames: { en: "Heal", es: "Curación", fr: "Soin" },
    evolution: { level: 23, pokemon: "breloom" }
  },
  {
    id: 28,
    names: { en: "barboach", es: "barboach", fr: "barloche", pt: "barboach", it: "barboach", de: "schmerbe", ja: "ドジョッチ", ko: "미꾸리" },
    color: "#1f9ee7",
    abilityId: "slow",
    abilityNames: { en: "Slow", es: "Ralentizar", fr: "Ralentir" },
    evolution: { level: 30, pokemon: "whiscash" }
  },
  {
    id: 29,
    names: { en: "clauncher", es: "clauncher", fr: "flingouste", pt: "clauncher", it: "clauncher", de: "scampisto", ja: "ウデッポウ", ko: "완철포" },
    color: "#81e1ff",
    abilityId: "superCritical",
    abilityNames: { en: "Super Critical", es: "Super Crítico", fr: "Super Critique" },
    evolution: { level: 37, pokemon: "clawitzer" }
  },
  {
    id: 30,
    names: { en: "remoraid", es: "remoraid", fr: "rémoraid", pt: "remoraid", it: "remoraid", de: "remoraid", ja: "テッポウオ", ko: "총어" },
    color: "#afb7bf",
    abilityId: "splash",
    abilityNames: { en: "Splash", es: "Splash", fr: "Éclaboussure" },
    evolution: { level: 30, pokemon: "octillery" }
  },
  {
    id: 31,
    names: { en: "oshawott", es: "oshawott", fr: "moustillon", pt: "oshawott", it: "oshawott", de: "ottaro", ja: "ミジュマル", ko: "수댕이" },
    color: "#70d8f0",
    abilityId: "focus",
    abilityNames: { en: "Focus", es: "Focus", fr: "Concentration" },
    evolution: { level: 17, pokemon: "dewott" }
  },
  {
    id: 32,
    names: { en: "staryu", es: "staryu", fr: "stari", pt: "staryu", it: "staryu", de: "sterndu", ja: "ヒトデマン", ko: "별가사리" },
    color: "#de7318",
    abilityId: "swimmer",
    abilityNames: { en: "Swift Swim", es: "Nado Rápido", fr: "Nage Rapide" },
    evolution: { level: 33, pokemon: "starmie" }
  },
  {
    id: 33,
    names: { en: "lapras", es: "lapras", fr: "lokhlass", pt: "lapras", it: "lapras", de: "lapras", ja: "ラプラス", ko: "라프라스" },
    color: "#7acfff",
    abilityId: "stunArea",
    abilityNames: { en: "Stun", es: "Aturdir", fr: "Étourdir" }
  },
  {
    id: 34,
    names: { en: "seel", es: "seel", fr: "otaria", pt: "seel", it: "seel", de: "jurob", ja: "パウワウ", ko: "쥬쥬" },
    color: "#d7dfde",
    abilityId: "stunMono",
    abilityNames: { en: "Stun", es: "Aturdir", fr: "Étourdir" },
    evolution: { level: 34, pokemon: "dewgong" }
  },
  {
    id: 35,
    names: { en: "psyduck", es: "psyduck", fr: "psykokwak", pt: "psyduck", it: "psyduck", de: "enton", ja: "コダック", ko: "고라파덕" },
    color: "#dfb501",
    abilityId: "swimmer",
    abilityNames: { en: "Swift Swim", es: "Nado Rápido", fr: "Nage Rapide" },
    evolution: { level: 33, pokemon: "golduck" }
  },
  {
    id: 36,
    names: { en: "murkrow", es: "murkrow", fr: "cornèbre", pt: "murkrow", it: "murkrow", de: "kramurx", ja: "ヤミカラス", ko: "니로우" },
    color: "#deb600",
    abilityId: "frisk",
    abilityNames: { en: "Frisk", es: "Cacheo", fr: "Fouille" },
    evolution: { level: 40, pokemon: "honchkrow" }
  },
  {
    id: 37,
    names: { en: "sandshrew", es: "sandshrew", fr: "sabelette", pt: "sandshrew", it: "sandshrew", de: "sandan", ja: "サンド", ko: "모래두지" },
    color: "#dfb500",
    abilityId: "doubleShot",
    abilityNames: { en: "Double Shot", es: "Disparo Doble", fr: "Tir Double" },
    evolution: { level: 22, pokemon: "sandslash" }
  },
  {
    id: 38,
    names: { en: "trapinch", es: "trapinch", fr: "kraknoix", pt: "trapinch", it: "trapinch", de: "knacklion", ja: "ナックラー", ko: "톱치" },
    color: "#ff9746",
    abilityId: "vigilant",
    abilityNames: { en: "Vigilant", es: "Vigilante", fr: "Vigilant" },
    evolution: { level: 35, pokemon: "vibrava" }
  },
  {
    id: 39,
    names: { en: "noibat", es: "noibat", fr: "sonistrelle", pt: "noibat", it: "noibat", de: "em", ja: "オンバット", ko: "음뱃" },
    color: "#863f86",
    abilityId: "focus",
    abilityNames: { en: "Focus", es: "Focus", fr: "Concentration" },
    evolution: { level: 48, pokemon: "noivern" }
  },
  {
    id: 40,
    names: { en: "sneasel", es: "sneasel", fr: "farfuret", pt: "sneasel", it: "sneasel", de: "sniebel", ja: "ニューラ", ko: "포푸니" },
    color: "#4f5f96",
    abilityId: "superCritical",
    abilityNames: { en: "Super Critical", es: "Super Crítico", fr: "Super Critique" },
    evolution: { level: 25, pokemon: "weavile" }
  },
  {
    id: 41,
    names: { en: "drilbur", es: "drilbur", fr: "rototaupe", pt: "drilbur", it: "drilbur", de: "rotomurf", ja: "モグリュー", ko: "두더류" },
    color: "#8d7b6d",
    abilityId: "armorBreak",
    abilityNames: { en: "Armor Break", es: "Rompearmadura", fr: "Brise-Armure" },
    evolution: { level: 31, pokemon: "excadrill" }
  },
  {
    id: 42,
    names: { en: "shuckle", es: "shuckle", fr: "caratroc", pt: "shuckle", it: "shuckle", de: "pottrott", ja: "ツボツボ", ko: "단단지" },
    color: "#d73f00",
    abilityId: "slow",
    abilityNames: { en: "Slow", es: "Ralentizar", fr: "Ralentir" }
  },
  {
    id: 43,
    names: { en: "hawlucha", es: "hawlucha", fr: "brutalibré", pt: "hawlucha", it: "hawlucha", de: "resladero", ja: "ルチャブル", ko: "루차불" },
    color: "#01bd93",
    abilityId: "armorBreak",
    abilityNames: { en: "Armor Break", es: "Rompearmadura", fr: "Brise-Armure" }
  },
  {
    id: 44,
    names: { en: "aron", es: "aron", fr: "galekid", pt: "aron", it: "aron", de: "stollunior", ja: "ココドラ", ko: "가보리" },
    color: "#afb6bf",
    abilityId: "vigilant",
    abilityNames: { en: "Vigilant", es: "Vigilante", fr: "Vigilant" },
    evolution: { level: 32, pokemon: "lairon" }
  },
  {
    id: 45,
    names: { en: "cubone", es: "cubone", fr: "osselait", pt: "cubone", it: "cubone", de: "tragosso", ja: "カラカラ", ko: "탕구리" },
    color: "#ac6218",
    abilityId: "ninja",
    abilityNames: { en: "Ninja", es: "Ninja", fr: "Ninja" },
    evolution: { level: 28, pokemon: "marowak" }
  },
  {
    id: 46,
    names: { en: "pidgey", es: "pidgey", fr: "roucool", pt: "pidgey", it: "pidgey", de: "taubsi", ja: "ポッポ", ko: "구구" },
    color: "#e63963",
    abilityId: "vigilant",
    abilityNames: { en: "Vigilant", es: "Vigilante", fr: "Vigilant" },
    evolution: { level: 18, pokemon: "pidgeotto" }
  },
  {
    id: 47,
    names: { en: "binacle", es: "binacle", fr: "opermine", pt: "binacle", it: "binacle", de: "bithora", ja: "カメテテ", ko: "거북손손" },
    color: "#9b7547",
    abilityId: "doubleShot",
    abilityNames: { en: "Double Shot", es: "Disparo Doble", fr: "Tir Double" },
    evolution: { level: 39, pokemon: "barbaracle" }
  },
  {
    id: 48,
    names: { en: "surskit", es: "surskit", fr: "arakdo", pt: "surskit", it: "surskit", de: "gehweiher", ja: "アメタマ", ko: "비구술" },
    color: "#1e9ee7",
    abilityId: "swimmer",
    abilityNames: { en: "Swift Swim", es: "Nado Rápido", fr: "Nage Rapide" },
    evolution: { level: 22, pokemon: "masquerain" }
  },
  {
    id: 49,
    names: { en: "ferroseed", es: "ferroseed", fr: "grindur", pt: "ferroseed", it: "ferroseed", de: "kastadur", ja: "テッシード", ko: "철시드" },
    color: "#5eb727",
    abilityId: "slow",
    abilityNames: { en: "Slow", es: "Ralentizar", fr: "Ralentir" },
    evolution: { level: 40, pokemon: "ferrothorn" }
  },
  {
    id: 50,
    names: { en: "absol", es: "absol", fr: "absol", pt: "absol", it: "absol", de: "absol", ja: "アブソル", ko: "앱솔" },
    color: "#d7dedf",
    abilityId: "focus",
    abilityNames: { en: "Focus", es: "Focus", fr: "Concentration" }
  },
  {
    id: 51,
    names: { en: "girafarig", es: "girafarig", fr: "girafarig", pt: "girafarig", it: "girafarig", de: "girafarig", ja: "キリンリキ", ko: "키링키" },
    color: "#dfb700",
    abilityId: "curseDoubleShot",
    abilityNames: { en: "Curse DoubleShot", es: "Disparo Doble Maldito", fr: "Double Tir Maudit" }
  },
  {
    id: 52,
    names: { en: "torkoal", es: "torkoal", fr: "chartor", pt: "torkoal", it: "torkoal", de: "torkoal", ja: "コータス", ko: "코터스" },
    color: "#df761e",
    abilityId: "burnNerf",
    abilityNames: { en: "Burn", es: "Quemadura", fr: "Brûlure" }
  },
  {
    id: 53,
    names: { en: "spinda", es: "spinda", fr: "spinda", pt: "spinda", it: "spinda", de: "spinda", ja: "パッチール", ko: "스핀다" },
    color: "#ff875f",
    abilityId: "spinda",
    abilityNames: { en: "Own Tempo", es: "Tumbos", fr: "Tempo Perso" }
  },
  {
    id: 54,
    names: { en: "dunsparce", es: "dunsparce", fr: "insolourdo", pt: "dunsparce", it: "dunsparce", de: "dunsparce", ja: "ノコッチ", ko: "노고치" },
    color: "#1f9fe7",
    abilityId: "slowSplash",
    abilityNames: { en: "Slow Splash", es: "Slow Splash", fr: "Slow Splash" }
  },
  {
    id: 55,
    names: { en: "ralts", es: "ralts", fr: "ralts", pt: "ralts", it: "ralts", de: "ralts", ja: "ラルトス", ko: "랄토스" },
    color: "#5ec636",
    abilityId: "synchronySplash",
    abilityNames: { en: "Synchrony", es: "Sincronía", fr: "Synchronisation" },
    evolution: { level: 20, pokemon: "kirlia" }
  },
  {
    id: 56,
    names: { en: "koffing", es: "koffing", fr: "smogo", pt: "koffing", it: "koffing", de: "koffing", ja: "ドガース", ko: "두가스" },
    color: "#b595df",
    abilityId: "poison",
    abilityNames: { en: "Poison", es: "Veneno", fr: "Poison" },
    evolution: { level: 35, pokemon: "weezing" }
  },
  {
    id: 57,
    names: { en: "farfetch'd", es: "farfetch'd", fr: "canarticho", pt: "farfetch'd", it: "farfetch'd", de: "farfetch'd", ja: "カモネギ", ko: "파오리" },
    color: "#ad621b",
    abilityId: "criticalAura",
    abilityNames: { en: "Critical Aura", es: "Aura de Crítico", fr: "Aura de Puissance" }
  },
  {
    id: 58,
    names: { en: "omanyte", es: "omanyte", fr: "amonita", pt: "omanyte", it: "omanyte", de: "omanyte", ja: "オムナイト", ko: "오믈나이트" },
    color: "#8cdffe",
    abilityId: "swimmer",
    abilityNames: { en: "Swift Swim", es: "Nado Rápido", fr: "Nage Rapide" },
    evolution: { level: 40, pokemon: "omastar" }
  },
  {
    id: 59,
    names: { en: "kabuto", es: "kabuto", fr: "kabuto", pt: "kabuto", it: "kabuto", de: "kabuto", ja: "カブト", ko: "투구" },
    color: "#de7318",
    abilityId: "armorBreak",
    abilityNames: { en: "Armor Break", es: "Rompearmadura", fr: "Brise-Armure" },
    evolution: { level: 40, pokemon: "kabutops" }
  },
  {
    id: 60,
    names: { en: "corsola", es: "corsola", fr: "corayon", pt: "corsola", it: "corsola", de: "corsola", ja: "サニーゴ", ko: "코산호" },
    color: "#ff8faf",
    abilityId: "slowSplash",
    abilityNames: { en: "Slow Splash", es: "Slow Splash", fr: "Slow Splash" }
  },
  {
    id: 61,
    names: { en: "castform", es: "castform", fr: "morphéo", pt: "castform", it: "castform", de: "kastform", ja: "ポワルン", ko: "캐스퐁" },
    color: "#aeb7bf",
    abilityId: "castform",
    abilityNames: { en: "Forecast", es: "Cambio Climático", fr: "Météo" }
  },
  {
    id: 62,
    names: { en: "clefairy", es: "clefairy", fr: "mélofée", pt: "clefairy", it: "clefairy", de: "pixi", ja: "ピッピ", ko: "삐삐" },
    color: "#ffc7d7",
    abilityId: "star",
    abilityNames: { en: "star", es: "estrella", fr: "étoile" },
    evolution: { level: 25, pokemon: "clefable" }
  },
  {
    id: 63,
    names: { en: "anorith", es: "anorith", fr: "anorith", pt: "anorith", it: "anorith", de: "anorith", ja: "アノプス", ko: "아노딥스" },
    color: "#47676f",
    abilityId: "armaldo",
    abilityNames: { en: "Critical Ricochet", es: "Rebote Critico", fr: "Ricochet critique" },
    evolution: { level: 40, pokemon: "armaldo" }
  },
  {
    id: 64,
    names: { en: "lileep", es: "lileep", fr: "lilia", pt: "lileep", it: "lileep", de: "liliep", ja: "リリーラ", ko: "릴링" },
    color: "#c697de",
    abilityId: "cradily",
    abilityNames: { en: "Fossil Projectile", es: "Proyectil Fósil", fr: "Projectile Fossile" },
    evolution: { level: 40, pokemon: "cradily" }
  },
  {
    id: 65,
    names: { en: "shieldon", es: "shieldon", fr: "dinoclier", pt: "shieldon", it: "shieldon", de: "schilterus", ja: "タテトプス", ko: "방패톱스" },
    color: "#efbe36",
    abilityId: "bastiodon",
    abilityNames: { en: "Fossil Speed", es: "Velocidad Fósil", fr: "Vitesse Fossile" },
    evolution: { level: 30, pokemon: "bastiodon" }
  },
  {
    id: 66,
    names: { en: "cranidos", es: "cranidos", fr: "kranidos", pt: "cranidos", it: "cranidos", de: "koknodon", ja: "ズガイドス", ko: "두개도스" },
    color: "#1f9fe7",
    abilityId: "rampardos",
    abilityNames: { en: "Rock Head", es: "Cabeza de Roca", fr: "Tête de Roc" },
    evolution: { level: 30, pokemon: "rampardos" }
  },
  {
    id: 67,
    names: { en: "starly", es: "starly", fr: "étourmi", pt: "starly", it: "starly", de: "staralili", ja: "ムックル", ko: "찌르꼬" },
    color: "#7e6f6e",
    abilityId: "doubleShot",
    abilityNames: { en: "Double Shot", es: "Disparo Doble", fr: "Tir Double" },
    evolution: { level: 14, pokemon: "staravia" }
  },
  {
    id: 68,
    names: { en: "abra", es: "abra", fr: "abra", pt: "abra", it: "abra", de: "abra", ja: "ケーシィ", ko: "캐이시" },
    color: "#deb500",
    abilityId: "teleport",
    abilityNames: { en: "teleport", es: "teleport", fr: "teleport" },
    evolution: { level: 16, pokemon: "kadabra" }
  },
  {
    id: 69,
    names: { en: "gastly", es: "gastly", fr: "fantominus", pt: "gastly", it: "gastly", de: "nebulak", ja: "ゴース", ko: "고오스" },
    color: "#b595de",
    abilityId: "nightmare",
    abilityNames: { en: "nightmare", es: "pesadilla", fr: "cauchemar" },
    evolution: { level: 25, pokemon: "haunter" }
  },
  {
    id: 70,
    names: { en: "ditto", es: "ditto", fr: "métamorph", pt: "ditto", it: "ditto", de: "ditto", ja: "メタモン", ko: "메타몽" },
    color: "#d794de",
    abilityId: "transform",
    abilityNames: { en: "Transform", es: "Transform", fr: "Transform" }
  },
  
  // ==========================================
  // EVOLUTIONS - Stage 2 Pokemon
  // ==========================================
  
  // Evolution from charmander (id: 0)
  {
    id: 100,
    names: { en: "charmeleon", es: "charmeleon", fr: "reptincel", pt: "charmeleon", it: "charmeleon", de: "glutexo", ja: "リザード", ko: "리자드" },
    color: "#ff8463",
    abilityId: "burn",
    abilityNames: { en: "Burn", es: "Quemadura", fr: "Brûlure" },
    evolution: { level: 36, pokemon: "charizard" }
  },
  // Evolution from treecko (id: 1)
  {
    id: 101,
    names: { en: "grovyle", es: "grovyle", fr: "massko", pt: "grovyle", it: "grovyle", de: "reptain", ja: "ジュプトル", ko: "나무돌이" },
    color: "#b7d667",
    abilityId: "ambusher",
    abilityNames: { en: "Ambusher", es: "Acechador", fr: "Guetteur" },
    evolution: { level: 36, pokemon: "sceptile" }
  },
  // Evolution from froakie (id: 2)
  {
    id: 102,
    names: { en: "frogadier", es: "frogadier", fr: "croâporal", pt: "frogadier", it: "frogadier", de: "amphizel", ja: "ゲコガシラ", ko: "개굴반장" },
    color: "#20adbc",
    abilityId: "ninja",
    abilityNames: { en: "Ninja", es: "Ninja", fr: "Ninja" },
    evolution: { level: 36, pokemon: "greninja" }
  },
  // Evolution from natu (id: 4)
  {
    id: 103,
    names: { en: "xatu", es: "xatu", fr: "xatu", pt: "xatu", it: "xatu", de: "xatu", ja: "ネイティオ", ko: "네이티오" },
    color: "#9fcf6f",
    abilityId: "frisk",
    abilityNames: { en: "Frisk", es: "Cacheo", fr: "Fouille" }
  },
  // Evolution from spoink (id: 3)
  {
    id: 104,
    names: { en: "grumpig", es: "grumpig", fr: "groret", pt: "grumpig", it: "grumpig", de: "groink", ja: "ブーピッグ", ko: "피그킹" },
    color: "#aeb6bf",
    abilityId: "frisk",
    abilityNames: { en: "Frisk", es: "Cacheo", fr: "Fouille" }
  },
  // Evolution from voltorb (id: 5)
  {
    id: 105,
    names: { en: "electrode", es: "electrode", fr: "électrode", pt: "electrode", it: "electrode", de: "lektrobal", ja: "マルマイン", ko: "붐볼" },
    color: "#d63901",
    abilityId: "stunMonoNerf",
    abilityNames: { en: "Stun", es: "Aturdir", fr: "Étourdir" }
  },
  // Evolution from machop (id: 7)
  {
    id: 106,
    names: { en: "machoke", es: "machoke", fr: "machopeur", pt: "machoke", it: "machoke", de: "maschock", ja: "ゴーリキー", ko: "근육몬" },
    color: "#8cacb5",
    abilityId: "armorBreak",
    abilityNames: { en: "Armor Break", es: "Rompearmadura", fr: "Brise-Armure" },
    evolution: { level: 40, pokemon: "machamp" }
  },
  // Evolution from mankey (id: 8)
  {
    id: 107,
    names: { en: "primeape", es: "primeape", fr: "colossinge", pt: "primeape", it: "primeape", de: "rasaff", ja: "オコリザル", ko: "성원숭" },
    color: "#fff79c",
    abilityId: "armorBreak",
    abilityNames: { en: "Armor Break", es: "Rompearmadura", fr: "Brise-Armure" }
  },
  // Evolution from chimchar (id: 9)
  {
    id: 108,
    names: { en: "monferno", es: "monferno", fr: "chimpenfeu", pt: "monferno", it: "monferno", de: "panpyro", ja: "モウカザル", ko: "파이숭이" },
    color: "#df771e",
    abilityId: "burn",
    abilityNames: { en: "Burn", es: "Quemadura", fr: "Brûlure" },
    evolution: { level: 36, pokemon: "infernape" }
  },
  // Evolution from yamask (id: 10)
  {
    id: 109,
    names: { en: "cofagrigus", es: "cofagrigus", fr: "tutankafer", pt: "cofagrigus", it: "cofagrigus", de: "echnatoll", ja: "デスカーン", ko: "데스니칸" },
    color: "#708088",
    abilityId: "curse",
    abilityNames: { en: "Curse", es: "Maldición", fr: "Malédiction" }
  },
  // Evolution from meowth (id: 18)
  {
    id: 110,
    names: { en: "persian", es: "persian", fr: "persian", pt: "persian", it: "persian", de: "snobilikat", ja: "ペルシアン", ko: "페르시온" },
    color: "#d6bd62",
    abilityId: "greed",
    abilityNames: { en: "Greed", es: "Codicia", fr: "Avidité" }
  },
  // Evolution from tangela (id: 20)
  {
    id: 111,
    names: { en: "tangrowth", es: "tangrowth", fr: "bouldeneu", pt: "tangrowth", it: "tangrowth", de: "tangoloss", ja: "モジャンボ", ko: "덩쿠림보" },
    color: "#6285ac",
    abilityId: "slow",
    abilityNames: { en: "Slow", es: "Ralentizar", fr: "Ralentir" }
  },
  // Evolution from chikorita (id: 21)
  {
    id: 112,
    names: { en: "bayleef", es: "bayleef", fr: "macronium", pt: "bayleef", it: "bayleef", de: "lorblatt", ja: "ベイリーフ", ko: "베이리프" },
    color: "#d7efa6",
    abilityId: "heal",
    abilityNames: { en: "Heal", es: "Curación", fr: "Soin" },
    evolution: { level: 32, pokemon: "meganium" }
  },
  // Evolution from spinarak (id: 25)
  {
    id: 113,
    names: { en: "ariados", es: "ariados", fr: "migalos", pt: "ariados", it: "ariados", de: "ariados", ja: "アリアドス", ko: "아리아도스" },
    color: "#9fce6f",
    abilityId: "poison",
    abilityNames: { en: "Poison", es: "Veneno", fr: "Poison" }
  },
  // Evolution from shroomish (id: 27)
  {
    id: 114,
    names: { en: "breloom", es: "breloom", fr: "chapignon", pt: "breloom", it: "breloom", de: "kapilz", ja: "キノガッサ", ko: "버섯모" },
    color: "#fee79f",
    abilityId: "heal",
    abilityNames: { en: "Heal", es: "Curación", fr: "Soin" }
  },
  // Evolution from barboach (id: 28)
  {
    id: 115,
    names: { en: "whiscash", es: "whiscash", fr: "barbicha", pt: "whiscash", it: "whiscash", de: "welsar", ja: "ナマズン", ko: "메깅" },
    color: "#1f9ee7",
    abilityId: "slow",
    abilityNames: { en: "Slow", es: "Ralentizar", fr: "Ralentir" }
  },
  // Evolution from remoraid (id: 30)
  {
    id: 116,
    names: { en: "octillery", es: "octillery", fr: "octillery", pt: "octillery", it: "octillery", de: "octillery", ja: "オクタン", ko: "대포무노" },
    color: "#afb7bf",
    abilityId: "splash",
    abilityNames: { en: "Splash", es: "Splash", fr: "Éclaboussure" }
  },
  // Evolution from clauncher (id: 29)
  {
    id: 117,
    names: { en: "clawitzer", es: "clawitzer", fr: "gamblast", pt: "clawitzer", it: "clawitzer", de: "wummer", ja: "ブロスター", ko: "블로스터" },
    color: "#81e1ff",
    abilityId: "superCritical",
    abilityNames: { en: "Super Critical", es: "Super Crítico", fr: "Super Critique" }
  },
  // Evolution from seel (id: 34)
  {
    id: 118,
    names: { en: "dewgong", es: "dewgong", fr: "lamantine", pt: "dewgong", it: "dewgong", de: "jugong", ja: "ジュゴン", ko: "쥬레곤" },
    color: "#d7dfde",
    abilityId: "stunMono",
    abilityNames: { en: "Stun", es: "Aturdir", fr: "Étourdir" }
  },
  // Evolution from murkrow (id: 36)
  {
    id: 119,
    names: { en: "honchkrow", es: "honchkrow", fr: "corboss", pt: "honchkrow", it: "honchkrow", de: "kramshef", ja: "ドンカラス", ko: "돈크로우" },
    color: "#deb600",
    abilityId: "frisk",
    abilityNames: { en: "Frisk", es: "Cacheo", fr: "Fouille" }
  },
  // Evolution from staryu (id: 32)
  {
    id: 120,
    names: { en: "starmie", es: "starmie", fr: "staross", pt: "starmie", it: "starmie", de: "starmie", ja: "スターミー", ko: "아쿠스타" },
    color: "#de7318",
    abilityId: "swimmer",
    abilityNames: { en: "Swift Swim", es: "Nado Rápido", fr: "Nage Rapide" }
  },
  // Evolution from psyduck (id: 35)
  {
    id: 121,
    names: { en: "golduck", es: "golduck", fr: "akwakwak", pt: "golduck", it: "golduck", de: "entoron", ja: "ゴルダック", ko: "골덕" },
    color: "#dfb501",
    abilityId: "swimmer",
    abilityNames: { en: "Swift Swim", es: "Nado Rápido", fr: "Nage Rapide" }
  },
  // Evolution from gulpin (id: 14)
  {
    id: 122,
    names: { en: "swalot", es: "swalot", fr: "avaltout", pt: "swalot", it: "swalot", de: "schlukwech", ja: "マルノーム", ko: "꿀꺽몬" },
    color: "#8fff67",
    abilityId: "poison",
    abilityNames: { en: "Poison", es: "Veneno", fr: "Poison" }
  },
  // Evolution from ferroseed (id: 49)
  {
    id: 123,
    names: { en: "ferrothorn", es: "ferrothorn", fr: "noacier", pt: "ferrothorn", it: "ferrothorn", de: "tentantel", ja: "ナットレイ", ko: "너트령" },
    color: "#5eb727",
    abilityId: "slow",
    abilityNames: { en: "Slow", es: "Ralentizar", fr: "Ralentir" }
  },
  // Evolution from sunkern (id: 19)
  {
    id: 124,
    names: { en: "sunflora", es: "sunflora", fr: "héliatronc", pt: "sunflora", it: "sunflora", de: "sonnflora", ja: "キマワリ", ko: "해루미" },
    color: "#fff700",
    abilityId: "powerAura",
    abilityNames: { en: "Power Aura", es: "Aura de Poder", fr: "Aura de Puissance" }
  },
  // Evolution from aron (id: 44)
  {
    id: 125,
    names: { en: "lairon", es: "lairon", fr: "galegon", pt: "lairon", it: "lairon", de: "stollrak", ja: "コドラ", ko: "코도라" },
    color: "#afb6bf",
    abilityId: "vigilant",
    abilityNames: { en: "Vigilant", es: "Vigilante", fr: "Vigilant" },
    evolution: { level: 42, pokemon: "aggron" }
  },
  // Evolution from cubone (id: 45)
  {
    id: 126,
    names: { en: "marowak", es: "marowak", fr: "ossatueur", pt: "marowak", it: "marowak", de: "knogga", ja: "ガラガラ", ko: "텅구리" },
    color: "#ac6218",
    abilityId: "ninja",
    abilityNames: { en: "Ninja", es: "Ninja", fr: "Ninja" }
  },
  // Evolution from binacle (id: 47)
  {
    id: 127,
    names: { en: "barbaracle", es: "barbaracle", fr: "golgopathe", pt: "barbaracle", it: "barbaracle", de: "thanathora", ja: "ガメノデス", ko: "거북손데스" },
    color: "#9b7547",
    abilityId: "doubleShot",
    abilityNames: { en: "Double Shot", es: "Disparo Doble", fr: "Tir Double" }
  },
  // Evolution from oshawott (id: 31)
  {
    id: 128,
    names: { en: "dewott", es: "dewott", fr: "mateloutre", pt: "dewott", it: "dewott", de: "zwottronin", ja: "フタチマル", ko: "쌍검자비" },
    color: "#70d8f0",
    abilityId: "focus",
    abilityNames: { en: "Focus", es: "Focus", fr: "Concentration" },
    evolution: { level: 36, pokemon: "samurott" }
  },
  // Evolution from sandshrew (id: 37)
  {
    id: 129,
    names: { en: "sandslash", es: "sandslash", fr: "sablaireau", pt: "sandslash", it: "sandslash", de: "sandamer", ja: "サンドパン", ko: "고지" },
    color: "#dfb500",
    abilityId: "doubleShot",
    abilityNames: { en: "Double Shot", es: "Disparo Doble", fr: "Tir Double" }
  },
  // Evolution from sneasel (id: 40)
  {
    id: 130,
    names: { en: "weavile", es: "weavile", fr: "dimoret", pt: "weavile", it: "weavile", de: "snibunna", ja: "マニューラ", ko: "포푸니라" },
    color: "#4f5f96",
    abilityId: "superCritical",
    abilityNames: { en: "Super Critical", es: "Super Crítico", fr: "Super Critique" }
  },
  // Evolution from trapinch (id: 38)
  {
    id: 131,
    names: { en: "vibrava", es: "vibrava", fr: "vibraninf", pt: "vibrava", it: "vibrava", de: "vibrava", ja: "ビブラーバ", ko: "비브라바" },
    color: "#ff9746",
    abilityId: "vigilant",
    abilityNames: { en: "Vigilant", es: "Vigilante", fr: "Vigilant" },
    evolution: { level: 45, pokemon: "flygon" }
  },
  // Evolution from pidgey (id: 46)
  {
    id: 132,
    names: { en: "pidgeotto", es: "pidgeotto", fr: "roucoups", pt: "pidgeotto", it: "pidgeotto", de: "tauboga", ja: "ピジョン", ko: "피죤" },
    color: "#e63963",
    abilityId: "vigilant",
    abilityNames: { en: "Vigilant", es: "Vigilante", fr: "Vigilant" },
    evolution: { level: 36, pokemon: "pidgeot" }
  },
  // Evolution from noibat (id: 39)
  {
    id: 133,
    names: { en: "noivern", es: "noivern", fr: "bruyverne", pt: "noivern", it: "noivern", de: "uhafer", ja: "オンバーン", ko: "음번" },
    color: "#863f86",
    abilityId: "focus",
    abilityNames: { en: "Focus", es: "Focus", fr: "Concentration" }
  },
  // Evolution from riolu (id: 11)
  {
    id: 134,
    names: { en: "lucario", es: "lucario", fr: "lucario", pt: "lucario", it: "lucario", de: "lucario", ja: "ルカリオ", ko: "루카리오" },
    color: "#1e9ee6",
    abilityId: "splash",
    abilityNames: { en: "Splash", es: "Splash", fr: "Éclaboussure" }
  },
  // Evolution from mareep (id: 13)
  {
    id: 135,
    names: { en: "flaaffy", es: "flaaffy", fr: "lainergie", pt: "flaaffy", it: "flaaffy", de: "waaty", ja: "モココ", ko: "보송송" },
    color: "#ffe69e",
    abilityId: "stunArea",
    abilityNames: { en: "Stun", es: "Aturdir", fr: "Étourdir" },
    evolution: { level: 30, pokemon: "ampharos" }
  },
  // Evolution from surskit (id: 48)
  {
    id: 136,
    names: { en: "masquerain", es: "masquerain", fr: "maskadra", pt: "masquerain", it: "masquerain", de: "maskeregen", ja: "アメモース", ko: "비나방" },
    color: "#1e9ee7",
    abilityId: "swimmer",
    abilityNames: { en: "Swift Swim", es: "Nado Rápido", fr: "Nage Rapide" }
  },
  // Evolution from cottonee (id: 23)
  {
    id: 137,
    names: { en: "whimsicott", es: "whimsicott", fr: "farfaduvet", pt: "whimsicott", it: "whimsicott", de: "elfun", ja: "エルフーン", ko: "엘풍" },
    color: "#bee293",
    abilityId: "heal",
    abilityNames: { en: "Heal", es: "Curación", fr: "Soin" }
  },
  // Evolution from petilil (id: 24)
  {
    id: 138,
    names: { en: "lilligant", es: "lilligant", fr: "fragilady", pt: "lilligant", it: "lilligant", de: "dressella", ja: "ドレディア", ko: "드레디어" },
    color: "#aed162",
    abilityId: "doubleShot",
    abilityNames: { en: "Double Shot", es: "Disparo Doble", fr: "Tir Double" }
  },
  // Evolution from hoppip (id: 22)
  {
    id: 139,
    names: { en: "skiploom", es: "skiploom", fr: "floravol", pt: "skiploom", it: "skiploom", de: "hubelupf", ja: "ポポッコ", ko: "두코" },
    color: "#e73f67",
    abilityId: "ambusher",
    abilityNames: { en: "Ambusher", es: "Acechador", fr: "Guetteur" },
    evolution: { level: 27, pokemon: "jumpluff" }
  },
  // Evolution from drilbur (id: 41)
  {
    id: 140,
    names: { en: "excadrill", es: "excadrill", fr: "minotaupe", pt: "excadrill", it: "excadrill", de: "stalobor", ja: "ドリュウズ", ko: "몰드류" },
    color: "#8d7b6d",
    abilityId: "armorBreak",
    abilityNames: { en: "Armor Break", es: "Rompearmadura", fr: "Brise-Armure" }
  },
  // Evolution from ekans (id: 6)
  {
    id: 141,
    names: { en: "arbok", es: "arbok", fr: "arbok", pt: "arbok", it: "arbok", de: "arbok", ja: "アーボック", ko: "아보크" },
    color: "#b594df",
    abilityId: "poison",
    abilityNames: { en: "Poison", es: "Veneno", fr: "Poison" }
  },
  // Evolution from ralts (id: 55)
  {
    id: 142,
    names: { en: "kirlia", es: "kirlia", fr: "kirlia", pt: "kirlia", it: "kirlia", de: "kirlia", ja: "キルリア", ko: "킬리아" },
    color: "#5ec636",
    abilityId: "synchronySplash",
    abilityNames: { en: "Synchrony", es: "Sincronía", fr: "Synchronisation" },
    evolution: { level: 30, pokemon: "gardevoir" }
  },
  // Evolution from koffing (id: 56)
  {
    id: 143,
    names: { en: "weezing", es: "weezing", fr: "smogogo", pt: "weezing", it: "weezing", de: "smogmog", ja: "マタドガス", ko: "또도가스" },
    color: "#b595df",
    abilityId: "poison",
    abilityNames: { en: "Poison", es: "Veneno", fr: "Poison" }
  },
  // Evolution from omanyte (id: 58)
  {
    id: 144,
    names: { en: "omastar", es: "omastar", fr: "amonistar", pt: "omastar", it: "omastar", de: "amoroso", ja: "オムスター", ko: "암스타" },
    color: "#8cdffe",
    abilityId: "swimmer",
    abilityNames: { en: "Swift Swim", es: "Nado Rápido", fr: "Nage Rapide" }
  },
  // Evolution from kabuto (id: 59)
  {
    id: 145,
    names: { en: "kabutops", es: "kabutops", fr: "kabutops", pt: "kabutops", it: "kabutops", de: "kabutops", ja: "カブトプス", ko: "투구푸스" },
    color: "#de7318",
    abilityId: "armorBreak",
    abilityNames: { en: "Armor Break", es: "Rompearmadura", fr: "Brise-Armure" }
  },
  // Evolution from clefairy (id: 62)
  {
    id: 146,
    names: { en: "clefable", es: "clefable", fr: "mélodelfe", pt: "clefable", it: "clefable", de: "pixi", ja: "ピクシー", ko: "픽시" },
    color: "#ffc7d7",
    abilityId: "star",
    abilityNames: { en: "star", es: "estrella", fr: "étoile" }
  },
  // Evolution from anorith (id: 63)
  {
    id: 147,
    names: { en: "armaldo", es: "armaldo", fr: "armaldo", pt: "armaldo", it: "armaldo", de: "armaldo", ja: "アーマルド", ko: "아말도" },
    color: "#47676f",
    abilityId: "armaldo",
    abilityNames: { en: "Critical Ricochet", es: "Rebote Critico", fr: "Ricochet critique" }
  },
  // Evolution from lileep (id: 64)
  {
    id: 148,
    names: { en: "cradily", es: "cradily", fr: "vacilys", pt: "cradily", it: "cradily", de: "wielie", ja: "ユレイドル", ko: "릴리요" },
    color: "#c697de",
    abilityId: "cradily",
    abilityNames: { en: "Fossil Projectile", es: "Proyectil Fósil", fr: "Projectile Fossile" }
  },
  // Evolution from shieldon (id: 65)
  {
    id: 149,
    names: { en: "bastiodon", es: "bastiodon", fr: "bastiodon", pt: "bastiodon", it: "bastiodon", de: "bollterus", ja: "トリデプス", ko: "바리톱스" },
    color: "#efbe36",
    abilityId: "bastiodon",
    abilityNames: { en: "Fossil Speed", es: "Velocidad Fósil", fr: "Vitesse Fossile" }
  },
  // Evolution from cranidos (id: 66)
  {
    id: 150,
    names: { en: "rampardos", es: "rampardos", fr: "charkos", pt: "rampardos", it: "rampardos", de: "rameidon", ja: "ラムパルド", ko: "램펄드" },
    color: "#1f9fe7",
    abilityId: "rampardos",
    abilityNames: { en: "Rock Head", es: "Cabeza de Roca", fr: "Tête de Roc" }
  },
  // Evolution from starly (id: 67)
  {
    id: 151,
    names: { en: "staravia", es: "staravia", fr: "étourvol", pt: "staravia", it: "staravia", de: "staravia", ja: "ムクバード", ko: "찌르버드" },
    color: "#7e6f6e",
    abilityId: "doubleShot",
    abilityNames: { en: "Double Shot", es: "Disparo Doble", fr: "Tir Double" },
    evolution: { level: 34, pokemon: "staraptor" }
  },
  // Evolution from abra (id: 68)
  {
    id: 152,
    names: { en: "kadabra", es: "kadabra", fr: "kadabra", pt: "kadabra", it: "kadabra", de: "kadabra", ja: "ユンゲラー", ko: "윤겔라" },
    color: "#deb500",
    abilityId: "teleport",
    abilityNames: { en: "teleport", es: "teleport", fr: "teleport" },
    evolution: { level: 40, pokemon: "alakazam" }
  },
  // Evolution from gastly (id: 69)
  {
    id: 153,
    names: { en: "haunter", es: "haunter", fr: "spectrum", pt: "haunter", it: "haunter", de: "alpollo", ja: "ゴースト", ko: "고우스트" },
    color: "#b595de",
    abilityId: "nightmare",
    abilityNames: { en: "nightmare", es: "pesadilla", fr: "cauchemar" },
    evolution: { level: 40, pokemon: "gengar" }
  },

  // ==========================================
  // EVOLUTIONS - Stage 3 (Final) Pokemon
  // ==========================================
  
  // Final evolution from charmeleon
  {
    id: 200,
    names: { en: "charizard", es: "charizard", fr: "dracaufeu", pt: "charizard", it: "charizard", de: "glurak", ja: "リザードン", ko: "리자몽" },
    color: "#ff8463",
    abilityId: "burn",
    abilityNames: { en: "Burn", es: "Quemadura", fr: "Brûlure" }
  },
  // Final evolution from grovyle
  {
    id: 201,
    names: { en: "sceptile", es: "sceptile", fr: "jungko", pt: "sceptile", it: "sceptile", de: "gewaldro", ja: "ジュカイン", ko: "나무킹" },
    color: "#b7d667",
    abilityId: "ambusher",
    abilityNames: { en: "Ambusher", es: "Acechador", fr: "Guetteur" }
  },
  // Final evolution from frogadier
  {
    id: 202,
    names: { en: "greninja", es: "greninja", fr: "amphinobi", pt: "greninja", it: "greninja", de: "quajutsu", ja: "ゲッコウガ", ko: "개굴닌자" },
    color: "#20adbc",
    abilityId: "ninja",
    abilityNames: { en: "Ninja", es: "Ninja", fr: "Ninja" }
  },
  // Final evolution from machoke
  {
    id: 203,
    names: { en: "machamp", es: "machamp", fr: "mackogneur", pt: "machamp", it: "machamp", de: "machomei", ja: "カイリキー", ko: "괴력몬" },
    color: "#8cacb5",
    abilityId: "armorBreak",
    abilityNames: { en: "Armor Break", es: "Rompearmadura", fr: "Brise-Armure" }
  },
  // Final evolution from monferno
  {
    id: 204,
    names: { en: "infernape", es: "infernape", fr: "simiabraz", pt: "infernape", it: "infernape", de: "panferno", ja: "ゴウカザル", ko: "초염몽" },
    color: "#df771e",
    abilityId: "burn",
    abilityNames: { en: "Burn", es: "Quemadura", fr: "Brûlure" }
  },
  // Final evolution from bayleef
  {
    id: 205,
    names: { en: "meganium", es: "meganium", fr: "méganium", pt: "meganium", it: "meganium", de: "meganie", ja: "メガニウム", ko: "메가니움" },
    color: "#d7efa6",
    abilityId: "heal",
    abilityNames: { en: "Heal", es: "Curación", fr: "Soin" }
  },
  // Final evolution from lairon
  {
    id: 206,
    names: { en: "aggron", es: "aggron", fr: "galeking", pt: "aggron", it: "aggron", de: "stolloss", ja: "ボスゴドラ", ko: "보스로라" },
    color: "#afb6bf",
    abilityId: "vigilant",
    abilityNames: { en: "Vigilant", es: "Vigilante", fr: "Vigilant" }
  },
  // Final evolution from dewott
  {
    id: 207,
    names: { en: "samurott", es: "samurott", fr: "clamiral", pt: "samurott", it: "samurott", de: "admurai", ja: "ダイケンキ", ko: "대검귀" },
    color: "#70d8f0",
    abilityId: "focus",
    abilityNames: { en: "Focus", es: "Focus", fr: "Concentration" }
  },
  // Final evolution from vibrava
  {
    id: 208,
    names: { en: "flygon", es: "flygon", fr: "libégon", pt: "flygon", it: "flygon", de: "libelldra", ja: "フライゴン", ko: "플라이곤" },
    color: "#ff9746",
    abilityId: "vigilant",
    abilityNames: { en: "Vigilant", es: "Vigilante", fr: "Vigilant" }
  },
  // Final evolution from pidgeotto
  {
    id: 209,
    names: { en: "pidgeot", es: "pidgeot", fr: "roucarnage", pt: "pidgeot", it: "pidgeot", de: "tauboss", ja: "ピジョット", ko: "피죤투" },
    color: "#e63963",
    abilityId: "vigilant",
    abilityNames: { en: "Vigilant", es: "Vigilante", fr: "Vigilant" }
  },
  // Final evolution from flaaffy
  {
    id: 210,
    names: { en: "ampharos", es: "ampharos", fr: "pharamp", pt: "ampharos", it: "ampharos", de: "ampharos", ja: "デンリュウ", ko: "전룡" },
    color: "#ffe69e",
    abilityId: "stunArea",
    abilityNames: { en: "Stun", es: "Aturdir", fr: "Étourdir" }
  },
  // Final evolution from skiploom
  {
    id: 211,
    names: { en: "jumpluff", es: "jumpluff", fr: "cotovol", pt: "jumpluff", it: "jumpluff", de: "papungha", ja: "ワタッコ", ko: "솜솜코" },
    color: "#e73f67",
    abilityId: "ambusher",
    abilityNames: { en: "Ambusher", es: "Acechador", fr: "Guetteur" }
  },
  // Final evolution from kirlia
  {
    id: 212,
    names: { en: "gardevoir", es: "gardevoir", fr: "gardevoir", pt: "gardevoir", it: "gardevoir", de: "guardevoir", ja: "サーナイト", ko: "가디안" },
    color: "#5ec636",
    abilityId: "synchronySplash",
    abilityNames: { en: "Synchrony", es: "Sincronía", fr: "Synchronisation" }
  },
  // Final evolution from staravia
  {
    id: 213,
    names: { en: "staraptor", es: "staraptor", fr: "étouraptor", pt: "staraptor", it: "staraptor", de: "staraptor", ja: "ムクホーク", ko: "찌르호크" },
    color: "#7e6f6e",
    abilityId: "doubleShot",
    abilityNames: { en: "Double Shot", es: "Disparo Doble", fr: "Tir Double" }
  },
  // Final evolution from kadabra
  {
    id: 214,
    names: { en: "alakazam", es: "alakazam", fr: "alakazam", pt: "alakazam", it: "alakazam", de: "simsala", ja: "フーディン", ko: "후딘" },
    color: "#deb500",
    abilityId: "teleport",
    abilityNames: { en: "teleport", es: "teleport", fr: "teleport" }
  },
  // Final evolution from haunter
  {
    id: 215,
    names: { en: "gengar", es: "gengar", fr: "ectoplasma", pt: "gengar", it: "gengar", de: "gengar", ja: "ゲンガー", ko: "팬텀" },
    color: "#b595de",
    abilityId: "nightmare",
    abilityNames: { en: "nightmare", es: "pesadilla", fr: "cauchemar" }
  }
];

// Helper function to get Pokemon by ID
export function getPokemonById(id: number): PokemonData | undefined {
  return POKEMON_DATABASE.find(p => p.id === id);
}

// Helper function to get Pokemon name by language
export function getPokemonName(pokemon: PokemonData, lang: string): string {
  const langMap: Record<string, keyof PokemonData['names']> = {
    'en': 'en',
    'es': 'es',
    'fr': 'fr',
    'pt': 'pt',
    'it': 'it',
    'de': 'de',
    'ja': 'ja',
    'ko': 'ko'
  };
  
  const key = langMap[lang] || 'en';
  const name = pokemon.names[key];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Helper function to get ability name by language
export function getAbilityNameByLang(pokemon: PokemonData, lang: string): string {
  if (lang === 'es') return pokemon.abilityNames.es;
  if (lang === 'fr') return pokemon.abilityNames.fr;
  return pokemon.abilityNames.en;
}

// Get all Pokemon sorted by name in a given language
export function getAllPokemonSorted(lang: string): PokemonData[] {
  return [...POKEMON_DATABASE].sort((a, b) => {
    const nameA = getPokemonName(a, lang).toLowerCase();
    const nameB = getPokemonName(b, lang).toLowerCase();
    return nameA.localeCompare(nameB);
  });
}

// Search Pokemon by name (supports multiple languages)
export function searchPokemon(query: string): PokemonData[] {
  const lowerQuery = query.toLowerCase();
  return POKEMON_DATABASE.filter(pokemon => {
    return Object.values(pokemon.names).some(name => 
      name.toLowerCase().includes(lowerQuery)
    );
  });
}
