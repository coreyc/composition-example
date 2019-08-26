const { pipe } = require('ramda')

const tasks = [
    {
        assignedTo: 'John Doe',
        dueDate: '2019-08-31',
        name: 'Add drag and drop component',
        blocked: false,
        complete: false
    },
    {
        assignedTo: 'Bob Smith',
        dueDate: '2019-08-29',
        name: 'Fix build issues',
        blocked: false,
        complete: false
    },
    {
        assignedTo: 'David Riley',
        dueDate: '2019-09-03',
        name: 'Upgrade webpack',
        blocked: true,
        complete: false
    },
    {
        assignedTo: 'John Doe',
        dueDate: '2019-08-31',
        name: 'Create new product endpoint',
        blocked: false,
        complete: false
    }
]

const getIncomplete = tasks => tasks.filter(({complete}) => !complete)

const getNonBlocked = tasks => tasks.filter(({blocked}) => !blocked)

const sortByDueDate = tasks => tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))

const groupBy = key => array => {
    return array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key]
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
        return objectsByKeyValue
    }, {})
}

const groupByAssignee = groupBy('assignedTo')

// with intermediate variables
// const getIterationReport = tasks => {
//     const incompleteTasks = getIncomplete(tasks)
//     const withoutBlockedTasks = getNonBlocked(incompleteTasks)
//     const sortedByDueDate = sortByDueDate(withoutBlockedTasks)
//     return groupByAssignee(sortedByDueDate)
// }

// without intermediate variables
// const getIterationReport = tasks => {
//     return pipe(
//         getIncomplete,
//         getNonBlocked,
//         sortByDueDate,
//         groupByAssignee
//     )(tasks)
// }

// or 
const getIterationReport = pipe(
    getIncomplete,
    getNonBlocked,
    sortByDueDate,
    groupByAssignee
)

const report = getIterationReport(tasks) // pipe will return a function, above we call pipe with args so it returns a result
console.log(report)
