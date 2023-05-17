const scopeSequenceData = [
    {
      label: 'Year 1',
      skills: ['Diagramming', 'Iteration', 'Conditionals'],
      tools: ['Tool 1', 'Tool 2', 'Tool 3'],
      knowledge: ['Knowledge 1', 'Knowledge 2', 'Knowledge 3']
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
  
    const generateDataForCategory = (categoryItems, dataKey, labelKey, heightMultiplier) => (
      categoryItems.map(item => ({
        label: item,
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
          ...generateDataForCategory(allSkills, 'skills', 'label', 1),
          ...generateDataForCategory(allTools, 'tools', 'label', 1),
          ...generateDataForCategory(allKnowledge, 'knowledge', 'label', 1)
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
  
