import { nanoid } from "./nanoid";
import type { OrderItemType } from "./ServiceOrder";

export interface TemplateOrderItem {
  id: string;
  type: OrderItemType;
  label: string;
  order: number;
}

export interface ServiceTemplate {
  id: string;
  name: string;
  description: string;
  areaIds: string[];
  orderItems: TemplateOrderItem[];
}

export function createTemplate(input: {
  name: string;
  description?: string;
  areaIds?: string[];
  orderItems?: TemplateOrderItem[];
}): ServiceTemplate {
  if (!input.name) throw new Error("name is required");

  return {
    id: nanoid(),
    name: input.name,
    description: input.description ?? "",
    areaIds: input.areaIds ?? [],
    orderItems: input.orderItems ?? [],
  };
}