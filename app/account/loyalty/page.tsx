export default function LoyaltyPage() {
  const coins = 420
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Loyalty Coins</h1>
      <div className="rounded-lg border p-6 bg-gradient-to-r from-orange-100 to-green-100 dark:from-orange-900/30 dark:to-green-900/30">
        <div className="text-sm">Your balance</div>
        <div className="text-4xl font-extrabold text-orange-600">{coins} DM Coins</div>
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
          Earn 1 coin per $1. Reach 500 coins for 5% off.
        </p>
      </div>
    </div>
  )
}
