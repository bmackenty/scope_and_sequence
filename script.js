const scopeSequenceData = [
    {
        label: 'Year 1',
        skills: ['Diagramming', 'Iteration', 'Conditionals'],
        tools: ['Tool 1', 'Tool 2', 'Tool 3'],
        knowledge: ['Knowledge 1', 'Knowledge 2', 'Knowledge 3']
    },
    {
        label: 'Year 3',
        skills: ['Year 1+', 'Skill 5', 'Skill 6'],
        tools: ['Year 1+', 'Tool 5', 'Tool 6'],
        knowledge: ['Year 1+', 'Knowledge 5', 'Knowledge 6']
    },
    {
        label: 'Year 5',
        skills: ['Year 3+', 'Skill 5', 'Skill 6', 'Skill 7'],
        tools: ['Year 3+', 'Tool 5', 'Tool 6'],
        knowledge: ['Year 3+', 'Knowledge 5', 'Knowledge 6']
    },
    // Add more years as needed
];

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('scope-sequence-chart').getContext('2d');

    function shadeColor(color, percent) {
        var R = parseInt(color.substring(1, 3), 16);
        var G = parseInt(color.substring(3, 5), 16);
        var B = parseInt(color.substring(5, 7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
        var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
        var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

        return "#" + RR + GG + BB;
    }

    const baseColors = {
        skills: '#FF9999',
        tools: '#9999FF',
        knowledge: '#99FF99'
    };

    let datasets = [];

    scopeSequenceData.forEach((year, yearIndex) => {
        Object.keys(year).forEach((key, categoryIndex) => {
            if (key !== 'label') {
                year[key].forEach((item, itemIndex) => {
                    datasets.push({
                        label: item,
                        backgroundColor: shadeColor(baseColors[key], itemIndex * 15),
                        data: Array(yearIndex).fill(0).concat([yearIndex + 1], Array(scopeSequenceData.length - yearIndex - 1).fill(0)),
                        stack: key
                    });
                });
            }
        });
    });

    Chart.register(ChartDataLabels); // Register the plugin

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: scopeSequenceData.map(year => year.label),
            datasets: datasets
        },
        options: {
            scales: {
                x: { stacked: true },
                y: { stacked: true }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                },
                datalabels: {
                    anchor: 'center',
                    align: 'center',
                    color: '#000',
                    font: {
                        weight: 'bold'
                    },
                    formatter: (value, context) => {
                        return value !== 0 ? context.dataset.label : null;
                    }
                }
            }
        }
    });
});
