import React, { useMemo } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage = (props: Props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount <= 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances]);

  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      };
    });
  }, [sortedBalances]); //usememo

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...props}>{rows}</div>;
};



// Explain:

// 1. Remove  const { children, ...rest } = props; because its redundant code
// 2. Prop Walletbalance add blockchain type string 
// 3. Because formatedbalance inheritance Walletbalance, so I remove  curency + amount ( it overrided key although the same)
// 4. Instend using sortbalance it need to be formattedbalance
// 5. lhs should be in balabncePriority
// 6. Update logic code return balancePriority > -99 && balance.amount <= 0
// 7. Update logic for rightPriority + leftPriority, it should be return rightPriority - leftPriority;
// 8. In function sortedBalances, remove dependency prices because its redundant
// 9. Need to define component WalletRow, prop BoxProps
// 10. Need to export default WalletPage to use