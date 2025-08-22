export default function NotificationsPage() {
  const notifications = [
    { id: 1, title: "Summer Heat Sale", body: "Up to 30% off select masalas.", date: "Today" },
    { id: 2, title: "Order Shipped", body: "Your order DM123355 is on the way.", date: "3 days ago" },
  ]
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <ul className="space-y-3">
        {notifications.map((n) => (
          <li key={n.id} className="rounded border p-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">{n.title}</div>
              <div className="text-xs text-neutral-500">{n.date}</div>
            </div>
            <p className="text-sm">{n.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
