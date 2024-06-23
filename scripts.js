document.addEventListener('DOMContentLoaded', function() {
    const agentsContainer = document.getElementById('agentsContainer');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    const agentsToExclude = ['ded3520f-4264-bfed-162d-b080e2abccf9']; 

    fetch('https://valorant-api.com/v1/agents')
        .then(response => response.json())
        .then(data => {
            const filteredAgents = data.data.filter(agent => !agentsToExclude.includes(agent.uuid));

            filteredAgents.forEach(agent => {
                const agentCard = createAgentCard(agent);
                agentsContainer.appendChild(agentCard);
            });

            searchForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const searchTerm = searchInput.value.trim().toLowerCase();

                const foundAgent = filteredAgents.find(agent => {
                    return agent.displayName.toLowerCase() === searchTerm || agent.uuid === searchTerm;
                });

                if (foundAgent) {
                    window.location.href = `agent.html?id=${foundAgent.uuid}`;
                } else {
                    alert(`Agent "${searchTerm}" does not exist.`);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    function createAgentCard(agent) {
        const agentCard = document.createElement('div');
        agentCard.classList.add('agent-card');
        agentCard.style.backgroundImage = `url(${agent.background})`; 

        const agentImage = document.createElement('img');
        agentImage.src = agent.fullPortrait;
        agentImage.classList.add('agent-image'); 

        const agentName = document.createElement('h3');
        agentName.textContent = agent.displayName;

        agentCard.appendChild(agentImage);
        agentCard.appendChild(agentName);

        agentCard.addEventListener('click', function() {
            window.location.href = `agent.html?id=${agent.uuid}`;
        });

        return agentCard;
    }
});
