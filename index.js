const { pipe } = require('ramda')

// with intermediate variables
const getIterationReport = tasks => {
    const incompleteTasks = fn(tasks)
    const withoutBlockedTasks = fn(incompleteTasks)
    const sortedByDueDate = fn(withoutBlockedTasks)
    const sortedByUser = fn(sortedByDueDate)
    return sortedByUser // we could also just return the fn above
}


// without intermediate variables
const getIterationReport = tasks => {
    return pipe(
        getIncomplete,
        filterOutBlocked,
        sortByDueDate,
        sortByUser
    )(tasks)
}

// or 
const getIterationReport = () => {
    return pipe(
        getIncomplete,
        filterOutBlocked,
        sortByDueDate,
        sortByUser
    )
}

const report = getIterationReport(tasks) // pipe will return a function, above we call pipe with args so it returns a result