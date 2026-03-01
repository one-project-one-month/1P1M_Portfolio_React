import { create } from "zustand"

export interface IdeaToPortfolio {
    name: string
    status: 'Planning'
    desc: string


}

interface IdeaToPortfolioStore {
    portfolio: IdeaToPortfolio | null,
    setPortfolio: (portfolio: IdeaToPortfolio) => void
    clearPortfolio: () => void

}


export const useIdeaToPortfolioStore = create<IdeaToPortfolioStore>(

    (set) => ({
        portfolio: null,
        setPortfolio: (portfolio) => set({ portfolio: portfolio }),
        clearPortfolio: () => set({ portfolio: null })
    })
)