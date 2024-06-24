document.addEventListener("DOMContentLoaded", function () {
  const agentsContainer = document.getElementById("agentsContainer");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const agentsToExclude = ["ded3520f-4264-bfed-162d-b080e2abccf9"];

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();

    const foundAgent = filteredAgents.find((agent) => {
      return (
        agent.displayName.toLowerCase() === searchTerm ||
        agent.uuid === searchTerm
      );
    });

    if (foundAgent) {
      window.location.href = `agent.html?id=${foundAgent.uuid}`;
    } else {
      alert(`Agent "${searchTerm}" does not exist.`);
    }
  });

  fetch("https://valorant-api.com/v1/agents")
    .then((response) => response.json())
    .then((data) => {
      console.log("Data fetched successfully!");
      const filteredAgents = data.data.filter(
        (agent) => !agentsToExclude.includes(agent.uuid)
      );

      filteredAgents.forEach((agent) => {
        const agentCard = createAgentCard(agent);
        agentsContainer.appendChild(agentCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  function createAgentCard(agent) {
    const agentCard = document.createElement("div");
    agentCard.classList.add("agent-card");
    agentCard.style.backgroundImage = `url(${agent.background})`;

    const agentImage = document.createElement("img");
    agentImage.src = agent.fullPortrait;
    agentImage.classList.add("agent-image");

    const agentName = document.createElement("h3");
    agentName.textContent = agent.displayName;

    const roleIcon = document.createElement("img");
    roleIcon.src = agent.role.displayIcon;
    roleIcon.classList.add("role-icon");
    roleIcon.style.position = "absolute";
    roleIcon.style.bottom = "10px";
    roleIcon.style.right = "10px";

    agentCard.appendChild(agentImage);
    agentCard.appendChild(agentName);
    agentCard.appendChild(roleIcon);

    agentCard.addEventListener("click", function () {
      window.location.href = `agent.html?id=${agent.uuid}`;
    });

    const agentCards = document.querySelectorAll(".agent-card");

    agentCards.forEach((card) => {
      card.addEventListener("mouseover", function () {
        agentCards.forEach((otherCard) => {
          if (otherCard !== this) {
            otherCard.classList.add("blurred");
          }
        });
      });

      card.addEventListener("mouseout", function () {
        agentCards.forEach((otherCard) => {
          otherCard.classList.remove("blurred");
        });
      });
    });

    return agentCard;
  }
});
