/**
 * ChartManager.js - Enhanced Chart Creation and Management
 * Handles all chart creation with Chart.js, D3.js, and ApexCharts
 * Now with platform-aware data and smooth transitions
 */

class ChartManager {
    constructor() {
        this.charts = new Map();
        this.defaultColors = [
            '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b',
            '#ef4444', '#ec4899', '#14b8a6', '#f97316'
        ];
        this.platformColors = {
            twitter: '#000000',  // X (formerly Twitter) - black
            reddit: '#FF4500',
            youtube: '#FF0000',
            linkedin: '#0077B5',
            facebook: '#1877F2',
            instagram: '#E4405F',
            news: '#4B5563',
            reviews: '#F59E0B',
            all: '#8b5cf6'
        };
        this.animationDuration = 750;
    }

    /**
     * Create sentiment trend chart (Line chart) - Platform aware with enhanced visuals
     */
    createSentimentTrend(canvasId, platformOrDays = 'all', days = 7) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        // Handle both old signature (platform) and new signature (days as number)
        let platform = 'all';
        let numDays = 7;
        if (typeof platformOrDays === 'number') {
            numDays = platformOrDays;
        } else {
            platform = platformOrDays;
            numDays = days;
        }

        // Get platform-specific data from MockData
        const chartData = typeof MockData !== 'undefined'
            ? MockData.getSentimentChartData(platform, numDays)
            : this.getDefaultSentimentData(numDays);

        // Create beautiful gradients for each sentiment
        const canvas = ctx.getContext('2d');

