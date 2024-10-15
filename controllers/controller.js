import fs from 'fs'

const ACTIVE_PATH = './data/active.json'
const DATA_PATH = './data/text_files.json'
const OUTPUT_JSON = './data/contest.json'

const selectRandomTasks = (data) => data.sort(() => 0.5 - Math.random()).slice(0, 4)

const getFileContent = (filePath) => {
    let content = {};
    try {
        content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
        console.error('Error reading contest.json:', err);
    }
    return content
}

const updateFileContent = (filePath, content) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(content, null, 4))
    } catch (err) {
        console.error('Error reading contest.json:', err);
    }
}

export const getIndexPage = (req, res) => {
    res.render('index', {
        title: 'File Display Form'
    })
}

export const postEmailSendContent = async (req, res) => {
    const email = req.body.email
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'))
    let selectedTasks = selectRandomTasks(data)
    const isActive = getFileContent(ACTIVE_PATH).active
    if (isActive) {
        // Read existing content or initialize as empty array if the file is empty
        let usersContests = getFileContent(OUTPUT_JSON)
        const user = usersContests.filter(item => item.email == email)
        if (user.length == 0) {
            // Save email and selected task IDs to contest.json
            const outputData = {
                email: email,
                selectedTaskIds: selectedTasks.map(task => task.id)
            }
            usersContests.push(outputData)
            updateFileContent(OUTPUT_JSON, usersContests)
        } else {
            selectedTasks = data.filter(task => user[0].selectedTaskIds.includes(task.id))
        }
    }
    res.render('result', {
        selectedTasks,
        title: 'Files Content'
    })
}

export const getContestContent = (req, res) => {
    let contests = getFileContent(OUTPUT_JSON)
    res.send(contests)
}

export const getActivePage = (req, res) => {
    let isActive = getFileContent(ACTIVE_PATH).active
    res.render('active', {
        isActive: isActive,
        title: 'Activity'
    })
}

export const setActivity = (req, res) => {
    let isActive = !getFileContent(ACTIVE_PATH).active
    updateFileContent(ACTIVE_PATH, {active: isActive})
    res.status(301).redirect('/active')
}