import clsx from "clsx";

export enum Colors {
  UNDEFINED,
  SLATE,
  GRAY,
  NEUTRAL,
  STONE,
  RED,
  ORANGE,
  AMBER,
  YELLOW,
  LIME,
  GREEN,
  EMERALD,
  TEAL,
  CYAN,
  SKY,
  BLUE,
  INDIGO,
  VIOLET,
  PURPLE,
  FUCHSIA,
  PINK,
  ROSE,
}

export function getColors(main?: boolean) {
  if (main) {
    return [
      Colors.GRAY,
      Colors.RED,
      Colors.ORANGE,
      Colors.YELLOW,
      Colors.GREEN,
      Colors.TEAL,
      Colors.CYAN,
      Colors.SKY,
      Colors.BLUE,
      Colors.INDIGO,
      Colors.VIOLET,
      Colors.PURPLE,
      Colors.FUCHSIA,
      Colors.PINK,
      Colors.ROSE,
    ];
  }
  return [
    Colors.SLATE,
    Colors.GRAY,
    Colors.NEUTRAL,
    Colors.STONE,
    Colors.RED,
    Colors.ORANGE,
    Colors.AMBER,
    Colors.YELLOW,
    Colors.LIME,
    Colors.GREEN,
    Colors.EMERALD,
    Colors.TEAL,
    Colors.CYAN,
    Colors.SKY,
    Colors.BLUE,
    Colors.INDIGO,
    Colors.VIOLET,
    Colors.PURPLE,
    Colors.FUCHSIA,
    Colors.PINK,
    Colors.ROSE,
  ];
}

type TailwindColor = `${"text"}-${string}-500`;
export const colorMap: Record<Colors, TailwindColor> = {
  [Colors.UNDEFINED]: "text-gray-500",
  [Colors.SLATE]: "text-slate-500",
  [Colors.GRAY]: "text-gray-500",
  [Colors.NEUTRAL]: "text-neutral-500",
  [Colors.STONE]: "text-stone-500",
  [Colors.RED]: "text-red-500",
  [Colors.ORANGE]: "text-orange-500",
  [Colors.AMBER]: "text-amber-500",
  [Colors.YELLOW]: "text-yellow-500",
  [Colors.LIME]: "text-lime-500",
  [Colors.GREEN]: "text-green-500",
  [Colors.EMERALD]: "text-emerald-500",
  [Colors.TEAL]: "text-teal-500",
  [Colors.CYAN]: "text-cyan-500",
  [Colors.SKY]: "text-sky-500",
  [Colors.BLUE]: "text-blue-500",
  [Colors.INDIGO]: "text-indigo-500",
  [Colors.VIOLET]: "text-violet-500",
  [Colors.PURPLE]: "text-purple-500",
  [Colors.FUCHSIA]: "text-fuchsia-500",
  [Colors.PINK]: "text-pink-500",
  [Colors.ROSE]: "text-rose-500",
};

export function getTailwindColor(itemColor: Colors): string {
  return colorMap[itemColor] ?? "";
}

// export const colors = [
//   {
//     name: "GRAY",
//     id: 3,
//   },
//   {
//     name: "SLATE",
//     id: 1,
//   },
//   {
//     name: "RED",
//     id: 6,
//   },
//   {
//     name: "ORANGE",
//     id: 7,
//   },
//   {
//     name: "AMBER",
//     id: 8,
//   },
//   {
//     name: "YELLOW",
//     id: 9,
//   },
//   {
//     name: "LIME",
//     id: 10,
//   },
//   {
//     name: "GREEN",
//     id: 11,
//   },
//   {
//     name: "EMERALD",
//     id: 12,
//   },
//   {
//     name: "TEAL",
//     id: 13,
//   },
//   {
//     name: "CYAN",
//     id: 14,
//   },
//   {
//     name: "SKY",
//     id: 15,
//   },
//   {
//     name: "BLUE",
//     id: 16,
//   },
//   {
//     name: "INDIGO",
//     id: 17,
//   },
//   {
//     name: "VIOLET",
//     id: 18,
//   },
//   {
//     name: "PURPLE",
//     id: 19,
//   },
//   {
//     name: "PINK",
//     id: 20,
//   },
//   {
//     name: "ROSE",
//     id: 21,
//   },
// ];