        // Positive gradient (green)
        const positiveGradient = canvas.createLinearGradient(0, 0, 0, 300);
        positiveGradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
        positiveGradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.15)');
        positiveGradient.addColorStop(1, 'rgba(16, 185, 129, 0.02)');

        // Neutral gradient (yellow/amber)
        const neutralGradient = canvas.createLinearGradient(0, 0, 0, 300);
        neutralGradient.addColorStop(0, 'rgba(245, 158, 11, 0.3)');
        neutralGradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.1)');
        neutralGradient.addColorStop(1, 'rgba(245, 158, 11, 0.02)');

        // Negative gradient (red)
        const negativeGradient = canvas.createLinearGradient(0, 0, 0, 300);
        negativeGradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
        negativeGradient.addColorStop(0.5, 'rgba(239, 68, 68, 0.1)');
        negativeGradient.addColorStop(1, 'rgba(239, 68, 68, 0.02)');

        // Enhanced dataset styling
        if (chartData.datasets[0]) {
            chartData.datasets[0].backgroundColor = positiveGradient;
            chartData.datasets[0].borderColor = '#10b981';
            chartData.datasets[0].borderWidth = 3;
            chartData.datasets[0].pointBackgroundColor = '#ffffff';
            chartData.datasets[0].pointBorderColor = '#10b981';
            chartData.datasets[0].pointBorderWidth = 3;
            chartData.datasets[0].pointRadius = 5;
            chartData.datasets[0].pointHoverRadius = 8;
            chartData.datasets[0].pointHoverBackgroundColor = '#10b981';
            chartData.datasets[0].pointHoverBorderColor = '#ffffff';
            chartData.datasets[0].pointHoverBorderWidth = 3;
            chartData.datasets[0].tension = 0.4;
            chartData.datasets[0].fill = true;
        }
        if (chartData.datasets[1]) {
            chartData.datasets[1].backgroundColor = neutralGradient;
            chartData.datasets[1].borderColor = '#f59e0b';
            chartData.datasets[1].borderWidth = 3;
            chartData.datasets[1].pointBackgroundColor = '#ffffff';
            chartData.datasets[1].pointBorderColor = '#f59e0b';
            chartData.datasets[1].pointBorderWidth = 3;
            chartData.datasets[1].pointRadius = 5;
            chartData.datasets[1].pointHoverRadius = 8;
            chartData.datasets[1].pointHoverBackgroundColor = '#f59e0b';
            chartData.datasets[1].pointHoverBorderColor = '#ffffff';
            chartData.datasets[1].pointHoverBorderWidth = 3;
            chartData.datasets[1].tension = 0.4;
            chartData.datasets[1].fill = true;
        }
        if (chartData.datasets[2]) {
            chartData.datasets[2].backgroundColor = negativeGradient;
            chartData.datasets[2].borderColor = '#ef4444';
            chartData.datasets[2].borderWidth = 3;
            chartData.datasets[2].pointBackgroundColor = '#ffffff';
            chartData.datasets[2].pointBorderColor = '#ef4444';
            chartData.datasets[2].pointBorderWidth = 3;
            chartData.datasets[2].pointRadius = 5;
            chartData.datasets[2].pointHoverRadius = 8;
            chartData.datasets[2].pointHoverBackgroundColor = '#ef4444';
            chartData.datasets[2].pointHoverBorderColor = '#ffffff';
            chartData.datasets[2].pointHoverBorderWidth = 3;
            chartData.datasets[2].tension = 0.4;
            chartData.datasets[2].fill = true;
        }

        const chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1200,
                    easing: 'easeOutQuart',
                    delay: (context) => {
                        return context.dataIndex * 50 + context.datasetIndex * 100;
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'center',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 25,
                            font: {
                                size: 13,
                                weight: '600',
                                family: "'Inter', sans-serif"
                            },
                            color: '#374151',
                            boxWidth: 12,
                            boxHeight: 12
                        }
                    },
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        titleColor: '#111827',
                        titleFont: {
                            size: 14,
                            weight: '700',
                            family: "'Inter', sans-serif"
                        },
                        bodyColor: '#4b5563',
                        bodyFont: {
                            size: 13,
                            weight: '500',
                            family: "'Inter', sans-serif"
                        },
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        borderWidth: 1,
                        padding: 16,
                        boxPadding: 8,
                        usePointStyle: true,
                        cornerRadius: 12,
                        displayColors: true,
                        caretSize: 8,
                        caretPadding: 12,
                        callbacks: {
                            title: (tooltipItems) => {
                                return `🗓 ${tooltipItems[0].label}`;
                            },
                            label: (context) => {
                                const smiley = context.datasetIndex === 0 ? '🙂' :
                                              context.datasetIndex === 1 ? '😐' : '🙁';
                                return `${smiley} ${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
                            },
                            afterBody: (tooltipItems) => {
                                const total = tooltipItems.reduce((sum, item) => sum + item.parsed.y, 0);
                                return [`\n📈 Total: ${total.toFixed(1)}%`];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: (value) => value + '%',
                            font: {
                                size: 12,
                                weight: '500',
                                family: "'Inter', sans-serif"
                            },
                            color: '#6b7280',
                            padding: 10,
                            stepSize: 20
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.06)',
                            drawBorder: false,
                            lineWidth: 1,
                            tickLength: 0
                        },
                        border: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            font: {
                                size: 12,
                                weight: '500',
                                family: "'Inter', sans-serif"
                            },
                            color: '#6b7280',
                            padding: 10
                        },
                        border: {
                            display: false
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                elements: {
                    line: {
                        capBezierPoints: true
                    },
                    point: {
                        hitRadius: 10,
                        hoverRadius: 8
                    }
                },
                layout: {
                    padding: {
                        top: 10,
                        right: 20,
                        bottom: 10,
                        left: 10
                    }
                }
            }
        });

        this.charts.set(canvasId, chart);
        return chart;
    }

    /**
     * Update sentiment chart for specific platform
     */
    updateSentimentChart(canvasId, platform = 'all') {
        const chart = this.charts.get(canvasId);
        if (!chart || typeof MockData === 'undefined') return;

        const newData = MockData.getSentimentChartData(platform, 7);

        chart.data.labels = newData.labels;
        chart.data.datasets.forEach((dataset, index) => {
            if (newData.datasets[index]) {
                dataset.data = newData.datasets[index].data;
            }
        });

        chart.update('active');
    }

    /**
     * Create platform distribution chart (Doughnut chart) - Platform aware
     */
    createPlatformDistribution(canvasId, selectedPlatform = 'all') {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const chartData = typeof MockData !== 'undefined'
            ? MockData.getPlatformDistribution()
            : this.getDefaultPlatformData();

        // If specific platform selected, highlight it
        if (selectedPlatform !== 'all') {
            const platformIndex = chartData.labels.findIndex(
                label => label.toLowerCase() === selectedPlatform.toLowerCase()
            );
            if (platformIndex !== -1) {
                chartData.datasets[0].backgroundColor = chartData.datasets[0].backgroundColor.map(
                    (color, i) => i === platformIndex ? color : this.hexToRgba(color, 0.3)
                );
            }
        }

        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: this.animationDuration,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 12,
                            font: { size: 12 },
                            generateLabels: (chart) => {
                                const data = chart.data;
                                return data.labels.map((label, i) => ({
                                    text: label,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    strokeStyle: data.datasets[0].backgroundColor[i],
                                    pointStyle: 'circle',
                                    hidden: false,
                                    index: i
                                }));
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                            label: (context) => {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${Utils.formatNumber(context.parsed)} (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '65%'
            }
        });

        this.charts.set(canvasId, chart);
        return chart;
    }

    /**
     * Update platform distribution chart
     */
    updatePlatformDistribution(canvasId, selectedPlatform = 'all') {
        const chart = this.charts.get(canvasId);
        if (!chart || typeof MockData === 'undefined') return;

        const newData = MockData.getPlatformDistribution();

        // Highlight selected platform
        if (selectedPlatform !== 'all') {
            const platformIndex = newData.labels.findIndex(
                label => label.toLowerCase().replace(' ', '') === selectedPlatform.toLowerCase()
            );
            newData.datasets[0].backgroundColor = newData.datasets[0].backgroundColor.map(
                (color, i) => i === platformIndex ? color : this.hexToRgba(color, 0.3)
            );
        }

        chart.data = newData;
        chart.update('active');
    }

    /**
     * Create mentions volume chart (Area chart) - Platform aware
     */
    createMentionVolume(canvasId, platform = 'all') {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const chartData = typeof MockData !== 'undefined'
            ? MockData.getMentionsChartData(platform, 24)
            : this.getDefaultMentionsData();

        const chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: this.animationDuration,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                            label: (context) => {
                                return `Mentions: ${Utils.formatNumber(context.parsed.y)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => Utils.formatNumber(value),
                            font: { size: 11 }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxTicksLimit: 12,
                            font: { size: 11 }
                        }
                    }
                }
            }
        });

        this.charts.set(canvasId, chart);
        return chart;
    }

    /**
     * Update mentions volume chart for specific platform
     */
    updateMentionVolume(canvasId, platform = 'all') {
        const chart = this.charts.get(canvasId);
        if (!chart || typeof MockData === 'undefined') return;

        const newData = MockData.getMentionsChartData(platform, 24);
        const platformColor = this.platformColors[platform] || this.platformColors.all;

        chart.data.labels = newData.labels;
        chart.data.datasets[0].data = newData.datasets[0].data;
        chart.data.datasets[0].borderColor = platformColor;
        chart.data.datasets[0].backgroundColor = this.hexToRgba(platformColor, 0.1);

        chart.update('active');
    }

    /**
     * Create emotion distribution chart (Polar/Radar chart) - Platform aware with enhanced interactivity
     */
    createEmotionChart(canvasId, platform = 'all') {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const emotions = typeof MockData !== 'undefined'
            ? MockData.getEmotionData(platform)
            : this.getDefaultEmotionData();

        // Store emotions data for interactive legend
        this.emotionsData = emotions;

        const chartData = {
            labels: emotions.map(e => e.emotion),
            datasets: [{
                label: 'Emotion Distribution',
                data: emotions.map(e => e.value),
                backgroundColor: emotions.map(e => this.hexToRgba(e.color, 0.5)),
                borderColor: emotions.map(e => e.color),
                borderWidth: 3,
                pointBackgroundColor: emotions.map(e => e.color),
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 10,
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: emotions.map(e => e.color),
                pointHoverBorderWidth: 3
            }]
        };

        const self = this;

        const chart = new Chart(ctx, {
            type: 'radar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: this.animationDuration,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        titleColor: '#1f2937',
                        titleFont: { size: 14, weight: '600' },
                        bodyColor: '#4b5563',
                        bodyFont: { size: 13 },
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 16,
                        cornerRadius: 12,
                        displayColors: true,
                        boxWidth: 12,
                        boxHeight: 12,
                        boxPadding: 6,
                        callbacks: {
                            title: (context) => {
                                const emotion = context[0].label;
                                // Use text only for tooltip title (canvas cannot render HTML)
                                return emotion;
                            },
                            label: (context) => {
                                const value = context.parsed.r;
                                const bar = self.createProgressBar(value, 50);
                                return [`Score: ${value}%`, bar];
                            },
                            afterLabel: (context) => {
                                const emotion = context.label;
                                return self.getEmotionDescription(emotion);
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 50,
                        ticks: {
                            stepSize: 10,
                            font: { size: 10 },
                            backdropColor: 'transparent',
                            color: '#9ca3af'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.06)',
                            circular: true
                        },
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.06)'
                        },
                        pointLabels: {
                            font: { size: 12, weight: '600' },
                            color: '#374151',
                            callback: (label) => {
                                // Canvas cannot render HTML, so just show label text
                                return label;
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'point',
                    intersect: true
                },
                onHover: (event, elements) => {
                    const canvas = event.native.target;
                    canvas.style.cursor = elements.length > 0 ? 'pointer' : 'default';

                    // Highlight effect on hover
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        self.highlightEmotion(canvasId, index);
                    } else {
                        self.resetEmotionHighlight(canvasId);
                    }
                },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const emotion = emotions[index];
                        self.showEmotionDetail(emotion);
                    }
                }
            }
        });

        this.charts.set(canvasId, chart);

        // Create interactive legend
        this.createEmotionLegend(canvasId, emotions);

        return chart;
    }

    /**
     * Get 2D icon class for emotion
     */
    getEmotionEmoji(emotion) {
        // Return icon HTML span instead of emoji for 2D flat icons
        const iconClasses = {
            'Joy': 'icon-emotion-joy',
            'Trust': 'icon-emotion-trust',
            'Anticipation': 'icon-emotion-anticipation',
            'Surprise': 'icon-emotion-surprise',
            'Sadness': 'icon-emotion-sadness',
            'Fear': 'icon-emotion-fear',
            'Anger': 'icon-emotion-anger',
            'Disgust': 'icon-emotion-disgust'
        };
        return iconClasses[emotion] || 'icon-analytics';
    }

    /**
     * Get icon HTML for emotion (for rendering in HTML)
     */
    getEmotionIconHTML(emotion) {
        const iconClass = this.getEmotionEmoji(emotion);
        return `<span class="flat-icon ${iconClass}"></span>`;
    }

    /**
     * Get description for emotion
     */
    getEmotionDescription(emotion) {
        const descriptions = {
            'Joy': 'Positive sentiment, happiness',
            'Trust': 'Confidence, reliability',
            'Anticipation': 'Excitement, expectation',
            'Surprise': 'Unexpected reactions',
            'Sadness': 'Disappointment, sorrow',
            'Fear': 'Concern, anxiety',
            'Anger': 'Frustration, displeasure',
            'Disgust': 'Strong disapproval'
        };
        return descriptions[emotion] || '';
    }

    /**
     * Create text-based progress bar for tooltip
     */
    createProgressBar(value, max) {
        const filled = Math.round((value / max) * 10);
        const empty = 10 - filled;
        return '█'.repeat(filled) + '░'.repeat(empty);
    }

    /**
     * Highlight specific emotion on chart
     */
    highlightEmotion(canvasId, index) {
        const chart = this.charts.get(canvasId);
        if (!chart) return;

        const emotions = this.emotionsData;
        chart.data.datasets[0].backgroundColor = emotions.map((e, i) =>
            i === index ? this.hexToRgba(e.color, 0.8) : this.hexToRgba(e.color, 0.2)
        );
        chart.data.datasets[0].borderWidth = emotions.map((e, i) => i === index ? 4 : 2);
        chart.data.datasets[0].pointRadius = emotions.map((e, i) => i === index ? 10 : 5);
        chart.update('none');
    }

    /**
     * Reset emotion highlight
     */
    resetEmotionHighlight(canvasId) {
        const chart = this.charts.get(canvasId);
        if (!chart) return;

        const emotions = this.emotionsData;
        chart.data.datasets[0].backgroundColor = emotions.map(e => this.hexToRgba(e.color, 0.5));
        chart.data.datasets[0].borderWidth = 3;
        chart.data.datasets[0].pointRadius = 6;
        chart.update('none');
    }

    /**
     * Show emotion detail popup/highlight
     */
    showEmotionDetail(emotion) {
        // Create or update emotion detail display
        let detailEl = document.getElementById('emotionDetail');
        if (!detailEl) {
            detailEl = document.createElement('div');
            detailEl.id = 'emotionDetail';
            detailEl.className = 'emotion-detail-popup';
            document.body.appendChild(detailEl);
        }

        const iconClass = this.getEmotionEmoji(emotion.emotion);
        const description = this.getEmotionDescription(emotion.emotion);

        detailEl.innerHTML = `
            <div class="emotion-detail-content">
                <div class="emotion-detail-header">
                    <span class="emotion-icon flat-icon lg ${iconClass}"></span>
                    <span class="emotion-name">${emotion.emotion}</span>
                    <button class="emotion-detail-close" onclick="this.parentElement.parentElement.parentElement.classList.remove('visible')">×</button>
                </div>
                <div class="emotion-detail-value" style="color: ${emotion.color}">
                    ${emotion.value}%
                </div>
                <div class="emotion-detail-bar">
                    <div class="emotion-bar-fill" style="width: ${emotion.value * 2}%; background: ${emotion.color}"></div>
                </div>
                <div class="emotion-detail-desc">${description}</div>
            </div>
        `;

        detailEl.classList.add('visible');

        // Auto-hide after 3 seconds
        setTimeout(() => {
            detailEl.classList.remove('visible');
        }, 3000);
    }

    /**
     * Create interactive emotion legend
     */
    createEmotionLegend(canvasId, emotions) {
        const chartCard = document.getElementById(canvasId)?.closest('.chart-card');
        if (!chartCard) return;

        // Remove existing legend
        const existingLegend = chartCard.querySelector('.emotion-legend');
        if (existingLegend) existingLegend.remove();

        const legend = document.createElement('div');
        legend.className = 'emotion-legend';
        legend.innerHTML = emotions.map((e, i) => `
            <div class="emotion-legend-item" data-index="${i}" data-emotion="${e.emotion}">
                <span class="emotion-legend-dot" style="background: ${e.color}"></span>
                <span class="emotion-legend-icon flat-icon ${this.getEmotionEmoji(e.emotion)}"></span>
                <span class="emotion-legend-label">${e.emotion}</span>
                <span class="emotion-legend-value">${e.value}%</span>
            </div>
        `).join('');

        chartCard.appendChild(legend);

        // Add interactivity to legend items
        const self = this;
        legend.querySelectorAll('.emotion-legend-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                const index = parseInt(item.dataset.index);
                self.highlightEmotion(canvasId, index);
            });
            item.addEventListener('mouseleave', () => {
                self.resetEmotionHighlight(canvasId);
            });
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                self.showEmotionDetail(emotions[index]);
            });
        });
    }

    /**
     * Update emotion chart for specific platform
     */
    updateEmotionChart(canvasId, platform = 'all') {
        const chart = this.charts.get(canvasId);
        if (!chart || typeof MockData === 'undefined') return;

        const emotions = MockData.getEmotionData(platform);

        chart.data.datasets[0].data = emotions.map(e => e.value);
        chart.update('active');
    }

    /**
     * Create engagement chart (Stacked Bar chart) - Platform aware
     */
    createEngagementChart(canvasId, platform = 'all', days = 7) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const dailyData = typeof MockData !== 'undefined'
            ? MockData.generateDailyData(days, platform)
            : this.getDefaultEngagementData(days);

        const platformColor = this.platformColors[platform] || this.platformColors.all;

        const chartData = {
            labels: dailyData.map(d => d.date),
            datasets: [{
                label: 'Likes',
                data: dailyData.map(d => Math.round(d.engagement * 0.6)),
                backgroundColor: platformColor,
                stack: 'Stack 0'
            }, {
                label: 'Comments',
                data: dailyData.map(d => Math.round(d.engagement * 0.25)),
                backgroundColor: this.adjustColor(platformColor, -20),
                stack: 'Stack 0'
            }, {
                label: 'Shares',
                data: dailyData.map(d => Math.round(d.engagement * 0.15)),
                backgroundColor: this.adjustColor(platformColor, -40),
                stack: 'Stack 0'
            }]
        };

        const chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: this.animationDuration,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: { size: 11 }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 12
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => Utils.formatNumber(value),
                            font: { size: 11 }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        }
                    }
                }
            }
        });

        this.charts.set(canvasId, chart);
        return chart;
    }

    /**
     * Update engagement chart for specific platform
     */
    updateEngagementChart(canvasId, platform = 'all') {
        const chart = this.charts.get(canvasId);
        if (!chart || typeof MockData === 'undefined') return;

        const dailyData = MockData.generateDailyData(7, platform);
        const platformColor = this.platformColors[platform] || this.platformColors.all;

        chart.data.labels = dailyData.map(d => d.date);
        chart.data.datasets[0].data = dailyData.map(d => Math.round(d.engagement * 0.6));
        chart.data.datasets[0].backgroundColor = platformColor;
        chart.data.datasets[1].data = dailyData.map(d => Math.round(d.engagement * 0.25));
        chart.data.datasets[1].backgroundColor = this.adjustColor(platformColor, -20);
        chart.data.datasets[2].data = dailyData.map(d => Math.round(d.engagement * 0.15));
        chart.data.datasets[2].backgroundColor = this.adjustColor(platformColor, -40);

        chart.update('active');
    }

    /**
     * Create top topics chart (Horizontal bar)
     */
    createTopTopics(canvasId, platform = 'all') {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        let topics = typeof MockData !== 'undefined'
            ? MockData.trendingTopics
            : this.getDefaultTopicsData();

        // Filter by platform if specific platform selected
        if (platform !== 'all') {
            topics = topics.filter(t => t.platforms && t.platforms.includes(platform));
        }
        topics = topics.slice(0, 5);

        const chartData = {
            labels: topics.map(t => t.name),
            datasets: [{
                label: 'Mentions',
                data: topics.map(t => t.mentions),
                backgroundColor: topics.map((t, i) => this.defaultColors[i % this.defaultColors.length]),
                borderRadius: 4
            }]
        };

        const chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: this.animationDuration,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                            label: (context) => `Mentions: ${Utils.formatNumber(context.parsed.x)}`
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            callback: (value) => Utils.formatNumber(value),
                            font: { size: 11 }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: { size: 11 }
                        }
                    }
                }
            }
        });

        this.charts.set(canvasId, chart);
        return chart;
    }

    /**
     * Create sentiment gauge (ApexCharts radial)
     */
    createSentimentGauge(containerId, value = 75, platform = 'all') {
        const container = document.getElementById(containerId);
        if (!container) return null;

        const platformColor = this.platformColors[platform] || this.platformColors.all;
        const sentimentColor = this.getSentimentColor(value);

        const options = {
            series: [value],
            chart: {
                type: 'radialBar',
                height: 280,
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: this.animationDuration
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    hollow: {
                        size: '65%',
                        background: 'transparent'
                    },
                    track: {
                        background: '#f1f5f9',
                        strokeWidth: '100%',
                        margin: 0
                    },
                    dataLabels: {
                        name: {
                            show: true,
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#64748b',
                            offsetY: -10
                        },
                        value: {
                            fontSize: '36px',
                            fontWeight: '700',
                            color: sentimentColor,
                            offsetY: 5,
                            formatter: (val) => val + '%'
                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: [sentimentColor],
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100]
                }
            },
            stroke: {
                lineCap: 'round'
            },
            labels: ['Sentiment Score']
        };

        const chart = new ApexCharts(container, options);
        chart.render();

        this.charts.set(containerId, chart);
        return chart;
    }

    /**
     * Update sentiment gauge
     */
    updateSentimentGauge(containerId, value, platform = 'all') {
        const chart = this.charts.get(containerId);
        if (!chart) return;

        chart.updateSeries([value]);
    }

    /**
     * Create sparkline chart for stat cards
     */
    createSparkline(canvasId, data = null, color = '#6366f1') {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const sparklineData = data || this.generateSparklineData();

        // Use semi-transparent fill for white sparklines on vibrant backgrounds
        const fillOpacity = color === '#ffffff' ? 0.2 : 0.1;

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sparklineData.map((_, i) => i),
                datasets: [{
                    data: sparklineData,
                    borderColor: color,
                    backgroundColor: this.hexToRgba(color, fillOpacity),
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: this.animationDuration
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        });

        this.charts.set(canvasId, chart);
        return chart;
    }

    /**
     * Update all charts for a specific platform
     */
    updateAllChartsForPlatform(platform = 'all') {
        // Update each chart type
        this.updateSentimentChart('sentimentChart', platform);
        this.updatePlatformDistribution('platformChart', platform);
        this.updateMentionVolume('mentionsChart', platform);
        this.updateEmotionChart('emotionChart', platform);
        this.updateEngagementChart('engagementChart', platform);
    }

    /**
     * Destroy chart
     */
    destroyChart(chartId) {
        const chart = this.charts.get(chartId);
        if (!chart) return;

        if (chart.destroy) {
            chart.destroy();
        }
        this.charts.delete(chartId);
    }

    /**
     * Destroy all charts
     */
    destroyAll() {
        this.charts.forEach((chart, id) => {
            this.destroyChart(id);
        });
    }

    // ============ Helper Methods ============

    getLast7Days() {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
        return days;
    }

    getLast24Hours() {
        const hours = [];
        for (let i = 23; i >= 0; i--) {
            const date = new Date();
            date.setHours(date.getHours() - i);
            hours.push(date.getHours() + ':00');
        }
        return hours;
    }

    generateSparklineData(length = 10, base = 50, variance = 20) {
        const data = [];
        let value = base;
        for (let i = 0; i < length; i++) {
            value = value + (Math.random() - 0.5) * variance;
            value = Math.max(10, Math.min(100, value));
            data.push(Math.round(value));
        }
        return data;
    }

    hexToRgba(hex, alpha = 1) {
        if (!hex) return `rgba(139, 92, 246, ${alpha})`;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    adjustColor(color, percent) {
        if (!color) return '#6366f1';
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, Math.max(0, (num >> 16) + amt));
        const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
        const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }

    getSentimentColor(sentiment) {
        if (sentiment >= 70) return '#10b981';
        if (sentiment >= 50) return '#f59e0b';
        return '#ef4444';
    }

    exportAsImage(chartId) {
        const chart = this.charts.get(chartId);
        if (!chart) return null;

        if (chart.canvas) {
            return chart.toBase64Image();
        } else {
            return chart.dataURI().then(({ imgURI }) => imgURI);
        }
    }

    // ============ Default Data Generators ============

    getDefaultSentimentData(days = 7) {
        const labels = this.getLastNDays(days);

        // Generate random but realistic sentiment data
        const generateSentimentData = (base, variance, trend) => {
            const data = [];
            let current = base;
            for (let i = 0; i < days; i++) {
                current = current + (Math.random() * variance * 2 - variance) + trend;
                current = Math.max(5, Math.min(95, current)); // Keep within bounds
                data.push(Math.round(current));
            }
            return data;
        };

        return {
            labels: labels,
            datasets: [{
                label: 'Positive',
                data: generateSentimentData(65, 5, 0.3),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Neutral',
                data: generateSentimentData(25, 3, -0.2),
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Negative',
                data: generateSentimentData(10, 2, -0.1),
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true
            }]
        };
    }

    getDefaultPlatformData() {
        return {
            labels: ['Twitter', 'Reddit', 'YouTube', 'LinkedIn', 'Facebook'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: ['#1da1f2', '#ff4500', '#ff0000', '#0077b5', '#1877f2'],
                borderWidth: 0
            }]
        };
    }

    getDefaultMentionsData() {
        return {
            labels: this.getLast24Hours(),
            datasets: [{
                label: 'Mentions',
                data: Array.from({ length: 24 }, () => Math.floor(50 + Math.random() * 150)),
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 5
            }]
        };
    }

    getDefaultEmotionData() {
        return [
            { emotion: 'Joy', value: 35, color: '#10b981' },
            { emotion: 'Trust', value: 25, color: '#3b82f6' },
            { emotion: 'Anticipation', value: 15, color: '#8b5cf6' },
            { emotion: 'Surprise', value: 10, color: '#f59e0b' },
            { emotion: 'Sadness', value: 5, color: '#6b7280' },
            { emotion: 'Fear', value: 5, color: '#ef4444' },
            { emotion: 'Anger', value: 3, color: '#dc2626' },
            { emotion: 'Disgust', value: 2, color: '#78716c' }
        ];
    }

    getDefaultEngagementData(days = 7) {
        return this.getLastNDays(days).map(date => ({
            date,
            engagement: 1000 + Math.floor(Math.random() * 3000)
        }));
    }

    getLastNDays(n = 7) {
        const dates = [];
        const today = new Date();
        for (let i = n - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
        return dates;
    }

    getDefaultTopicsData() {
        return [
            { name: 'Product Launch', mentions: 850, platforms: ['twitter', 'instagram'] },
            { name: 'Customer Service', mentions: 720, platforms: ['twitter', 'facebook'] },
            { name: 'Pricing', mentions: 650, platforms: ['reddit', 'reviews'] },
            { name: 'Features', mentions: 580, platforms: ['youtube', 'reddit'] },
            { name: 'Support', mentions: 420, platforms: ['twitter', 'reviews'] }
        ];
    }
}

// Create global instance
const Charts = new ChartManager();

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.Charts = Charts;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChartManager;
}

console.log('📈 Enhanced Chart Manager Loaded');
