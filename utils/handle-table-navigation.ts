import { KeyboardEvent } from "react";

const GROUP_ORDER = ["first", "second", "deserts"]; // порядок таблиц

export function handleMultiTableNavigation(e: KeyboardEvent<HTMLInputElement>) {
  const key = e.key;
  const input = e.currentTarget;

  const row = Number(input.dataset.row);
  const col = Number(input.dataset.col);
  const group = input.dataset.group as string;

  if (!group) return;

  if (
    !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(key)
  ) {
    return;
  }

  e.preventDefault();

  let target: HTMLInputElement | null = null;

  // 👉 helper
  const find = (g: string, r: number, c: number) =>
    document.querySelector<HTMLInputElement>(
      `input[data-group="${g}"][data-row="${r}"][data-col="${c}"]:not(:disabled)`,
    );

  const currentGroupIndex = GROUP_ORDER.indexOf(group);

  switch (key) {
    case "ArrowRight":
    case "Enter":
      target = find(group, row, col + 1);
      break;

    case "ArrowLeft":
      target = find(group, row, col - 1);
      break;

    case "ArrowDown":
      // ↓ внутри текущей таблицы
      target = find(group, row + 1, col);

      // 👉 если строки нет — идём в следующую таблицу
      if (!target && currentGroupIndex < GROUP_ORDER.length - 1) {
        const nextGroup = GROUP_ORDER[currentGroupIndex + 1];
        target = find(nextGroup, 0, col);
      }
      break;

    case "ArrowUp":
      target = find(group, row - 1, col);

      // 👉 если строки нет — идём в предыдущую таблицу
      if (!target && currentGroupIndex > 0) {
        const prevGroup = GROUP_ORDER[currentGroupIndex - 1];

        // ищем последнюю строку в предыдущей группе
        const all = document.querySelectorAll<HTMLInputElement>(
          `input[data-group="${prevGroup}"][data-col="${col}"]:not(:disabled)`,
        );

        target = all.length ? all[all.length - 1] : null;
      }
      break;
  }

  target?.focus();
}