export const badgeBgColor = {
  [Colors.UNDEFINED]: "bg-gray-50 border border-gray-200 text-gray-600",
  [Colors.SLATE]: "bg-slate-50 border border-slate-200 text-slate-600",
  [Colors.GRAY]: "bg-gray-50 border border-gray-200 text-gray-600",
  [Colors.NEUTRAL]: "bg-neutral-50 border border-neutral-200 text-neutral-600",
  [Colors.STONE]: "bg-stone-50 border border-stone-200 text-stone-600",
  [Colors.RED]: "bg-red-50 border border-red-200 text-red-600",
  [Colors.ORANGE]: "bg-orange-50 border border-orange-200 text-orange-600",
  [Colors.AMBER]: "bg-amber-50 border border-amber-200 text-amber-600",
  [Colors.YELLOW]: "bg-yellow-50 border border-yellow-200 text-yellow-600",
  [Colors.LIME]: "bg-lime-50 border border-lime-200 text-lime-600",
  [Colors.GREEN]: "bg-green-50 border border-green-200 text-green-600",
  [Colors.EMERALD]: "bg-emerald-50 border border-emerald-200 text-emerald-600",
  [Colors.TEAL]: "bg-teal-50 border border-teal-200 text-teal-600",
  [Colors.CYAN]: "bg-cyan-50 border border-cyan-200 text-cyan-600",
  [Colors.SKY]: "bg-sky-50 border border-sky-200 text-sky-600",
  [Colors.BLUE]: "bg-blue-50 border border-blue-200 text-blue-600",
  [Colors.INDIGO]: "bg-indigo-50 border border-indigo-200 text-indigo-600",
  [Colors.VIOLET]: "bg-violet-50 border border-violet-200 text-violet-600",
  [Colors.PURPLE]: "bg-purple-50 border border-purple-200 text-purple-600",
  [Colors.FUCHSIA]: "bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-600",
  [Colors.PINK]: "bg-pink-50 border border-pink-200 text-pink-600",
  [Colors.ROSE]: "bg-rose-50 border border-rose-200 text-rose-600",
};

export const badgeBgColorDarkMode = {
  [Colors.UNDEFINED]: "dark:bg-gray-900 dark:border dark:border-gray-700 dark:text-gray-400",
  [Colors.SLATE]: "dark:bg-slate-900 dark:border dark:border-slate-700 dark:text-slate-400",
  [Colors.GRAY]: "dark:bg-gray-900 dark:border dark:border-gray-700 dark:text-gray-400",
  [Colors.NEUTRAL]: "dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-400",
  [Colors.STONE]: "dark:bg-stone-900 dark:border dark:border-stone-700 dark:text-stone-400",
  [Colors.RED]: "dark:bg-red-900 dark:border dark:border-red-700 dark:text-red-400",
  [Colors.ORANGE]: "dark:bg-orange-900 dark:border dark:border-orange-700 dark:text-orange-400",
  [Colors.AMBER]: "dark:bg-amber-900 dark:border dark:border-amber-700 dark:text-amber-400",
  [Colors.YELLOW]: "dark:bg-yellow-900 dark:border dark:border-yellow-700 dark:text-yellow-400",
  [Colors.LIME]: "dark:bg-lime-900 dark:border dark:border-lime-700 dark:text-lime-400",
  [Colors.GREEN]: "dark:bg-green-900 dark:border dark:border-green-700 dark:text-green-400",
  [Colors.EMERALD]: "dark:bg-emerald-900 dark:border dark:border-emerald-700 dark:text-emerald-400",
  [Colors.TEAL]: "dark:bg-teal-900 dark:border dark:border-teal-700 dark:text-teal-400",
  [Colors.CYAN]: "dark:bg-cyan-900 dark:border dark:border-cyan-700 dark:text-cyan-400",
  [Colors.SKY]: "dark:bg-sky-900 dark:border dark:border-sky-700 dark:text-sky-400",
  [Colors.BLUE]: "dark:bg-blue-900 dark:border dark:border-blue-700 dark:text-blue-400",
  [Colors.INDIGO]: "dark:bg-indigo-900 dark:border dark:border-indigo-700 dark:text-indigo-400",
  [Colors.VIOLET]: "dark:bg-violet-900 dark:border dark:border-violet-700 dark:text-violet-400",
  [Colors.PURPLE]: "dark:bg-purple-900 dark:border dark:border-purple-700 dark:text-purple-400",
  [Colors.FUCHSIA]: "dark:bg-fuchsia-900 dark:border dark:border-fuchsia-700 dark:text-fuchsia-400",
  [Colors.PINK]: "dark:bg-pink-900 dark:border dark:border-pink-700 dark:text-pink-400",
  [Colors.ROSE]: "dark:bg-rose-900 dark:border dark:border-rose-700 dark:text-rose-400",
};

export const textColor = {
  [Colors.UNDEFINED]: "text-gray-600",
  [Colors.SLATE]: "text-slate-600",
  [Colors.GRAY]: "text-gray-600",
  [Colors.NEUTRAL]: "text-neutral-600",
  [Colors.STONE]: "text-stone-600",
  [Colors.RED]: "text-red-600",
  [Colors.ORANGE]: "text-orange-600",
  [Colors.AMBER]: "text-amber-600",
  [Colors.YELLOW]: "text-yellow-600",
  [Colors.LIME]: "text-lime-600",
  [Colors.GREEN]: "text-green-600",
  [Colors.EMERALD]: "text-emerald-600",
  [Colors.TEAL]: "text-teal-600",
  [Colors.CYAN]: "text-cyan-600",
  [Colors.SKY]: "text-sky-600",
  [Colors.BLUE]: "text-blue-600",
  [Colors.INDIGO]: "text-indigo-600",
  [Colors.VIOLET]: "text-violet-600",
  [Colors.PURPLE]: "text-purple-600",
  [Colors.FUCHSIA]: "text-fuchsia-600",
  [Colors.PINK]: "text-pink-600",
  [Colors.ROSE]: "text-rose-600",
};

