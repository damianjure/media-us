import { nanoid } from "./nanoid";

export type OrderItemType = "song" | "space" | "header" | "media";

export interface ServiceOrderItem {
  id: string;
  type: OrderItemType;
  label: string;
  order: number;
}

export interface ServiceOrder {
  id: string;
  serviceId: string;
  items: ServiceOrderItem[];
}

export function createServiceOrder(input: {
  serviceId: string;
  items?: ServiceOrderItem[];
}): ServiceOrder {
  return {
    id: nanoid(),
    serviceId: input.serviceId,
    items: input.items ?? [],
  };
}

export function reorderItems(
  order: ServiceOrder,
  fromIndex: number,
  toIndex: number,
): ServiceOrder {
  const items = [...order.items];
  const maxIndex = items.length - 1;

  const from = Math.max(0, Math.min(fromIndex, maxIndex));
  const to = Math.max(0, Math.min(toIndex, maxIndex));

  if (from === to) return order;

  const [item] = items.splice(from, 1);
  items.splice(to, 0, item);

  return {
    ...order,
    items: items.map((it, i) => ({ ...it, order: i })),
  };
}