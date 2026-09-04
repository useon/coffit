export type LowCostCoffeeBrandId =
  | "mega"
  | "compose"
  | "paik"
  | "mammoth"
  | "theVenti";

export type LowCostCoffeeBrand = {
  id: LowCostCoffeeBrandId;
  name: string;
  aliases: string[];
};

export const LOW_COST_COFFEE_BRANDS: LowCostCoffeeBrand[] = [
  {
    id: "mega",
    name: "메가MGC커피",
    aliases: ["메가MGC커피", "메가커피", "MEGA MGC COFFEE", "MEGA COFFEE"],
  },
  {
    id: "compose",
    name: "컴포즈커피",
    aliases: ["컴포즈커피", "COMPOSE COFFEE"],
  },
  {
    id: "paik",
    name: "빽다방",
    aliases: ["빽다방", "PAIK'S COFFEE", "PAIKS COFFEE"],
  },
  {
    id: "mammoth",
    name: "매머드커피",
    aliases: ["매머드커피", "매머드익스프레스", "MAMMOTH COFFEE"],
  },
  {
    id: "theVenti",
    name: "더벤티",
    aliases: ["더벤티", "THE VENTI"],
  },
];
