import React from 'react'; // ✅ FIX: Corrected the import statement

function OrderTracker({ status }) {
    const statuses = ['Pending', 'Shipped', 'Delivered'];
    // Provide a default value for status to prevent errors
    const currentStatusIndex = statuses.indexOf(status || 'Pending');

    return (
        <div className="my-4">
            <div className="d-flex justify-content-between align-items-center position-relative">
                <div className="progress w-100 position-absolute" style={{ height: '4px', top: '8px' }}>
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
                        aria-valuenow={currentStatusIndex}
                        aria-valuemin="0"
                        aria-valuemax={statuses.length - 1}
                    ></div>
                </div>
                {statuses.map((s, index) => (
                    // ✅ FIX: Corrected the CSS class from "align align-items-center"
                    <div key={s} className="d-flex flex-column align-items-center position-relative">
                        <div
                            className={`rounded-circle d-flex align-items-center justify-content-center ${index <= currentStatusIndex ? 'bg-success' : 'bg-light border'}`}
                            style={{ width: '20px', height: '20px', zIndex: 1 }}
                        >
                            {index <= currentStatusIndex && <i className="bi bi-check-lg text-white" style={{ fontSize: '12px' }}></i>}
                        </div>
                        <small className="mt-2" style={{ fontWeight: index <= currentStatusIndex ? '600' : 'normal' }}>{s}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderTracker;