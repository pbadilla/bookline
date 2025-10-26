export interface Tier {
  id: string;
  name: string;
  color: string;
  discountPercentage: number;
}

export const tiers: Record<string, Tier> = {
  bronze: {
    id: 'bronze',
    name: 'Bronze',
    color: '#CD7F32',
    discountPercentage: 5
  },
  silver: {
    id: 'silver',
    name: 'Silver',
    color: '#C0C0C0',
    discountPercentage: 10
  },
  gold: {
    id: 'gold',
    name: 'Gold',
    color: '#FFD700',
    discountPercentage: 15
  }
};

export function getTierInfo(tierId: string = 'bronze'): Tier {
  return tiers[tierId] || tiers.bronze;
}