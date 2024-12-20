const gitHubProfile = async (username) => {
const APIURL = `https://api.github.com/users/${username}`;

try {
    const response = await axios.get(APIURL);
    const data = response.data;

    return{
        name: data.name || "Name no available",
        avatar: data.avatar_url,
        bio: data.bio || "Bio no available",
        followers: data.followers,
        following: data.following,
        repos: data.public_repos,
        reposUrl: data.repos_url,
    };

   } catch (error) {
     console.error(error);
     return null;
   }
};

const userRepos = async (reposUrl) => {
    try {
        const response = await axios.get(reposUrl);
        const data = response.data;

        return data.slice(0, 5).map((repo) => repo.name);
    } catch (error) {
        console.error(error);
        return []; 
        }
    };


const displayProfile = async (profile) => {
    const profileContainer = document.getElementById("profileData");

    if (!profile) {
        profileContainer.innerHTML = `<h2 class="card">No profile with this username</h2>`;
        return;
    }

    const repos = await userRepos(profile.reposUrl);

    profileContainer.innerHTML = `
    <div class="card">
    <img src="${profile.avatar}" alt="${profile.name}" class="avatar" />
    <div class="user-info">
    <h2>${profile.name}</h2>
    <p>${profile.bio}</p>
    <ul>
        <li>${profile.followers} <strong> Followers</strong> </li>
        <li>${profile.following} <strong> Following</strong> </li>
        <li>${profile.repos} <strong> Repos</strong> </li>
    </ul>
    <div class="repos">
          ${repos.map((repo) =>
            `<a href="https://github.com/${profile.name}/${repo}" target="_blank" class="repo">${repo}</a>`).join("")}
        </div>
    </div>
    </div>
    `;
};

document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("search").value;

    if (username === "") {
        alert("Please, introduce username");
        return;
        
    }
        const profile = await gitHubProfile(username);
        displayProfile(profile);
    }
);