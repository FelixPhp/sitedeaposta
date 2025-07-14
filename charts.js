// Charts functionality using Chart.js
class ChartsComponent {
    constructor() {
        this.goalsChart = null;
        this.resultsChart = null;
        
        this.init();
    }

    init() {
        // Wait for Chart.js to be loaded
        if (typeof Chart === 'undefined') {
            setTimeout(() => this.init(), 100);
            return;
        }

        this.createGoalsChart();
        this.createResultsChart();
    }

    createGoalsChart() {
        const canvas = document.getElementById('goalsChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.goalsChart) {
            this.goalsChart.destroy();
        }

        const data = mockData.goalStats;
        
        this.goalsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.team),
                datasets: [{
                    label: 'Gols',
                    data: data.map(item => item.goals),
                    backgroundColor: '#3b82f6',
                    borderColor: '#2563eb',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#3b82f6',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return `Gols: ${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 12
                            },
                            maxRotation: 45,
                            minRotation: 0
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f3f4f6',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 12
                            },
                            stepSize: 10
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    createResultsChart() {
        const canvas = document.getElementById('resultsChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.resultsChart) {
            this.resultsChart.destroy();
        }

        const data = mockData.winPercentage;
        
        this.resultsChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(item => item.label),
                datasets: [{
                    data: data.map(item => item.value),
                    backgroundColor: data.map(item => item.color),
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    hoverBorderWidth: 3,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                size: 12
                            },
                            color: '#374151'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#3b82f6',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                return `${label}: ${value}%`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                interaction: {
                    intersect: false
                }
            },
            plugins: [{
                id: 'centerText',
                beforeDraw: function(chart) {
                    const { width, height, ctx } = chart;
                    ctx.restore();
                    
                    const fontSize = (height / 114).toFixed(2);
                    ctx.font = `${fontSize}em Inter, sans-serif`;
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#374151';
                    
                    const text = 'Resultados';
                    const textX = Math.round((width - ctx.measureText(text).width) / 2);
                    const textY = height / 2;
                    
                    ctx.fillText(text, textX, textY);
                    ctx.save();
                }
            }]
        });
    }

    // Method to update charts with new data
    updateGoalsChart(newData) {
        if (!this.goalsChart) return;

        this.goalsChart.data.labels = newData.map(item => item.team);
        this.goalsChart.data.datasets[0].data = newData.map(item => item.goals);
        this.goalsChart.update('active');
    }

    updateResultsChart(newData) {
        if (!this.resultsChart) return;

        this.resultsChart.data.labels = newData.map(item => item.label);
        this.resultsChart.data.datasets[0].data = newData.map(item => item.value);
        this.resultsChart.data.datasets[0].backgroundColor = newData.map(item => item.color);
        this.resultsChart.update('active');
    }

    // Method to resize charts (useful for responsive design)
    resizeCharts() {
        if (this.goalsChart) {
            this.goalsChart.resize();
        }
        if (this.resultsChart) {
            this.resultsChart.resize();
        }
    }

    // Method to destroy charts (cleanup)
    destroy() {
        if (this.goalsChart) {
            this.goalsChart.destroy();
            this.goalsChart = null;
        }
        if (this.resultsChart) {
            this.resultsChart.destroy();
            this.resultsChart = null;
        }
    }

    // Method to toggle chart animations
    toggleAnimations(enabled = true) {
        const options = {
            animation: {
                duration: enabled ? 1000 : 0
            }
        };

        if (this.goalsChart) {
            Object.assign(this.goalsChart.options, options);
        }
        if (this.resultsChart) {
            Object.assign(this.resultsChart.options, options);
        }
    }

    // Method to export chart as image
    exportChart(chartType, filename = 'chart.png') {
        const chart = chartType === 'goals' ? this.goalsChart : this.resultsChart;
        if (!chart) return;

        const url = chart.toBase64Image();
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
    }

    // Method to get chart data for external use
    getChartData(chartType) {
        const chart = chartType === 'goals' ? this.goalsChart : this.resultsChart;
        if (!chart) return null;

        return {
            labels: chart.data.labels,
            datasets: chart.data.datasets
        };
    }
}

// Handle window resize for chart responsiveness
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.chartsComponent) {
            window.chartsComponent.resizeCharts();
        }
    }, 250);
});

// Initialize charts component when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Add a small delay to ensure Chart.js is fully loaded
        setTimeout(() => {
            window.chartsComponent = new ChartsComponent();
        }, 100);
    });
} else {
    setTimeout(() => {
        window.chartsComponent = new ChartsComponent();
    }, 100);
}

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChartsComponent;
}