export const badgeBgColorStrong = {
  [Colors.UNDEFINED]: "bg-gray-400 border-gray-900 text-gray-900",
  [Colors.SLATE]: "bg-slate-400 border-slate-900 text-slate-900",
  [Colors.GRAY]: "bg-gray-400 border-gray-900 text-gray-900",
  [Colors.NEUTRAL]: "bg-neutral-400 border-neutral-900 text-neutral-900",
  [Colors.STONE]: "bg-stone-400 border-stone-900 text-stone-900",
  [Colors.RED]: "bg-red-400 border-red-900 text-red-900",
  [Colors.ORANGE]: "bg-orange-400 border-orange-900 text-orange-900",
  [Colors.AMBER]: "bg-amber-400 border-amber-900 text-amber-900",
  [Colors.YELLOW]: "bg-yellow-400 border-yellow-900 text-yellow-900",
  [Colors.LIME]: "bg-lime-400 border-lime-900 text-lime-900",
  [Colors.GREEN]: "bg-green-400 border-green-900 text-green-900",
  [Colors.EMERALD]: "bg-emerald-400 border-emerald-900 text-emerald-900",
  [Colors.TEAL]: "bg-teal-400 border-teal-900 text-teal-900",
  [Colors.CYAN]: "bg-cyan-400 border-cyan-900 text-cyan-900",
  [Colors.SKY]: "bg-sky-400 border-sky-900 text-sky-900",
  [Colors.BLUE]: "bg-blue-400 border-blue-900 text-blue-900",
  [Colors.INDIGO]: "bg-indigo-400 border-indigo-900 text-indigo-900",
  [Colors.VIOLET]: "bg-violet-400 border-violet-900 text-violet-900",
  [Colors.PURPLE]: "bg-purple-400 border-purple-900 text-purple-900",
  [Colors.FUCHSIA]: "bg-fuchsia-400 border-fuchsia-900 text-fuchsia-900",
  [Colors.PINK]: "bg-pink-400 border-pink-900 text-pink-900",
  [Colors.ROSE]: "bg-rose-400 border-rose-900 text-rose-900",
};

export function getBadgeColor(itemColor: Colors | null | undefined, strong?: boolean): string {
  if (!itemColor) {
    itemColor = Colors.UNDEFINED;
  }
  return clsx(badgeBgColor[itemColor] ?? "", strong && (badgeBgColorStrong[itemColor] ?? ""));
}

export function getBadgeColorDark(itemColor: Colors | null | undefined, strong?: boolean): string {
  if (!itemColor) {
    itemColor = Colors.UNDEFINED;
  }
  return clsx(badgeBgColorDarkMode[itemColor]);
}

export function getTextColor(itemColor: Colors | null | undefined): string {
  if (!itemColor) {
    itemColor = Colors.UNDEFINED;
  }
  return clsx(textColor[itemColor] ?? "");
}

export const colorToBg = {
  [Colors.UNDEFINED]: "bg-gray-500",
  [Colors.SLATE]: "bg-slate-500",
  [Colors.GRAY]: "bg-gray-500",
  [Colors.NEUTRAL]: "bg-neutral-500",
  [Colors.STONE]: "bg-stone-500",
  [Colors.RED]: "bg-red-500",
  [Colors.ORANGE]: "bg-orange-500",
  [Colors.AMBER]: "bg-amber-500",
  [Colors.YELLOW]: "bg-yellow-500",
  [Colors.LIME]: "bg-lime-500",
  [Colors.GREEN]: "bg-green-500",
  [Colors.EMERALD]: "bg-emerald-500",
  [Colors.TEAL]: "bg-teal-500",
  [Colors.CYAN]: "bg-cyan-500",
  [Colors.SKY]: "bg-sky-500",
  [Colors.BLUE]: "bg-blue-500",
  [Colors.INDIGO]: "bg-indigo-500",
  [Colors.VIOLET]: "bg-violet-500",
  [Colors.PURPLE]: "bg-purple-500",
  [Colors.FUCHSIA]: "bg-fuchsia-500",
  [Colors.PINK]: "bg-pink-500",
  [Colors.ROSE]: "bg-rose-500",
};

export function getBackgroundColor(itemColor: Colors): string {
  return colorToBg[itemColor] ?? "";
}
