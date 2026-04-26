import { OrdersFilter } from "@/components/admin/OrdersFilter";
import { getAllOrders } from "@/lib/data";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div>
      <div>
        <p className="brand-wordmark text-xs uppercase text-muted-foreground">Захиалгууд</p>
        <h1 className="mt-2 text-3xl font-light">Захиалгуудыг удирдах</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Төлбөр баталгаажуулсны дараа хэрэглэгчид сургалт автоматаар email-ээр илгээгдэнэ.
        </p>
      </div>

      <OrdersFilter orders={orders} />
    </div>
  );
}
