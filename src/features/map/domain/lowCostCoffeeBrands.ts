export const LOW_COST_COFFEE_BRANDS = [
  {
    id: "mega",
    name: "메가MGC커피",
    aliases: ["메가MGC커피", "메가커피", "MEGA MGC COFFEE", "MEGA COFFEE"],
  },
  {
    id: "compose",
    name: "컴포즈커피",
    aliases: ["컴포즈커피", "컴포즈", "COMPOSE"],
  },
  {
    id: "paik",
    name: "빽다방",
    aliases: ["빽다방", "PAIK'S COFFEE", "PAIKS COFFEE"],
  },
  {
    id: "theVenti",
    name: "더벤티",
    aliases: ["더벤티", "THE VENTI"],
  },
  {
    id: "mammoth",
    name: "매머드커피",
    aliases: ["매머드커피", "매머드익스프레스", "MAMMOTH COFFEE"],
  },
] as const;

export type LowCostCoffeeBrand = (typeof LOW_COST_COFFEE_BRANDS)[number];

export type LowCostCoffeeBrandId = LowCostCoffeeBrand["id"];

export const LOW_COST_COFFEE_BRAND_IDS = LOW_COST_COFFEE_BRANDS.map(
  ({ id }) => id,
);
