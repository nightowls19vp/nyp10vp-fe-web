
function CalculateTime(start, end) {
    let startDate = new Date(start);
    let endDate = new Date(end)
    let day = new Date(endDate - startDate)
    
    return day.getTime();
    
}

export default CalculateTime;