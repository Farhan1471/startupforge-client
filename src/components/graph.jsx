import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { getOpportunity } from "../lib/api/opportunities";

const Graph = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        getOpportunity().then((data) => {
            const opportunities = Array.isArray(data) ? data : data?.opportunities ?? [];

            const workTypeCounts = {};
            opportunities.forEach((opp) => {
                const wt = opp.workType || "Unknown";
                workTypeCounts[wt] = (workTypeCounts[wt] || 0) + 1;
            });

            const labels = Object.keys(workTypeCounts);
            const counts = Object.values(workTypeCounts);

            if (chartRef.current) {
                const ctx = chartRef.current.getContext("2d");
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                chartInstance.current = new Chart(ctx, {
                    type: "bar", 
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: "# of Opportunities",
                                data: counts,
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
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div>
            <h1>Graph</h1>
            <div style={{ width: "600px", height: "400px" }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default Graph;