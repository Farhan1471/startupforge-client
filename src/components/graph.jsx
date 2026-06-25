import React, { useEffect, useRef } from "react";
// Import from 'chart.js/auto' as described in the Chart.js Integration documentation
import Chart from "chart.js/auto";

const Graph = () => {
    const chartRef = useRef(null); // Ref to hold the canvas element
    const chartInstance = useRef(null); // Ref to keep track of the Chart instance

    useEffect(() => {
        // Ensure the canvas element exists
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");

            // Avoid duplicating charts on re-renders by destroying the old one first
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            // Create the new chart instance
            chartInstance.current = new Chart(ctx, {
                type: "bar", // Chart type from the guide
                data: {
                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [
                        {
                            label: "# of Votes",
                            data: [12, 19, 3, 5, 2, 3],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }

        // Cleanup function to destroy the chart instance when the component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div>
            <h1>Graph</h1>
            {/* Chart.js requires a container (like a div) to handle responsiveness properly */}
            <div style={{ width: "600px", height: "400px" }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default Graph;