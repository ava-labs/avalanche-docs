import { LucideIcon } from 'lucide-react';

export type StepType<StepGroupListType> = {
    title: string;
    component: React.ReactNode;
    group: keyof StepGroupListType;
}

export type StepListType = Record<string, StepType<StepGroupListType>;

export interface StepGroupType {
    title: string;
    icon: LucideIcon;
  }

export type StepGroupListType = Record<string, StepGroupType>;