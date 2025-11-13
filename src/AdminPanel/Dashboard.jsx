import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from './AdminContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';


import CarouselManager from './CarouselManager';

// Register the components Chart.js needs
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// The StatCard component is fine, no changes needed here.
function StatCard({ title, value, icon, color, link, desc }) {
  return (
    <div className="col">
      <div className={`card h-100 shadow-sm border-start border-4 border-${color}`}>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col">
              <div className={`text-xs fw-bold text-${color} text-uppercase mb-1`}>{title}</div>
              <div className="h5 mb-0 fw-bold text-gray-800">{value}</div>
              <small className="text-muted">{desc}</small>
            </div>
            <div className="col-auto">
              <i className={`bi ${icon} fs-2 text-gray-300`}></i>
            </div>
          </div>
          <Link to={link} className="stretched-link"></Link>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { orders, users } = useContext(AdminContext);

  const productCount = orders?.length || 0;
  
  const totalRevenue = orders
    ?.filter(order => order.status === 'Delivered')
    .reduce((sum, order) => sum + (order.total || 0), 0);
    
  const pendingOrders = orders?.filter(order => order.status === 'Pending').length || 0;
  const userCount = users?.length || 0;

  // ✅ FIX: THIS LOGIC NOW USES THE PRODUCT NAME SAVED WITH THE ORDER.
  const topProductsData = useMemo(() => {
    if (!orders || orders.length === 0) {
        return { labels: [], data: [] };
    }
    const deliveredOrders = orders.filter(o => o.status === 'Delivered');

    const productSales = new Map();
    deliveredOrders.forEach(order => {
        (order.cart || []).forEach(item => {
            // Ensure the cart item has the necessary data
            if (item.id && item.name) {
                const existingProduct = productSales.get(item.id);
                if (existingProduct) {
                    // If product already in our map, just add to its quantity
                    existingProduct.quantity += item.quantity;
                } else {
                    // If new, add it to the map with its name and quantity
                    productSales.set(item.id, {
                        name: item.name,
                        quantity: item.quantity,
                    });
                }
            }
        });
    });

    // Convert map values to an array, sort by quantity, and take the top 5
    const topSold = Array.from(productSales.values())
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);
    
    // Extract labels (names) and data (quantities) for the chart
    const labels = topSold.map(product => product.name);
    const data = topSold.map(product => product.quantity);

    return { labels, data };
  }, [orders]); // Now only depends on orders, not the live product list


  // Chart configuration (no changes here)
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Units Sold from Delivered Orders',
      },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1,
            },
        },
    },
  };

  const chartData = {
    labels: topProductsData.labels,
    datasets: [
      {
        label: 'Units Sold',
        data: topProductsData.data,
        backgroundColor: 'rgba(0, 106, 78, 0.7)',
        borderColor: 'rgba(0, 106, 78, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const cardData = [
    { title: 'Products', value: productCount, icon: 'bi-box-seam', color: 'primary', link: '/admin/products', desc: 'Total products' },
    { title: 'Revenue', value: `₹${totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: 'bi-currency-rupee', color: 'success', link: '/admin/reports', desc: 'From delivered orders' },
    { title: 'Pending Orders', value: pendingOrders, icon: 'bi-hourglass-split', color: 'warning', link: '/admin/orders', desc: 'Awaiting action' },
    { title: 'Users', value: userCount, icon: 'bi-people', color: 'info', link: '/admin/users', desc: 'Registered users' },
  ];

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <Link to="/admin/reports" className="d-none d-sm-inline-block btn btn-primary shadow-sm btn-admin-primary">
          <i className="bi bi-bar-chart-line me-2"></i>View Full Reports
        </Link>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
        {cardData.map(card => <StatCard key={card.title} {...card} />)}
      </div>

      <div className="row mt-5">
        <div className="col-12">
            <div className="card shadow-sm">
                <div className="card-header">
                    <h5 className="mb-0">Top Selling Products</h5>
                </div>
                <div className="card-body">
                    {topProductsData.data.length > 0 ? (
                        <Bar options={chartOptions} data={chartData} />
                    ) : (
                        <p className="text-center text-muted m-4">No sales data from delivered orders yet to generate a chart.</p>
                    )}
                </div>
                
            </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;