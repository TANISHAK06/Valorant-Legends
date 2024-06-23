document.addEventListener('DOMContentLoaded', function() {
    const agentDetails = document.getElementById('agentDetails');

    const urlParams = new URLSearchParams(window.location.search);
    const agentUUID = urlParams.get('id');

    fetch(`https://valorant-api.com/v1/agents/${agentUUID}`)
        .then(response => response.json())
        .then(data => {
            const agentName = document.createElement('h2');
            agentName.textContent = data.data.displayName;
            agentDetails.appendChild(agentName);

            
            const agentContainer = document.createElement('div');
            agentContainer.classList.add('agent-container');
            agentDetails.appendChild(agentContainer);

            const agentImage = document.createElement('img');
            agentImage.classList.add('agent-image');
            agentImage.src = data.data.fullPortrait;
            agentImage.alt = data.data.displayName + ' portrait';
            agentContainer.appendChild(agentImage);

            const abilitiesContainer = document.createElement('div');
            abilitiesContainer.classList.add('abilities-container');

        
            data.data.abilities.forEach(ability => {
                const abilityCard = document.createElement('div');
                abilityCard.classList.add('ability-card');

                const abilityIcon = document.createElement('img');
                abilityIcon.classList.add('ability-icon');
                abilityIcon.src = ability.displayIcon;
                abilityIcon.alt = ability.displayName + ' icon';
                abilityCard.appendChild(abilityIcon);

                const abilityName = document.createElement('h4');
                abilityName.textContent = ability.displayName;
                abilityCard.appendChild(abilityName);

                const abilityDescription = document.createElement('p');
                abilityDescription.textContent = ability.description;
                abilityCard.appendChild(abilityDescription);

                abilitiesContainer.appendChild(abilityCard);
            });

            agentContainer.appendChild(abilitiesContainer);

        })
        .catch(error => {
            console.error('Error fetching agent details:', error);
        });
});
