const search = document.getElementById('search');
const matchlist = document.getElementById('match-list');

// Search the states.json and filter it
const searchStates = async searchtext => {
    const res = await fetch('../data/state_capitals.json');
    const states = await res.json();

    // console.log(states);

    //Get matches to current text input
    let matches = states.filter(state => {
        const regex = new RegExp('^${searchytext}','gi');
        return state.name.match(regex) || state.abbr.match(regex);
    });

    if(searchtext.length === 0) {
        matches = [];
        matchlist.innerHTML = '';
    }

    outputHtml(matches);

    const outputHtml = matches => {
        const html = matches.map(match =>` 
            <div class = "card card-body mb-1">
                <h4>${match.name} (${match.abbr})
                <span class = "text-primary">${match.capital}</span></h4>
                <small> Lat : ${match.lat} / Long ${match.long}</small>
            </div>
            `).join('');

         matchlist.innerHTML = html;   
    }
};


search.addEventListener('input', () => searchStates(search.value));