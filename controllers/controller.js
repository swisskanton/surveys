import fs from 'fs'

const DATA_PATH = './data/text_files.json'
const OUTPUT_JSON = './data/contest.json'

function selectRandomTasks(data) {
    return data.sort(() => 0.5 - Math.random()).slice(0, 4)
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
    const isActive = true
    if (isActive) {
        // Read existing content or initialize as empty array if the file is empty
        let usersContests = [];
        try {
            usersContests = JSON.parse(fs.readFileSync(OUTPUT_JSON, 'utf8'));
            if (!Array.isArray(usersContests)) {
                usersContests = [];
            }
        } catch (err) {
            console.error('Error reading contest.json:', err);
        }
        const user = usersContests.filter(item => item.email == email)
        if (user.length == 0) {
            // Save email and selected task IDs to contest.json
            const outputData = {
                email: email,
                selectedTaskIds: selectedTasks.map(task => task.id)
            }
            usersContests.push(outputData)
            fs.writeFileSync(OUTPUT_JSON, JSON.stringify(usersContests, null, 4))
        } else {
            selectedTasks = data.filter(task => user[0].selectedTaskIds.includes(task.id))
        }
    }
    res.render('result', {
        selectedTasks,
        title: 'Files Content'
    })
}