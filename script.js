const APIURL = 'https://api.github.com/users/';

const search = document.querySelector('.search');
const form = document.querySelector('.form');
const main = document.querySelector('main');

getUser('florinpop17');
async function getUser(searchTerm){
    const resp = await fetch(APIURL + searchTerm);
    const respData = await resp.json();
    // console.log(respData);

    CreateCard(respData);
    getRepos(searchTerm);
}

async function getRepos(searchTerm){
    const resp = await fetch(APIURL + searchTerm + '/repos');
    const respData = await resp.json();
    // console.log(respData);

    CreateCardToRepos(respData);
}

function CreateCard(profiles){
    const cardHTML = `
        <div class="card">
            <div class="img-container">
                <img src="${profiles.avatar_url}" alt="${profiles.name}" class="avatar">
            </div>

            <div class="infos">
                <h4 class="name">${profiles.name}</h4>
                <p class="bio">${profiles.bio}</p>

                <ul>
                    <li>${profiles.followers}<strong>followers</strong></li>
                    <li>${profiles.following}<strong>following</strong></li>
                    <li>${profiles.public_repos}<strong>repos</strong></li>
                </ul>
                <div class="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

function CreateCardToRepos(repos){
    const reposDiv = document.querySelector('.repos');
    repos.slice(0 , 10).forEach(repo => {
        const a = document.createElement('a');
        a.classList.add('repoLink');
        a.href = repo.html_url;
        a.target = "_blank";
        a.innerText = repo.name;

        reposDiv.appendChild(a);
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getUser(searchTerm);

        search.value = "";
    }
})