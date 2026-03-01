import { useIdeaToPortfolioStore, type IdeaToPortfolio } from "@/store/idea-to-portfolio"


export const useIdeaToPortfolio = (portfolio: IdeaToPortfolio) => {

    if (portfolio) {
        useIdeaToPortfolioStore().setPortfolio(portfolio);
    }




}