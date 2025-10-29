import React, { useContext, useMemo } from 'react';
import { AdminContext } from './AdminContext';
import Papa from 'papaparse';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// A simple card component for displaying stats
const ReportStatCard = ({ title, value, icon, color }) => (
    <div className="col">
        <div className={`card h-100 shadow-sm border-start border-4 border-${color}`}>
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col">
                        <div className={`text-xs fw-bold text-${color} text-uppercase mb-1`}>{title}</div>
                        <div className="h5 mb-0 fw-bold text-gray-800">{value}</div>
                    </div>
                    <div className="col-auto">
                        <i className={`bi ${icon} fs-2 text-gray-300`}></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


function Reports() {
    const { orders, products, isLoading } = useContext(AdminContext);

    // Memoized calculations for performance
    const reportData = useMemo(() => {
        if (!orders || orders.length === 0) {
            return {
                totalRevenue: 0,
                totalOrders: 0,
                deliveredOrdersCount: 0,
                averageOrderValue: 0,
                topSellingProducts: [],
                orderStatusCounts: {},
            };
        }

        const deliveredOrders = orders.filter(o => o.status === 'Delivered');
        const totalRevenue = deliveredOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        const averageOrderValue = deliveredOrders.length > 0 ? totalRevenue / deliveredOrders.length : 0;

        const productSales = new Map();
        deliveredOrders.forEach(order => {
            order.cart.forEach(item => {
                const sold = productSales.get(item.id) || 0;
                productSales.set(item.id, sold + item.quantity);
            });
        });

        const topSellingProducts = Array.from(productSales.entries())
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([productId, quantitySold]) => {
                const product = products.find(p => p.id === productId);
                return { name: product?.name || 'Unknown Product', quantitySold };
            });

        const orderStatusCounts = orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        }, {});


        return {
            totalRevenue,
            totalOrders: orders.length,
            deliveredOrdersCount: deliveredOrders.length,
            averageOrderValue,
            topSellingProducts,
            orderStatusCounts,
        };
    }, [orders, products]);

    // Function to generate and download CSV
    const handleGenerateReport = () => {
        const deliveredOrders = orders.filter(o => o.status === 'Delivered');
        const csvData = deliveredOrders.map(order => ({
            "Order ID": order.id,
            "Customer Email": order.userEmail,
            "Date": new Date(order.createdAt).toLocaleDateString(),
            "Total Amount": order.total.toFixed(2),
            "Status": order.status,
            "Products": order.cart.map(item => `${item.name} (Qty: ${item.quantity})`).join(', ')
        }));

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `hyjain-sales-report-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    // Chart configuration
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Order Status Distribution' },
        },
    };
    const chartData = {
        labels: Object.keys(reportData.orderStatusCounts),
        datasets: [{
            label: '# of Orders',
            data: Object.values(reportData.orderStatusCounts),
            backgroundColor: 'rgba(0, 106, 78, 0.6)',
        }],
    };


    if (isLoading) return <div className="text-center p-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Sales & Performance Reports</h1>
                <button className="btn btn-primary shadow-sm" onClick={handleGenerateReport}>
                    <i className="bi bi-download me-2"></i>Generate Sales Report (CSV)
                </button>
            </div>

            {/* Stat Cards */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 mb-4">
                <ReportStatCard title="Total Revenue" value={`₹${reportData.totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon="bi-currency-rupee" color="success" />
                <ReportStatCard title="Total Orders" value={reportData.totalOrders} icon="bi-cart3" color="primary" />
                <ReportStatCard title="Avg. Order Value" value={`₹${reportData.averageOrderValue.toFixed(2)}`} icon="bi-graph-up" color="info" />
                <ReportStatCard title="Delivered Orders" value={reportData.deliveredOrdersCount} icon="bi-check2-circle" color="warning" />
            </div>

            {/* Detailed Breakdowns */}
            <div className="row g-4">
                <div className="col-lg-7">
                    <div className="card shadow-sm h-100">
                        <div className="card-header">
                            <h5 className="mb-0">Order Status</h5>
                        </div>
                        <div className="card-body">
                           <Bar options={chartOptions} data={chartData} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="card shadow-sm h-100">
                        <div className="card-header">
                            <h5 className="mb-0">Top 5 Selling Products</h5>
                        </div>
                        <div className="card-body">
                            {reportData.topSellingProducts.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {reportData.topSellingProducts.map(p => (
                                        <li key={p.name} className="list-group-item d-flex justify-content-between align-items-center">
                                            {p.name}
                                            <span className="badge bg-primary rounded-pill">{p.quantitySold} sold</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted">No delivered orders with products found yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reports;