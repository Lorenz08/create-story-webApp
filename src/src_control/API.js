/**
 * Get all the data of the active players of a story
 * @param story The story that we want to evaluate
 * @returns A dictionary of all active players with their data
 */
export async function getDataPlayer(story) {
    const response = await axios.get('http://site181997.tw.cs.unibo.it/status', { params: { story } });
    const dict = {};
    const players = response.data;
    players.forEach((player) => {
        const lastSection = player.sectionArray.length - 1;
        let totalPoints = 0;
        player.sectionArray.forEach((section) => {
            totalPoints += section.points ? section.points : 0;
        });
        dict[player.id] = {
            key: player.id, 
            id: player.id,
            name: player.name, 
            timer: player.sectionArray.length > 0 ?  player.sectionArray[lastSection].timer : '00:00:00',
            section: player.sectionArray.length > 0 ?  player.sectionArray[lastSection].section : 0, 
            points : player.sectionArray.length > 0 ?  totalPoints : 0,
        };
    })
    return dict;
}

export async function addAnswer(story, player, points, section) {
    const response = await axios.post('http://site181997.tw.cs.unibo.it/answer', { params: { story, player, points, section} });
}

/**
 * Download pdf of a player
 * @param player The player whose pdf the evaluator wants
 * @param story The story the evaluator is in
 */
export async function getPDF(player, story) {
    const response = await axios.get('http://site181997.tw.cs.unibo.it/pdf', { params: { player, story } });
    const file = response.data;
    const blob = new Blob([file], { type: "application/pdf;charset=UTF-8" });
    saveAs(blob, `${player}.pdf`);
}

/**
 * 
 * @param {*} player 
 * @param {*} story 
 */
export async function getHistory(player, story) {
    const response = await axios.get('http://site181997.tw.cs.unibo.it/history', { params: { player, story} });
    return response.data;
}

/**
 * Get all active players (their ids/names)
 * @param story 
 * @returns The ids/names of all active players
 */
export async function getPlayers(story) {
    const response = await axios.get('http://site181997.tw.cs.unibo.it/players', { params: { story } });
    return response.data;
}

export async function getFinishedPlayers(story) {
    const response = await axios.get('http://site181997.tw.cs.unibo.it/finishedPlayers', { params: { story } });
    return response.data;
}

export async function getAllPlayers(story) {
    const response = await axios.get('http://site181997.tw.cs.unibo.it/allPlayers', { params: { story } });
    return response.data;
}

/**
 * Get active stories
 * @returns all stories
 */
export async function getStories() {
    const response = await axios.get('http://site181997.tw.cs.unibo.it/stories');
    return response.data;
}

/**
 * Get saved messages of active players
 * @returns all messages
 */
export async function getMessages() {
    const response = await axios.get('http://site181997.tw.cs.unibo.it/messages');
    return response.data;
}

/**
 * Get pending requests for help of active players
 * @returns all requests
 */
export async function getHelps() {
    const response = await axios.get('http://site181997.tw.cs.unibo.it/helps');
    return response.data;
}

/**
 * Get pending requests for human evaluation of active players
 * @returns all requests
 */
export async function getEvaluations() {
    const response = await axios.get('http://site181997.tw.cs.unibo.it/evaluations');
    return response.data;
}

export async function setName(player, story, name) {
    await axios.post('http://site181997.tw.cs.unibo.it/setName', { params: { player, story, name } });
}
