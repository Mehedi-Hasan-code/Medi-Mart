import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

// format duplicate-removal logic
// Group data by orderId and buyer for rowSpan logic
const groupOrders = (data) => {
  if (!Array.isArray(data)) return [];
  const orders = {};
  data.forEach((row) => {
    const key = `${row.orderId}_${row.buyer}`;
    if (!orders[key]) {
      orders[key] = { ...row, items: [] };
    }
    orders[key].items.push({
      seller: row.seller,
      itemName: row.itemName,
      itemPrice: row.itemPrice,
    });
  });

  // For each order, group items by consecutive sellers
  return Object.values(orders).map(order => {
    const sellerGroups = [];
    let lastSeller = null;
    let currentGroup = null;
    order.items.forEach(item => {
      if (item.seller !== lastSeller) {
        if (currentGroup) sellerGroups.push(currentGroup);
        currentGroup = { seller: item.seller, items: [] };
        lastSeller = item.seller;
      }
      currentGroup.items.push(item);
    });
    if (currentGroup) sellerGroups.push(currentGroup);
    return { ...order, sellerGroups };
  });
};

const TanstackTable = ({ data }) => {
  // Prepare TanStack Table columns for cell access
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      { accessorKey: 'orderId', header: 'Order' },
      { accessorKey: 'buyer', header: 'Buyer Email' },
      { accessorKey: 'seller', header: 'Seller' },
      { accessorKey: 'itemName', header: 'Item' },
      { accessorKey: 'itemPrice', header: 'Item Price', cell: info => `$${info.getValue()?.toFixed(2)}` },
      { accessorKey: 'totalPrice', header: 'Total Price', cell: info => info.getValue() ? `$${info.getValue()?.toFixed(2)}` : '' },
      { accessorKey: 'status', header: 'Status', cell: info => (
        <span className={`px-2 py-1 rounded text-white ${info.getValue() === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`}>
          {info.getValue()}
        </span>
      ) },
    ],
    []
  );

  // Group for rowSpan logic
  const orders = useMemo(() => groupOrders(data), [data]);


  // Pagination state
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // Paginate orders, not items
  const pageCount = Math.ceil(orders.length / pageSize);
  const paginatedOrders = useMemo(() => {
    return orders.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }, [orders, pageIndex, pageSize]);

  // Flatten only the paginated orders
  const flatRows = useMemo(() => {
    return paginatedOrders.flatMap(order => {
      let rows = [];
      order.sellerGroups.forEach(sellerGroup => {
        sellerGroup.items.forEach((item, idx) => {
          rows.push({
            orderId: order.orderId,
            buyer: order.buyer,
            seller: sellerGroup.seller,
            itemName: item.itemName,
            itemPrice: item.itemPrice,
            totalPrice: order.totalPrice,
            status: order.status,
            _orderRowSpan: order.sellerGroups.reduce((sum, g) => sum + g.items.length, 0),
            _isFirstOrderRow: rows.length === 0,
            _sellerRowSpan: sellerGroup.items.length,
            _isFirstSellerRow: idx === 0,
          });
        });
      });
      return rows;
    });
  }, [paginatedOrders]);

  const table = useReactTable({
    data: flatRows,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: 'auto',
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sales Report</h2>
      {/* Global Filter */}
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full max-w-xs"
          placeholder="Search all columns..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  // Sorting indicator
                  const isSortable = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  return (
                    <th
                      className={`p-2 border text-left select-none cursor-pointer ${isSortable ? 'hover:bg-gray-200' : ''}`}
                      key={header.id}
                      onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <span className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {isSortable && (
                          sortDir === 'asc' ? <span>▲</span> : sortDir === 'desc' ? <span>▼</span> : <span className="opacity-30">⇅</span>
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const r = row.original;
              return (
                <tr key={row.id}>
                  {/* Order ID */}
                  {r._isFirstOrderRow ? (
                    <td className="p-2 border" rowSpan={r._orderRowSpan}>{r.orderId}</td>
                  ) : null}
                  {/* Buyer Email */}
                  {r._isFirstOrderRow ? (
                    <td className="p-2 border" rowSpan={r._orderRowSpan}>{r.buyer}</td>
                  ) : null}
                  {/* Seller (merged if consecutive) */}
                  {r._isFirstSellerRow ? (
                    <td className="p-2 border" rowSpan={r._sellerRowSpan}>{r.seller}</td>
                  ) : null}
                  {/* Item */}
                  <td className="p-2 border">{r.itemName}</td>
                  {/* Item Price */}
                  <td className="p-2 border">{flexRender(columns[4].cell, { getValue: () => r.itemPrice })}</td>
                  {/* Total Price */}
                  {r._isFirstOrderRow ? (
                    <td className="p-2 border" rowSpan={r._orderRowSpan}>{flexRender(columns[5].cell, { getValue: () => r.totalPrice })}</td>
                  ) : null}
                  {/* Status */}
                  {r._isFirstOrderRow ? (
                    <td className="p-2 border" rowSpan={r._orderRowSpan}>{flexRender(columns[6].cell, { getValue: () => r.status })}</td>
                  ) : null}
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center gap-2 mt-4">
        <button
          className="border px-2 py-1 rounded"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
        >
          Previous
        </button>
        <span>Page {pageIndex + 1} of {pageCount}</span>
        <button
          className="border px-2 py-1 rounded"
          onClick={() => setPageIndex((prev) => Math.min(prev + 1, pageCount - 1))}
          disabled={pageIndex >= pageCount - 1}
        >
          Next
        </button>
        <select
          className="border p-1 rounded ml-2"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
            setPageIndex(0);
          }}
        >
          {[5, 10, 20, 30, 40, 50].map(size => (
            <option key={size} value={size}>Show {size}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TanstackTable;
