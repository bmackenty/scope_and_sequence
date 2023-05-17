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

// Define the categories and their colors
const categories = [
    { name: 'Skills', color: '#FF9999' },
    { name: 'Tools', color: '#9999FF' },
    { name: 'Knowledge', color: '#99FF99' }
];

// make a color legend:
const colorLegendContainer = document.getElementById('color-legend');

categories.forEach(category => {
    const legendItem = document.createElement('div');
    legendItem.textContent = category.name;
    legendItem.style.display = 'inline-block';
    legendItem.style.margin = '10px';
    legendItem.style.padding = '5px';
    legendItem.style.color = category.color;
    legendItem.style.border = '1px solid ' + category.color;
    
    colorLegendContainer.appendChild(legendItem);
});

const scopeSequenceData = [
    {
      label: 'Year 1',
      skills: ['Diagramming', 'Iteration', 'Conditionals'],
      tools: ['VS Code - basics', 'Terminal', 'Git'],
      knowledge: ['Prog Basics', 'Development', 'Testing', 'Ask for Help']
    },
    {
      label: 'Year 3',
      skills: ['Skill 4', 'Skill 5', 'Skill 6'],
      tools: ['Tool 4', 'Tool 5', 'Tool 6'],
      knowledge: ['Knowledge 4', 'Knowledge 5', 'Knowledge 6']
    },
    {
      label: 'Year 5',
      skills: ['Skill 4', 'Skill 5', 'Skill 6', 'Skill 7'],
      tools: ['Tool 4', 'Tool 5', 'Tool 6'],
      knowledge: ['Knowledge 4', 'Knowledge 5', 'Knowledge 6']
    },
    // Add more years as needed
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('scope-sequence-chart').getContext('2d');
  
    const allSkills = Array.from(new Set(scopeSequenceData.flatMap(year => year.skills)));
    const allTools = Array.from(new Set(scopeSequenceData.flatMap(year => year.tools)));
    const allKnowledge = Array.from(new Set(scopeSequenceData.flatMap(year => year.knowledge)));
  
    const generateDataForCategory = (categoryItems, dataKey, labelKey, heightMultiplier, baseColor) => (
        categoryItems.map((item, index) => ({
            label: item,
            backgroundColor: shadeColor(baseColor, index * 10),
            data: scopeSequenceData.map((year, index) => year[dataKey].includes(item) ? (index + 1) * heightMultiplier : 0),
            stack: dataKey
        }))
    );
  
    Chart.register(ChartDataLabels); // Register the plugin
  
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: scopeSequenceData.map(year => year.label),
            datasets: [
                ...generateDataForCategory(allSkills, 'skills', 'label', 1, '#FF9999'), // Light red shades for skills
                ...generateDataForCategory(allTools, 'tools', 'label', 1, '#9999FF'), // Light blue shades for tools
                ...generateDataForCategory(allKnowledge, 'knowledge', 'label', 1, '#99FF99') // Light green shades for knowledge
            ]
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
            formatter: function(value, context) {
                return value !== 0 ? context.dataset.label : '';
            }
        }
        }
      }
    });
  });
  
